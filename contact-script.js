document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const pageIntro = document.querySelector('.page-intro');
    const contactFormContainer = document.querySelector('.contact-form-container');
    const contactInfoContainer = document.querySelector('.contact-info-container');
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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const ndaRequested = document.getElementById('nda').checked;
            
            // Create confirmation message
            let confirmMessage = `Thank you for your message, ${name}! We will get back to you soon.`;
            
            if (ndaRequested) {
                confirmMessage += ' Our team will contact you to discuss our NDA policy before proceeding.';
            }
            
            // Show confirmation message
            alert(confirmMessage);
            
            // Reset form
            contactForm.reset();
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
                }, 200);
            }, 200);
        }, 300);
    };

    // Initialize
    startAnimationSequence();
    makeBirdFollowMouse();
    handleFormSubmission();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);
});
