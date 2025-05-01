// Portfolio page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio items
    initPortfolioItems();

    // Initialize gallery popups
    initGalleryPopups();

    // Initialize bird animation and interaction
    initPortfolioBird();
});

// Portfolio data
const portfolioData = {
    residential: [
        {
            image: "assets/projects/project1/main.jpg",
            title: "Modern Villa",
            description: "Luxury residential project in Cape Town"
        },
        {
            image: "assets/projects/project2/main.jpg",
            title: "Beachfront Home",
            description: "Contemporary design with ocean views"
        },
        {
            image: "assets/projects/project3/main.jpg",
            title: "Mountain Retreat",
            description: "Sustainable mountain home design"
        },
        {
            image: "assets/projects/project4/main.jpg",
            title: "Urban Apartment",
            description: "Modern city living spaces"
        }
    ],
    commercial: [
        {
            image: "assets/projects/project5/main.jpg",
            title: "Office Complex",
            description: "Modern corporate headquarters"
        },
        {
            image: "assets/projects/project6/main.jpg",
            title: "Shopping Center",
            description: "Retail space with innovative design"
        },
        {
            image: "assets/projects/project7/main.jpg",
            title: "Business Park",
            description: "Integrated commercial complex"
        }
    ],
    sustainable: [
        {
            image: "assets/projects/sustainable1.jpg",
            title: "Green Building",
            description: "Eco-friendly office design"
        },
        {
            image: "assets/projects/sustainable2.jpg",
            title: "Solar Home",
            description: "Net-zero energy residence"
        }
    ],
    heritage: [
        {
            image: "assets/projects/heritage1.jpg",
            title: "Historic Renovation",
            description: "Victorian era building restoration"
        },
        {
            image: "assets/projects/heritage2.jpg",
            title: "Cultural Center",
            description: "Heritage site adaptation"
        }
    ]
};

// Initialize bounce cards for each category
function initializeBounceCards(containerId, projects) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const transformStyles = [
        "rotate(10deg) translate(-170px)",
        "rotate(5deg) translate(-85px)",
        "rotate(-3deg)",
        "rotate(-10deg) translate(85px)",
        "rotate(2deg) translate(170px)"
    ];

    projects.forEach((project, idx) => {
        const card = document.createElement('div');
        card.className = `card card-${idx}`;
        card.style.transform = transformStyles[idx] || "none";
        
        const img = document.createElement('img');
        img.className = 'image';
        img.src = project.image;
        img.alt = project.title;
        
        const info = document.createElement('div');
        info.className = 'card-info';
        info.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        
        card.appendChild(img);
        card.appendChild(info);
        container.appendChild(card);

        // Add hover animations
        card.addEventListener('mouseenter', () => pushSiblings(idx, container));
        card.addEventListener('mouseleave', () => resetSiblings(container));
    });

    // Initial animation
    gsap.fromTo(
        `#${containerId} .card`,
        { scale: 0 },
        {
            scale: 1,
            stagger: 0.06,
            ease: "elastic.out(1, 0.8)",
            delay: 0.5
        }
    );
}

function getNoRotationTransform(transformStr) {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr);
    if (hasRotate) {
        return transformStr.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    } else if (transformStr === "none") {
        return "rotate(0deg)";
    } else {
        return `${transformStr} rotate(0deg)`;
    }
}

function getPushedTransform(baseTransform, offsetX) {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);
    if (match) {
        const currentX = parseFloat(match[1]);
        const newX = currentX + offsetX;
        return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    } else {
        return baseTransform === "none"
            ? `translate(${offsetX}px)`
            : `${baseTransform} translate(${offsetX}px)`;
    }
}

function pushSiblings(hoveredIdx, container) {
    const cards = container.querySelectorAll('.card');
    cards.forEach((card, i) => {
        const baseTransform = card.style.transform || "none";

        if (i === hoveredIdx) {
            const noRotationTransform = getNoRotationTransform(baseTransform);
            gsap.to(card, {
                transform: noRotationTransform,
                duration: 0.4,
                ease: "back.out(1.4)",
                overwrite: "auto"
            });
        } else {
            const offsetX = i < hoveredIdx ? -160 : 160;
            const pushedTransform = getPushedTransform(baseTransform, offsetX);
            const distance = Math.abs(hoveredIdx - i);
            const delay = distance * 0.05;

            gsap.to(card, {
                transform: pushedTransform,
                duration: 0.4,
                ease: "back.out(1.4)",
                delay,
                overwrite: "auto"
            });
        }
    });
}

function resetSiblings(container) {
    const cards = container.querySelectorAll('.card');
    const transformStyles = [
        "rotate(10deg) translate(-170px)",
        "rotate(5deg) translate(-85px)",
        "rotate(-3deg)",
        "rotate(-10deg) translate(85px)",
        "rotate(2deg) translate(170px)"
    ];

    cards.forEach((card, i) => {
        gsap.to(card, {
            transform: transformStyles[i] || "none",
            duration: 0.4,
            ease: "back.out(1.4)",
            overwrite: "auto"
        });
    });
}

