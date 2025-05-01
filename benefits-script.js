document.addEventListener('DOMContentLoaded', () => {
    console.log('Benefits script loaded');
    // Elements
    const pageIntro = document.querySelector('.page-intro');
    const birdContainer = document.querySelector('.bird-container');
    const origamiBird = document.getElementById('origami-bird');
    const freedomText = document.querySelector('.freedom-text');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const guaranteeBox = document.querySelector('.guarantee-box');
    const ctaSection = document.querySelector('.cta-section');

    console.log('Bird container:', birdContainer);
    console.log('Origami bird:', origamiBird);
    console.log('Freedom text:', freedomText);

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
        // Check each benefit card
        benefitCards.forEach(card => {
            if (isInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
            }
        });

        // Check guarantee box section
        if (isInViewport(guaranteeBox) && !guaranteeBox.classList.contains('animate')) {
            guaranteeBox.classList.add('animate');
        }

        // Check CTA section
        if (isInViewport(ctaSection) && !ctaSection.classList.contains('animate')) {
            ctaSection.classList.add('animate');
        }
    };

    // Function to start the animation sequence
    const startAnimationSequence = () => {
        console.log('Starting animation sequence');
        // Animate page intro immediately
        pageIntro.classList.add('animate');

        // Add bird animation immediately
        if (origamiBird) {
            console.log('Applying breaking-free animation to bird');
            origamiBird.style.opacity = '1';
            origamiBird.style.display = 'block';
            origamiBird.style.visibility = 'visible';
            origamiBird.classList.add('breaking-free');

            // Force reflow to ensure animation is applied
            void origamiBird.offsetWidth;

            // Apply animation directly as a backup
            origamiBird.style.animation = 'breakingFree 15s ease-in-out infinite';
        } else {
            console.error('Bird element not found!');
        }

        if (freedomText) {
            console.log('Applying freedom-rotate animation to text');
            freedomText.classList.add('freedom-rotate');
        }

        // Initial check for elements in viewport
        animateOnScroll();
    };

    // Start animation sequence
    startAnimationSequence();

    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);

    // Interactive bird behavior
    birdContainer.addEventListener('mouseenter', () => {
        // Pause the animations when hovering
        origamiBird.style.animationPlayState = 'paused';
        freedomText.style.animationPlayState = 'paused';
    });

    birdContainer.addEventListener('mouseleave', () => {
        // Resume the animations when not hovering
        origamiBird.style.animationPlayState = 'running';
        freedomText.style.animationPlayState = 'running';
    });

    // Click interaction for the bird
    origamiBird.addEventListener('click', () => {
        // Create a burst effect
        origamiBird.classList.remove('breaking-free');

        // Force reflow
        void origamiBird.offsetWidth;

        // Add a quick pulse animation
        origamiBird.style.animation = 'none';

        setTimeout(() => {
            origamiBird.style.animation = '';
            origamiBird.classList.add('breaking-free');
        }, 50);

        // Make the FREEDOM text pulse
        freedomText.style.transition = 'transform 0.3s ease, color 0.3s ease';
        freedomText.style.transform = 'translate(-50%, -50%) scale(1.2)';
        freedomText.style.color = 'rgba(106, 141, 115, 0.3)';

        setTimeout(() => {
            freedomText.style.transform = 'translate(-50%, -50%) scale(1)';
            freedomText.style.color = 'rgba(106, 141, 115, 0.1)';
        }, 300);
    });

    // Add hover effects to benefit cards
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const number = card.querySelector('.benefit-number');
            if (number) {
                number.style.backgroundColor = 'var(--primary-color)';
                number.style.transform = 'scale(1.1) rotate(10deg)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const number = card.querySelector('.benefit-number');
            if (number) {
                number.style.backgroundColor = 'var(--primary-light)';
                number.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});
