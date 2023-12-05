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
    if (window.innerWidth > 700) {
        navLinks.style.display = "block";
    }
}

function handleScroll() {
    const aboutMeSection = document.querySelector('.aboutme');

    if (isElementInViewport(aboutMeSection)) {
        aboutMeSection.classList.add('visible');
    } else {
        aboutMeSection.classList.remove('visible');
    }
}

document.addEventListener('scroll', handleScroll);
window.addEventListener('resize', checkWindowSize);

handleScroll();
checkWindowSize();

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function scrollDown() {
    window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
    });
}