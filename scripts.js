var navLinks = document.getElementById("navLinks");
var bars = document.getElementById("bars");

function showMenu() {
    navLinks.style.display = "block";
    bars.style.display = "none";
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-300px";
    bars.style.display = "block";
    setTimeout(function () {
        navLinks.style.display = "none";
    }, 500);
}

function scrollDown() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}

function checkWindowSize() {
    // Check window width and set nav-links display to block if greater than 700
    if (window.innerWidth > 700) {
        navLinks.style.display = "block";
    }
}

function handleScroll() {
    const aboutMeSection = document.querySelector('.aboutme');
    const resumeSection = document.querySelector('.resume-section');
    const projectsSection = document.querySelector('.projects-header');
    const designSection = document.querySelector('.design-section');
    const homeTab = document.querySelector('.home-tab');
    const downArrow = document.querySelector('.down-arrow');

    const sections = [
        { section: document.querySelector('.header'), tab: document.querySelector('.home-tab') },
        { section: aboutMeSection, tab: document.querySelector('.about-tab') },
        { section: resumeSection, tab: document.querySelector('.resume-tab') },
        { section: projectsSection, tab: document.querySelector('.projects-tab') },
        { section: designSection, tab: document.querySelector('.design-tab') },
    ];

    sections.forEach(({ section, tab }) => {
        if (isElementPartiallyInViewport(section, 50)) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Toggle the opacity for the aboutme section
    if (isElementPartiallyInViewport(aboutMeSection, 50)) {
        aboutMeSection.classList.add('visible');
    } else {
        aboutMeSection.classList.remove('visible');
    }

    // Toggle the opacity for the aboutme section
    if (isElementPartiallyInViewport(resumeSection, 50)) {
        resumeSection.classList.add('visible');
    } else {
        resumeSection.classList.remove('visible');
    }

    if (isElementPartiallyInViewport(designSection, 50)) {
        // Add the 'rotated' class
        downArrow.classList.add('rotated');

        // Change the behavior to scroll back to the home section
        downArrow.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    } else {
        // Remove the 'rotated' class
        downArrow.classList.remove('rotated');

        // Change the behavior to scroll down
        downArrow.onclick = function () {
            scrollDown();
        };
    }
}

document.addEventListener('scroll', handleScroll);
window.addEventListener('resize', checkWindowSize);

handleScroll();
checkWindowSize();

function isElementPartiallyInViewport(el, percentVisible) {
    const rect = el.getBoundingClientRect();
    const height = rect.height || el.offsetHeight;
    const threshold = (height * percentVisible) / 100;

    return (
        rect.top <= window.innerHeight - threshold &&
        rect.bottom >= threshold
    );
}

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);

            if (targetId === 'home') {
                // Scroll to the first section
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Scroll to the target section
                const targetSection = document.getElementById(targetId);
                window.scrollTo({
                    top: targetSection.offsetTop - (window.innerHeight - targetSection.clientHeight) / 2,
                    behavior: 'smooth'
                });
            }
        });
    });

    function setResumeHeight() {
        const resumeSection = document.querySelector('.resume-section');
        const embedElement = resumeSection.querySelector('embed');

        // Set a minimum height for the resume section
        const minHeight = 400;

        // Calculate the height based on the screen height
        const newHeight = Math.max(window.innerHeight * 0.8, minHeight);

        // Set the new height to the embed element
        embedElement.style.height = newHeight + 'px';
    }

    // Call the function initially and on window resize
    setResumeHeight();
    window.addEventListener('resize', setResumeHeight);

    // Adjust itch.io iframe width and height based on screen size
    const itchIframes = document.querySelectorAll('.project-container iframe');

    itchIframes.forEach(iframe => {
        // Set initial size when the page loads
        if (window.innerWidth <= 700) {
            iframe.width = "100%";
            iframe.height = "169";
        } else {
            iframe.width = "554";
            iframe.height = "169";
        }

        // Update size on window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth <= 700) {
                iframe.width = "100%";
                iframe.height = "169";
            } else {
                iframe.width = "554";
                iframe.height = "169";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
    fullscreenOverlay.style.display = 'none';
});

function openFullscreen(element) {
const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
const fullscreenImage = document.querySelector('.fullscreen-image');
const fullscreenDescription = document.querySelector('.fullscreen-description');
const fullscreenParagraph = document.querySelector('.fullscreen-paragraph');

fullscreenImage.src = element.src;

// Check if image-panel exists
const imagePanel = element.closest('.description-panel').querySelector('.image-panel');
if (imagePanel) {
    // Include bar if image-panel exists
    fullscreenDescription.innerHTML = imagePanel.innerHTML;
    fullscreenDescription.style.display = 'block';
} else {
    // Include only image description paragraph if image-panel does not exist
    fullscreenDescription.innerHTML = '';
    fullscreenDescription.style.display = 'none';
}

// Include paragraph
fullscreenParagraph.innerHTML = element.closest('.description-panel').querySelector('.description').innerHTML;

fullscreenOverlay.style.display = 'flex';
}



function closeFullscreen() {
    const fullscreenOverlay = document.querySelector('.fullscreen-overlay');
    fullscreenOverlay.style.display = 'none';
}