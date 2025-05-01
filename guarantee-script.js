document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const pageIntro = document.querySelector('.page-intro');
    const guaranteeBox = document.querySelector('.guarantee-box');

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };

    // Function to animate elements when they come into view
    const animateOnScroll = () => {
        if (isInViewport(pageIntro) && !pageIntro.classList.contains('animate')) {
            pageIntro.classList.add('animate');
        }
        
        if (isInViewport(guaranteeBox) && !guaranteeBox.classList.contains('animate')) {
            guaranteeBox.classList.add('animate');
        }
    };

    // Initial check for elements in viewport
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
});