// Initialize all portfolio sections
document.addEventListener('DOMContentLoaded', () => {
    // Load GSAP library
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
    script.onload = () => {
        // Initialize all categories
        initializeBounceCards('residential-cards', portfolioData.residential);
        initializeBounceCards('commercial-cards', portfolioData.commercial);
        initializeBounceCards('sustainable-cards', portfolioData.sustainable);
        initializeBounceCards('heritage-cards', portfolioData.heritage);
    };
    document.head.appendChild(script);

    // Initialize portfolio header animations
    const portfolioBird = document.getElementById('portfolio-bird');
    if (portfolioBird) {
        portfolioBird.style.opacity = '1';
        portfolioBird.style.transform = 'translate(0, 0) rotate(0deg)';
    }

    const logoText = document.getElementById('logo-text');
    if (logoText) {
        logoText.style.opacity = '1';
        logoText.style.transform = 'translateY(0)';
    }

    const tagline = document.getElementById('tagline');
    if (tagline) {
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
    }
});

// Function to initialize portfolio items
function initPortfolioItems() {
    const portfolioGrid = document.querySelector('.portfolio-grid');

    // Clear any existing content
    portfolioGrid.innerHTML = '';

    // Create sections and projects
    portfolioData.forEach(section => {
        // Create section element
        const sectionElement = document.createElement('div');
        sectionElement.className = 'portfolio-section';

        // Create section header
        const sectionHeader = document.createElement('div');
        sectionHeader.className = 'section-header';
        sectionHeader.innerHTML = `<h2>${section.section}</h2>`;
        sectionElement.appendChild(sectionHeader);

        // Create project grid for this section
        const projectGrid = document.createElement('div');
        projectGrid.className = 'portfolio-grid';

        // Add projects to the grid
        section.projects.forEach(project => {
            // Create project item
            const projectItem = document.createElement('div');
            projectItem.className = 'portfolio-item';
            projectItem.dataset.projectId = project.title.toLowerCase().replace(/\s+/g, '-');

            // Create main image
            const mainImage = document.createElement('img');
            mainImage.className = 'portfolio-image';
            // Use the first image from the project's images array
            mainImage.src = `assets/projects/${project.images[0]}`;
            // Fallback to placeholder if image fails to load
            mainImage.onerror = function() {
                this.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(project.title);
            };
            mainImage.alt = project.title;
            projectItem.appendChild(mainImage);

            // Create gallery popup
            const galleryPopup = document.createElement('div');
            galleryPopup.className = 'gallery-popup';

            // Create gallery container
            const galleryContainer = document.createElement('div');
            galleryContainer.className = 'gallery-container';

            // Create gallery slider
            const gallerySlider = document.createElement('div');
            gallerySlider.className = 'gallery-slider';

            // Add images to the gallery slider
            project.images.forEach(image => {
                const slide = document.createElement('div');
                slide.className = 'gallery-slide';

                const img = document.createElement('img');
                // Use the actual project image
                img.src = `assets/projects/${image}`;
                // Fallback to placeholder if image fails to load
                img.onerror = function() {
                    const colors = ['4287f5', '42f54e', 'f54242', 'f5d442'];
                    const index = project.images.indexOf(image);
                    this.src = `https://via.placeholder.com/400x300/${colors[index]}?text=` + encodeURIComponent(`${project.title} - Slide ${index + 1}`);
                };
                img.alt = project.title;

                slide.appendChild(img);
                gallerySlider.appendChild(slide);
            });

            galleryContainer.appendChild(gallerySlider);

            // Create gallery controls (dots)
            const galleryControls = document.createElement('div');
            galleryControls.className = 'gallery-controls';

            project.images.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'gallery-dot';
                if (index === 0) dot.classList.add('active');
                dot.dataset.index = index;
                galleryControls.appendChild(dot);
            });

            galleryContainer.appendChild(galleryControls);
            galleryPopup.appendChild(galleryContainer);
            projectItem.appendChild(galleryPopup);

            // Create project content
            const projectContent = document.createElement('div');
            projectContent.className = 'portfolio-content';
            projectContent.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-details">
                    <span>${project.location}</span>
                    <span>${project.year}</span>
                </div>
            `;

            projectItem.appendChild(projectContent);
            projectGrid.appendChild(projectItem);
        });

        sectionElement.appendChild(projectGrid);
        portfolioGrid.appendChild(sectionElement);
    });
}

// Function to initialize gallery popups
function initGalleryPopups() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const gallerySlider = item.querySelector('.gallery-slider');
        const galleryDots = item.querySelectorAll('.gallery-dot');
        const totalSlides = galleryDots.length;
        let currentSlide = 0;
        let slideInterval;

        // Function to go to a specific slide
        const goToSlide = (index) => {
            currentSlide = index;
            gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update active dot
            galleryDots.forEach(dot => dot.classList.remove('active'));
            galleryDots[currentSlide].classList.add('active');
        };

        // Function to go to the next slide
        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            goToSlide(currentSlide);
        };

        // Add click event to dots
        galleryDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.dataset.index);
                goToSlide(index);

                // Reset the interval
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 3000);
            });
        });

        // Start automatic slideshow on hover
        item.addEventListener('mouseenter', () => {
            // Start from the first slide
            goToSlide(0);

            // Start automatic slideshow
            slideInterval = setInterval(nextSlide, 3000);
        });

        // Stop slideshow when mouse leaves
        item.addEventListener('mouseleave', () => {
            clearInterval(slideInterval);
        });
    });
}

// Function to initialize bird animation and interaction
function initPortfolioBird() {
    const portfolioBird = document.getElementById('portfolio-bird');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (!portfolioBird) return;

    // Variables for bird movement
    let isBirdMoving = false;
    let birdTarget = null;
    let birdAnimation = null;

    // Function to animate bird flying to a portfolio item
    const flyBirdToItem = (item) => {
        if (isBirdMoving) return;

        // Get positions
        const birdRect = portfolioBird.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();

        // Calculate target position (top-right corner of the item)
        const targetX = itemRect.right - birdRect.width/2;
        const targetY = itemRect.top - birdRect.height/2;

        // Calculate current position relative to viewport
        const currentX = birdRect.left;
        const currentY = birdRect.top;

        // Calculate distance
        const distanceX = targetX - currentX;
        const distanceY = targetY - currentY;

        // Set bird as moving
        isBirdMoving = true;
        birdTarget = item;

        // Create keyframes for the animation
        const keyframes = [
            {
                transform: 'translate(0, 0) rotate(0deg)',
                offset: 0
            },
            {
                transform: `translate(${distanceX * 0.3}px, ${distanceY * 0.2}px) rotate(${distanceX > 0 ? 15 : -15}deg)`,
                offset: 0.3
            },
            {
                transform: `translate(${distanceX * 0.7}px, ${distanceY * 0.5}px) rotate(${distanceX > 0 ? -10 : 10}deg)`,
                offset: 0.7
            },
            {
                transform: `translate(${distanceX}px, ${distanceY}px) rotate(0deg)`,
                offset: 1
            }
        ];

        // Animation options
        const options = {
            duration: 1500,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards'
        };

        // Start the animation
        birdAnimation = portfolioBird.animate(keyframes, options);

        // When animation ends
        birdAnimation.onfinish = () => {
            // Highlight the portfolio item
            item.style.boxShadow = '0 0 20px rgba(106, 141, 115, 0.7)';

            // Reset after a delay
            setTimeout(() => {
                // Fly back to original position
                flyBirdBack();

                // Remove highlight with a fade
                item.style.transition = 'box-shadow 0.5s ease';
                item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
            }, 2000);
        };
    };

    // Function to fly bird back to original position
    const flyBirdBack = () => {
        if (!isBirdMoving) return;

        // Cancel any ongoing animation
        if (birdAnimation) {
            birdAnimation.cancel();
        }

        // Create keyframes for return animation
        const keyframes = [
            {
                transform: portfolioBird.style.transform,
                offset: 0
            },
            {
                transform: 'translate(0, 0) rotate(0deg)',
                offset: 1
            }
        ];

        // Animation options
        const options = {
            duration: 1000,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            fill: 'forwards'
        };

        // Start the animation
        birdAnimation = portfolioBird.animate(keyframes, options);

        // When animation ends
        birdAnimation.onfinish = () => {
            isBirdMoving = false;
            birdTarget = null;

            // Resume the hover animation
            portfolioBird.style.animation = 'portfolioBirdEntrance 0s forwards, portfolioBirdHover 4s infinite';
        };
    };

    // Add click event to bird
    portfolioBird.addEventListener('click', () => {
        if (isBirdMoving) {
            // If bird is already moving, fly back
            flyBirdBack();
        } else {
            // Otherwise, fly to a random portfolio item
            const randomIndex = Math.floor(Math.random() * portfolioItems.length);
            flyBirdToItem(portfolioItems[randomIndex]);
        }
    });

    // Add hover effect to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // If bird is not already moving, make it face the hovered item
            if (!isBirdMoving) {
                const birdRect = portfolioBird.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();

                // Determine if item is to the left or right of the bird
                const isItemToRight = itemRect.left > birdRect.left;

                // Make bird face the direction of the item
                portfolioBird.style.transform = `scaleX(${isItemToRight ? 1 : -1})`;
            }
        });
    });
}
