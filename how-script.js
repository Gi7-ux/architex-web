document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const origamiBird = document.getElementById('origami-bird');
    const pageIntro = document.querySelector('.page-intro');
    const processSteps = document.querySelectorAll('.process-step');
    const detailSections = document.querySelectorAll('.detail-section');
    const testimonials = document.querySelector('.testimonials');
    const getStarted = document.querySelector('.get-started');

    // Function to check if element is in viewport
    const isInViewport = (element, offset = 100) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= 0
        );
    };

    // Function to animate elements when they come into view
    const animateOnScroll = () => {
        // Check each detail section
        detailSections.forEach(section => {
            if (isInViewport(section) && !section.classList.contains('animate')) {
                section.classList.add('animate');
            }
        });

        // Check testimonials section
        if (isInViewport(testimonials) && !testimonials.classList.contains('animate')) {
            testimonials.classList.add('animate');
        }

        // Check get started section
        if (isInViewport(getStarted) && !getStarted.classList.contains('animate')) {
            getStarted.classList.add('animate');
        }
    };

    // Function to start the animation sequence
    const startAnimationSequence = () => {
        // Add fly across animation to bird immediately
        origamiBird.classList.add('fly-across-animation');

        // Animate page intro
        setTimeout(() => {
            pageIntro.classList.add('animate');

            // Animate process steps one by one
            processSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('animate');
                }, index * 200);
            });

            // Initial check for elements in viewport
            animateOnScroll();
        }, 500); // Short delay for better visual flow
    };

    // Start animation sequence
    startAnimationSequence();

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);

    // Add click event listeners to process steps to scroll to corresponding detail section
    processSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepNumber = step.getAttribute('data-step');
            let targetSection;

            switch(stepNumber) {
                case '1':
                    targetSection = document.getElementById('submit-project');
                    break;
                case '2':
                    targetSection = document.getElementById('match-architects');
                    break;
                case '3':
                    targetSection = document.getElementById('collaborate');
                    break;
                case '4':
                    targetSection = document.getElementById('complete-project');
                    break;
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // Add hover effect to process steps
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px)';
        });

        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0)';
        });
    });

    // Make process steps clickable with cursor pointer
    processSteps.forEach(step => {
        step.style.cursor = 'pointer';
    });

    // Add special animation for the origami bird in the get started section
    const origamiBackground = document.querySelector('.origami-background');

    origamiBackground.addEventListener('mouseenter', () => {
        origamiBackground.style.transform = 'scale(1.02)';
        origamiBackground.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });

    origamiBackground.addEventListener('mouseleave', () => {
        origamiBackground.style.transform = 'scale(1)';
        origamiBackground.style.boxShadow = 'none';
    });
});
