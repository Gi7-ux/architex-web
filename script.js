document.addEventListener('DOMContentLoaded', () => {
    // Elements to animate
    const origamiBird = document.getElementById('origami-bird');
    const logoText = document.getElementById('logo-text');
    const tagline = document.getElementById('tagline');
    const serviceArea = document.getElementById('service-area');
    const priceTag = document.getElementById('price-tag');
    const ndaBanner = document.querySelector('.nda-banner');
    const navButtons = document.querySelectorAll('.nav-button');
    const birdContainer = document.querySelector('.bird-container');
    const sparkleContainer = document.querySelector('.sparkle-container');
    const shine = document.querySelector('.shine');

    // Popup elements
    const popupOverlay = document.getElementById('popup-overlay');
    const popups = document.querySelectorAll('.popup');
    const closeButtons = document.querySelectorAll('.popup-close');
    const popupBirdContainers = document.querySelectorAll('.popup-bird-container');

    // Contact form elements
    const contactForm = document.getElementById('contact-form');

    // Check if custom fonts are loaded
    const checkFontsLoaded = () => {
        // Create a font checker
        const checkFont = (fontFamily) => {
            return new Promise((resolve) => {
                document.fonts.ready.then(() => {
                    if (document.fonts.check(`1em "${fontFamily}"`)) {
                        resolve(true);
                    } else {
                        console.warn(`Font ${fontFamily} not loaded. Using fallback.`);
                        resolve(false);
                    }
                });
            });
        };

        // Check our custom fonts
        Promise.all([
            checkFont('Freedom'),
            checkFont('Architex')
        ]).then(results => {
            // Apply fallback styles if needed
            if (!results[0]) {
                logoText.style.fontFamily = "'Montserrat', sans-serif";
                logoText.style.fontWeight = "800";
                logoText.style.letterSpacing = "2px";
                logoText.style.textShadow = "0px 1px 1px rgba(0, 0, 0, 0.1)";
            }
            if (!results[1]) {
                tagline.style.fontFamily = "'Montserrat', sans-serif";
                tagline.style.fontWeight = "400"; // Lighter weight to match unbold Architex
                tagline.style.fontStyle = "italic";
                tagline.style.letterSpacing = "1.2px";
                tagline.style.textShadow = "0px 1px 0px rgba(0, 0, 0, 0.05)";
            }
        });
    };

    // Run font check
    checkFontsLoaded();

    // Function to flip the bird horizontally and show sparkle
    const flipBirdWithSparkle = () => {
        return new Promise((resolve) => {
            // Add flip animation
            birdContainer.classList.add('flip-horizontal');

            // Show sparkle in the middle of the flip
            setTimeout(() => {
                sparkleContainer.classList.add('show');

                // Hide sparkle after animation
                setTimeout(() => {
                    sparkleContainer.classList.remove('show');
                }, 1000);
            }, 750); // Show sparkle halfway through the flip

            // Resolve after flip animation completes
            setTimeout(resolve, 1500);
        });
    };

    // Function to animate the shine effect
    const startShineEffect = () => {
        shine.classList.add('shine-active');
    };

    // Function to add shine effect to the bird
    const addShineEffect = () => {
        // Add shine effect to the bird
        shine.classList.add('shine-active');
    };

    // Function to animate buttons one by one
    const animateButtonsSequentially = () => {
        return new Promise((resolve) => {
            navButtons.forEach((button, index) => {
                setTimeout(() => {
                    button.classList.add('animate-button');
                }, index * 200); // Stagger the button animations
            });

            // Resolve after all buttons have appeared
            setTimeout(resolve, navButtons.length * 200 + 500);
        });
    };

    // Function to start the animation sequence
    const startAnimationSequence = () => {
        // Wait for a short delay to ensure everything is ready
        setTimeout(() => {
            // Animate bird flying in
            origamiBird.style.opacity = '1';
            origamiBird.style.transform = 'translate(0, 0) rotate(0deg)';

            // After bird animation, animate text
            setTimeout(() => {
                // Show the text
                logoText.classList.add('animate-text');

                setTimeout(() => {
                    tagline.classList.add('animate-text');

                    // Animate additional text elements
                    setTimeout(() => {
                        if (serviceArea) serviceArea.classList.add('animate-text');

                        setTimeout(() => {
                            if (priceTag) priceTag.classList.add('animate-text');

                            setTimeout(() => {
                                if (ndaBanner) ndaBanner.classList.add('animate');

                                // After text animation, flip the bird and show sparkle
                                setTimeout(() => {
                                    flipBirdWithSparkle().then(() => {
                                        // After flip, animate buttons one by one
                                        animateButtonsSequentially().then(() => {
                                            // After all buttons appear, start the shine effect
                                            startShineEffect();
                                        });
                                    });
                                }, 800);
                            }, 200);
                        }, 200);
                    }, 200);
                }, 500);
            }, 2000); // Increased delay to match the bird animation
        }, 800);
    };

    // Start the animation sequence immediately
    startAnimationSequence();

    // Add hover effect to buttons
    navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
    });

    // Create bird clones for each popup
    let birdClones = [];
    let currentOpenPopup = null;
    let originalBirdPosition = null;

    // Function to create bird clones for popups
    const createBirdClones = () => {
        // Wait for the original bird to be fully loaded
        setTimeout(() => {
            // Store the original bird position for returning animation
            const birdRect = birdContainer.getBoundingClientRect();
            originalBirdPosition = {
                top: birdRect.top,
                left: birdRect.left,
                width: birdRect.width,
                height: birdRect.height
            };

            // Create a clone for each popup
            popupBirdContainers.forEach((container, index) => {
                // Clone the bird
                const birdClone = document.createElement('img');
                birdClone.src = 'assets/origami.png';
                birdClone.classList.add('popup-bird');
                container.appendChild(birdClone);
                birdClones.push(birdClone);
            });
        }, 7000); // Wait for initial animations to complete
    };

    // Call the function to create bird clones
    createBirdClones();

    // Function to animate bird flying to popup
    const animateBirdToPopup = (popupId) => {
        // Only proceed if we have the original bird position
        if (!originalBirdPosition) return;

        // Get the popup and its bird container
        const popup = document.getElementById(popupId);
        const popupBirdContainer = popup.querySelector('.popup-bird-container');
        const popupBird = popupBirdContainer.querySelector('.popup-bird');

        // Get positions for animation
        const popupRect = popupBirdContainer.getBoundingClientRect();

        // Create a temporary bird for the flying animation
        const flyingBird = document.createElement('img');
        flyingBird.src = 'assets/origami.png';
        flyingBird.style.position = 'fixed';
        flyingBird.style.zIndex = '200';
        flyingBird.style.width = `${originalBirdPosition.width / 8}px`;
        flyingBird.style.height = `${originalBirdPosition.height / 8}px`;
        flyingBird.style.top = `${originalBirdPosition.top + originalBirdPosition.height / 2}px`;
        flyingBird.style.left = `${originalBirdPosition.left + originalBirdPosition.width / 2}px`;
        flyingBird.style.transform = 'translate(-50%, -50%)';
        flyingBird.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(flyingBird);

        // Hide the original bird
        origamiBird.style.opacity = '0';

        // Animate the flying bird to the popup
        setTimeout(() => {
            flyingBird.style.top = `${popupRect.top + popupRect.height / 2}px`;
            flyingBird.style.left = `${popupRect.left + popupRect.width / 2}px`;
            flyingBird.style.width = '100px';
            flyingBird.style.height = '80px';

            // Show the popup bird when the flying animation completes
            setTimeout(() => {
                popupBird.style.transform = 'translateY(0)';
                document.body.removeChild(flyingBird);
            }, 800);
        }, 100);
    };

    // Function to animate bird flying back from popup
    const animateBirdFromPopup = (popupId) => {
        // Only proceed if we have the original bird position
        if (!originalBirdPosition) return;

        // Get the popup and its bird container
        const popup = document.getElementById(popupId);
        const popupBirdContainer = popup.querySelector('.popup-bird-container');
        const popupBird = popupBirdContainer.querySelector('.popup-bird');

        // Hide the popup bird
        popupBird.style.transform = 'translateY(200px)';

        // Get positions for animation
        const popupRect = popupBirdContainer.getBoundingClientRect();

        // Create a temporary bird for the flying animation
        const flyingBird = document.createElement('img');
        flyingBird.src = 'assets/origami.png';
        flyingBird.style.position = 'fixed';
        flyingBird.style.zIndex = '200';
        flyingBird.style.width = '100px';
        flyingBird.style.height = '80px';
        flyingBird.style.top = `${popupRect.top + popupRect.height / 2}px`;
        flyingBird.style.left = `${popupRect.left + popupRect.width / 2}px`;
        flyingBird.style.transform = 'translate(-50%, -50%)';
        flyingBird.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(flyingBird);

        // Animate the flying bird back to the original position
        setTimeout(() => {
            flyingBird.style.top = `${originalBirdPosition.top + originalBirdPosition.height / 2}px`;
            flyingBird.style.left = `${originalBirdPosition.left + originalBirdPosition.width / 2}px`;
            flyingBird.style.width = `${originalBirdPosition.width / 8}px`;
            flyingBird.style.height = `${originalBirdPosition.height / 8}px`;

            // Show the original bird when the flying animation completes
            setTimeout(() => {
                origamiBird.style.opacity = '1';
                document.body.removeChild(flyingBird);
            }, 800);
        }, 100);
    };

    // Open popup when a nav button is clicked
    navButtons.forEach(button => {
        // Skip buttons that are actually links
        if (button.tagName === 'A') return;

        button.addEventListener('click', () => {
            const popupId = `popup-${button.getAttribute('data-popup')}`;
            const popup = document.getElementById(popupId);

            // Store the current popup
            currentOpenPopup = popupId;

            // Show overlay and popup
            popupOverlay.classList.add('active');
            popup.classList.add('active');

            // Animate bird to popup
            animateBirdToPopup(popupId);

            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close popup when close button is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the parent popup
            const popup = button.closest('.popup');
            const popupId = popup.id;

            // Animate bird back to original position
            animateBirdFromPopup(popupId);

            // Hide popup with a slight delay to allow bird animation
            setTimeout(() => {
                popup.classList.remove('active');
                popupOverlay.classList.remove('active');

                // Reset current popup
                currentOpenPopup = null;

                // Restore scrolling on the body
                document.body.style.overflow = '';
            }, 300);
        });
    });

    // Close popup when overlay is clicked
    popupOverlay.addEventListener('click', () => {
        if (currentOpenPopup) {
            // Animate bird back to original position
            animateBirdFromPopup(currentOpenPopup);

            // Hide all popups with a slight delay
            setTimeout(() => {
                popups.forEach(popup => popup.classList.remove('active'));
                popupOverlay.classList.remove('active');

                // Reset current popup
                currentOpenPopup = null;

                // Restore scrolling on the body
                document.body.style.overflow = '';
            }, 300);
        }
    });



    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            let confirmMessage = 'Thank you for your message! We will get back to you soon.';

            alert(confirmMessage);

            // Reset form
            contactForm.reset();

            // Close the popup
            const closeButton = contactForm.closest('.popup').querySelector('.popup-close');
            if (closeButton) {
                closeButton.click();
            }
        });
    }
});
