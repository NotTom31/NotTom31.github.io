let index = 0;
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const carousel = document.querySelector('.carousel');
let itemWidth = items[0].getBoundingClientRect().width;
const padding = parseFloat(getComputedStyle(items[0]).marginLeft) + parseFloat(getComputedStyle(items[0]).marginRight);

// Function to update the height of each carousel item to match the tallest one
function updateItemHeights() {
    let maxHeight = 0;

    // Find the maximum height
    items.forEach(item => {
        item.style.height = 'auto'; // Reset height to measure correctly
        const height = item.getBoundingClientRect().height;
        if (height > maxHeight) {
            maxHeight = height;
        }
    });

    // Set all items to the maximum height
    items.forEach(item => {
        item.style.height = `${maxHeight}px`;
    });
}

// Function to update carousel position
function updateCarouselPosition() {
    itemWidth = items[0].getBoundingClientRect().width;
    const carouselWidth = carousel.getBoundingClientRect().width;
    const padding = parseFloat(getComputedStyle(items[0]).marginLeft) + parseFloat(getComputedStyle(items[0]).marginRight);
    const offset = -index * (itemWidth + padding) + (carouselWidth - itemWidth) / 2;
    carouselInner.style.transform = `translateX(${offset}px)`;
}

// Function to handle carousel movement
function move(direction) {
    index = (index + direction + totalItems) % totalItems;
    updateCarouselPosition();
}

function goToProject(projectIndex) {
    index = projectIndex;
    updateCarouselPosition();
}

// Function to update item width, carousel width, and position on window resize
function updateDimensions() {
    updateCarouselPosition(); // Update the position based on new dimensions
    updateItemHeights(); // Ensure items are adjusted on resize
}

// Initial setup
updateDimensions();

// Handle window resize
window.addEventListener('resize', updateDimensions);

// Swipe handling
let startX, endX;

carouselInner.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

carouselInner.addEventListener('touchend', (event) => {
    endX = event.changedTouches[0].clientX;
    if (startX > endX + 50) {
        move(1); // Swipe left
    } else if (startX < endX - 50) {
        move(-1); // Swipe right
    }
});