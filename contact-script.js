document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const pageIntro = document.querySelector('.page-intro');
    const contactFormContainer = document.querySelector('.contact-form-container');
    const contactInfoContainer = document.querySelector('.contact-info-container');
    const joinTeamSection = document.querySelector('.join-team');
    const guaranteeBox = document.querySelector('.guarantee-box');
    const origamiBird = document.getElementById('origami-bird');
    const contactForm = document.getElementById('contact-form');

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to animate elements when they come into view
    const animateOnScroll = () => {
        if (isInViewport(pageIntro) && !pageIntro.classList.contains('animate')) {
            pageIntro.classList.add('animate');
        }

        if (isInViewport(contactFormContainer) && !contactFormContainer.classList.contains('animate')) {
            contactFormContainer.classList.add('animate');
        }

        if (isInViewport(contactInfoContainer) && !contactInfoContainer.classList.contains('animate')) {
            contactInfoContainer.classList.add('animate');
        }

        if (isInViewport(joinTeamSection) && !joinTeamSection.classList.contains('animate')) {
            joinTeamSection.classList.add('animate');
        }

        const contactSection = document.querySelector('.contact-section');
        if (isInViewport(contactSection) && !contactSection.classList.contains('animate')) {
            contactSection.classList.add('animate');
        }
    };

    // Function to make the bird follow the mouse
    const makeBirdFollowMouse = () => {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const birdRect = origamiBird.getBoundingClientRect();
            const birdCenterX = birdRect.left + birdRect.width / 2;
            const birdCenterY = birdRect.top + birdRect.height / 2;

            // Calculate the angle between the bird and the mouse
            const angle = Math.atan2(mouseY - birdCenterY, mouseX - birdCenterX);

            // Calculate the distance between the bird and the mouse
            const distance = Math.sqrt(
                Math.pow(mouseX - birdCenterX, 2) +
                Math.pow(mouseY - birdCenterY, 2)
            );

            // Limit the rotation based on distance
            const maxRotation = 15; // degrees
            const rotationFactor = Math.min(distance / 300, 1);
            const rotation = maxRotation * rotationFactor;

            // Apply rotation based on the angle
            const rotationDegrees = (angle * 180 / Math.PI);

            // Apply a subtle rotation to make the bird look towards the mouse
            origamiBird.style.transform = `rotate(${rotationDegrees * 0.1}deg)`;
        });
    };

    // Function to handle form submission
    const handleFormSubmission = () => {
        if (!contactForm) return;

        // Add loading state and success message elements
        const formContainer = contactForm.parentElement;
        const loadingElement = document.createElement('div');
        loadingElement.className = 'form-loading';
        loadingElement.innerHTML = '<div class="spinner"></div><p>Sending your message...</p>';
        loadingElement.style.display = 'none';

        const successElement = document.createElement('div');
        successElement.className = 'form-success';
        successElement.innerHTML = '<h3>Thank you for your message!</h3><p>We will get back to you soon.</p>';
        successElement.style.display = 'none';

        formContainer.appendChild(loadingElement);
        formContainer.appendChild(successElement);

        contactForm.addEventListener('submit', async (e) => {
            // Only prevent default if not using a form service
            if (!contactForm.getAttribute('action')) {
                e.preventDefault();
            }

            // Show loading state
            contactForm.style.display = 'none';
            loadingElement.style.display = 'flex';

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const ndaRequested = document.getElementById('nda')?.checked || false;

            try {
                // If using a form service like Formspree, the form will submit normally
                if (!contactForm.getAttribute('action')) {
                    // If no action is set, we'd implement custom form handling here
                    // For example, using fetch to submit to a backend API

                    // Simulate API call with timeout
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    // Hide loading, show success
                    loadingElement.style.display = 'none';
                    successElement.style.display = 'block';

                    // Update success message if NDA is requested
                    if (ndaRequested) {
                        successElement.innerHTML += '<p>Our team will contact you to discuss our NDA policy before proceeding.</p>';
                    }

                    // Reset form (though it's hidden)
                    contactForm.reset();
                }
                // If action is set, the form will be submitted normally to that endpoint
            } catch (error) {
                console.error('Error submitting form:', error);
                loadingElement.innerHTML = '<p>There was an error sending your message. Please try again later.</p>';
            }
        });
    };

    // Function to start the animation sequence
    const startAnimationSequence = () => {
        // Animate page intro
        setTimeout(() => {
            pageIntro.classList.add('animate');

            // Animate form and info containers
            setTimeout(() => {
                contactFormContainer.classList.add('animate');

                setTimeout(() => {
                    contactInfoContainer.classList.add('animate');

                    setTimeout(() => {
                        if (joinTeamSection) {
                            joinTeamSection.classList.add('animate');
                        }
                    }, 200);
                }, 200);
            }, 200);
        }, 300);
    };

    // Initialize with error handling
    try {
        // Immediately animate all elements without delays
        document.querySelectorAll('.page-intro, .contact-section, .contact-form-container, .contact-info-container, .join-team, .guarantee-box')
            .forEach(el => el.classList.add('animate'));

        makeBirdFollowMouse();
        handleFormSubmission();

        // Fallback if animations don't trigger
        setTimeout(() => {
            document.querySelectorAll('.page-intro, .contact-section, .contact-form-container, .contact-info-container, .join-team, .guarantee-box')
                .forEach(el => el.classList.add('animate'));
        }, 500);

        // Add scroll event listener for animations
        window.addEventListener('scroll', animateOnScroll);
    } catch (error) {
        console.error('Initialization error:', error);
        // Fallback - show all content immediately
        document.querySelectorAll('[class*="animate"]')
            .forEach(el => el.style.opacity = '1');
    }
});
