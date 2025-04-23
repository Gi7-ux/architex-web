document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const processSteps = document.querySelectorAll('.process-step');
    const infoCards = document.querySelectorAll('.info-card');

    // Bird animation elements
    const birdContainer = document.getElementById('follow-bird-container');
    const followBird = document.getElementById('follow-bird');

    // Bird following variables
    let mouseX = 0;
    let mouseY = 0;
    let birdX = 40;
    let birdY = 40;
    let speed = 0.15; // Increased speed for closer following

    // Add hover effects to process steps
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            const stepCircle = step.querySelector('.step-circle');
            if (stepCircle) {
                stepCircle.style.transform = 'scale(1.1)';
                stepCircle.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.15)';
            }
        });

        step.addEventListener('mouseleave', () => {
            const stepCircle = step.querySelector('.step-circle');
            if (stepCircle) {
                stepCircle.style.transform = '';
                stepCircle.style.boxShadow = '';
            }
        });
    });

    // Add hover effects to info cards
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    // Calendly event handling
    window.addEventListener('message', (e) => {
        if (e.data.event && e.data.event.indexOf('calendly') === 0) {
            console.log('Calendly event:', e.data.event);

            // Handle specific Calendly events
            if (e.data.event === 'calendly.event_scheduled') {
                // Show confirmation message
                alert('Thank you for scheduling a briefing! We look forward to discussing your project.');

                // You could also redirect to a thank you page or show a modal
                // window.location.href = 'thank-you.html';
            }
        }
    });

    // Bird following mouse cursor functionality
    if (birdContainer && followBird) {
        // Function to update bird position
        const updateBirdPosition = () => {
            // Calculate the distance between current position and target (mouse) position
            const dx = mouseX - birdX;
            const dy = mouseY - birdY;

            // Move the bird a fraction of the distance (smooth following)
            birdX += dx * speed;
            birdY += dy * speed;

            // Apply the new position with some constraints to keep bird within reasonable bounds
            const maxX = window.innerWidth - 150; // Adjust based on bird width
            const maxY = window.innerHeight - 112; // Adjust based on bird height

            // Constrain the bird's movement area
            const constrainedX = Math.max(0, Math.min(maxX, birdX));
            const constrainedY = Math.max(0, Math.min(maxY, birdY));

            // Apply the transformation - offset by half the bird's width/height to center it on cursor
            birdContainer.style.transform = `translate(${constrainedX - 75}px, ${constrainedY - 56}px)`;

            // Add slight rotation based on movement direction for more natural feel
            const rotation = dx * 0.05; // Subtle rotation based on horizontal movement
            followBird.style.transform = `rotate(${rotation}deg)`;

            // Request the next animation frame
            requestAnimationFrame(updateBirdPosition);
        };

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Start the animation
        updateBirdPosition();

        // Add special behavior when hovering over the bird
        followBird.addEventListener('mouseenter', () => {
            // Keep a relatively fast speed even when hovered
            speed = 0.1;
            // Add a special effect or animation
            followBird.style.filter = 'drop-shadow(0 0 10px rgba(106, 141, 115, 0.7))';
        });

        followBird.addEventListener('mouseleave', () => {
            // Return to normal speed
            speed = 0.15;
            // Remove special effect
            followBird.style.filter = 'none';
        });

        // Add click interaction
        followBird.addEventListener('click', () => {
            // Create a quick "flutter" animation
            followBird.style.transition = 'transform 0.2s ease';
            followBird.style.transform = 'scale(1.2) rotate(10deg)';

            setTimeout(() => {
                followBird.style.transform = 'scale(0.9) rotate(-5deg)';

                setTimeout(() => {
                    followBird.style.transform = 'scale(1) rotate(0deg)';
                    setTimeout(() => {
                        followBird.style.transition = 'transform 0.3s ease';
                    }, 200);
                }, 200);
            }, 200);
        });
    }
});
