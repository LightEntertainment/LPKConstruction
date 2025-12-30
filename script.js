document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger icon (optional simple toggle)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.querySelector('i').classList.remove('fa-times');
                    hamburger.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links (polishing behavior for older browsers if needed, though CSS scroll-behavior usually handles it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Custom Alert Logic
    const contactForm = document.querySelector('.contact-form');
    const customAlert = document.getElementById('custom-alert');
    const closeAlertBtn = document.querySelector('.close-alert');

    if (contactForm && customAlert) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show Custom Alert
            customAlert.classList.add('show');
            contactForm.reset();
        });

        // Close Alert Logic
        if (closeAlertBtn) {
            closeAlertBtn.addEventListener('click', () => {
                customAlert.classList.remove('show');
            });
        }

        // Close on outside click
        customAlert.addEventListener('click', (e) => {
            if (e.target === customAlert) {
                customAlert.classList.remove('show');
            }
        });
    }

    // Projects Carousel Logic
    const track = document.querySelector('.carousel-track');
    if (track) {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        // Initial variables
        let cardWidth = 330; // 300px width + 30px gap
        let position = 0;

        // Auto-detect width on load/resize
        const updateWidth = () => {
            const card = document.querySelector('.project-card');
            if (card) cardWidth = card.offsetWidth + 30; // 30 is the gap
        };
        // Run updateWidth after a small delay to ensure rendering
        setTimeout(updateWidth, 100);
        window.addEventListener('resize', updateWidth);

        const slideNext = () => {
            updateWidth(); // Ensure width is correct
            const maxScroll = track.scrollWidth - track.clientWidth;

            // If we are close to the end, reset to start
            if (Math.abs(position) >= maxScroll - 10) { // -10 tolerance
                position = 0;
            } else {
                position -= cardWidth;
            }

            // Safety check
            if (Math.abs(position) > maxScroll) position = -maxScroll;

            track.style.transform = `translateX(${position}px)`;
        };

        const slidePrev = () => {
            updateWidth();
            if (position === 0) {
                const maxScroll = track.scrollWidth - track.clientWidth;
                position = -maxScroll;
            } else {
                position += cardWidth;
                if (position > 0) position = 0;
            }
            track.style.transform = `translateX(${position}px)`;
        };

        if (nextBtn) nextBtn.addEventListener('click', slideNext);
        if (prevBtn) prevBtn.addEventListener('click', slidePrev);

        if (nextBtn) nextBtn.addEventListener('click', slideNext);
        if (prevBtn) prevBtn.addEventListener('click', slidePrev);

        // Auto Slide every 2 seconds
        setInterval(slideNext, 2000);
    }

    // Stats Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');
    let started = false; // Function started ? No

    if (statsSection && counters.length > 0) {
        window.onscroll = function () {
            if (window.scrollY + window.innerHeight > statsSection.offsetTop + 100) {
                if (!started) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const speed = 200; // The lower the slower
                        const increment = target / speed;

                        let count = 0;
                        const updateCount = () => {
                            if (count < target) {
                                count += increment * 10; // Speed adjustment
                                counter.innerText = Math.ceil(count) + (counter.innerText.includes('%') ? '%' : '+');
                                setTimeout(updateCount, 20);
                            } else {
                                counter.innerText = target + (counter.innerText.includes('%') ? '%' : '+');
                            }
                        };
                        updateCount();
                    });
                    started = true;
                }
            }
        };
    }

    // Ad Popup Logic
    const adPopup = document.getElementById('ad-popup');
    const closePopupBtn = document.querySelector('.close-popup');

    if (adPopup && closePopupBtn) {
        // Show after 10 seconds
        setTimeout(() => {
            adPopup.classList.add('show');
        }, 10000); // 10000ms = 10s

        // Close on button click
        closePopupBtn.addEventListener('click', () => {
            adPopup.classList.remove('show');
        });

        // Close on action buttons (Call/Book)
        const actionBtns = adPopup.querySelectorAll('.btn-ad');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                adPopup.classList.remove('show');
            });
        });

        // Close on click outside
        adPopup.addEventListener('click', (e) => {
            if (e.target === adPopup) {
                adPopup.classList.remove('show');
            }
        });
    }


    // ==========================================
    // DYNAMIC PROJECT DATA & LOGIC
    // ==========================================

    const projectsData = [
        {
            id: 'villa-rspuram',
            title: 'Modern Villa',
            location: 'RS Puram, Coimbatore',
            description: 'A luxurious 4500 Sq.Ft independent villa featuring contemporary architecture, Italian marble flooring, and a landscaped garden. Designed for premium living.',
            specs: ['Area: 4500 Sq.Ft', 'Duration: 14 Months', 'Style: Contemporary', 'Cost: Premium'],
            thumb: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80', // Updated working URL
            gallery: [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', // Exterior - Fixed URL
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', // Living
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', // Kitchen
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', // Pool
                'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=800&q=80', // Bedroom
                'https://images.unsplash.com/photo-1595558177001-f999580ef1d2?w=800&q=80'  // Dining
            ]
        },
        {
            id: 'apt-peelamedu',
            title: 'Eco Apartments',
            location: 'Peelamedu, Coimbatore',
            description: 'A sustainable residential complex with solar power integration, rainwater harvesting, and lush green common areas. Perfect for modern families.',
            specs: ['Units: 12', 'Area: 12000 Sq.Ft', 'Feature: Solar Powered', 'Status: Completed'],
            thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80', // Exterior
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', // Balcony
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80', // Hall
                'https://images.unsplash.com/photo-1574362848149-11496d97a7e9?w=800&q=80', // Garden
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'  // Room
            ]
        },
        {
            id: 'renov-gandhi',
            title: 'Heritage Renovation',
            location: 'Gandhipuram, Coimbatore',
            description: 'Restoring a 50-year-old traditional home while infusing modern amenities without losing its classic charm. Structural reinforcement and facade lift.',
            specs: ['Type: Restoration', 'Timeline: 6 Months', 'Style: Traditional Chettinad'],
            thumb: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=800&q=80', // Facade
                'https://images.unsplash.com/photo-1507149833265-60c372daea22?w=800&q=80', // Interior
                'https://images.unsplash.com/photo-1556912173-3db996e7c3ac?w=800&q=80', // Kitchen
                'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&q=80'  // Furniture
            ]
        },
        {
            id: 'comm-avinashi',
            title: 'Commercial Hub',
            location: 'Avinashi Road, Coimbatore',
            description: 'State-of-the-art commercial complex with glass facade, underground parking, and high-speed elevators. Designed for IT and Corporate offices.',
            specs: ['Floors: G+5', 'Area: 25000 Sq.Ft', 'Type: Commercial'],
            thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80',
            gallery: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80', // Building
                'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', // Office
                'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80', // Workspace
                'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80'  // Meeting Room
            ]
        }
    ];

    // Check if we are on the Index Page (render Carousel)
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        // Clear existing static content if any
        carouselTrack.innerHTML = '';

        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.onclick = () => window.location.href = `project-details.html?id=${project.id}`;
            card.style.cursor = 'pointer';

            card.innerHTML = `
                <div class="project-img" style="background-image: url('${project.thumb}'); background-size: cover; background-position: center;">
                </div>
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>${project.location}</p>
                    <small style="color:var(--primary-color); display:block; margin-top:5px;">Click to view Gallery <i class="fas fa-arrow-right"></i></small>
                </div>
            `;
            carouselTrack.appendChild(card);
        });
    }

    // Check if we are on the Project Details Page
    const projectTitleEl = document.getElementById('project-title');
    if (projectTitleEl) {
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');

        // Find project
        const project = projectsData.find(p => p.id === projectId);

        if (project) {
            // Populate Data
            document.title = `${project.title} | LPK Construction`;
            projectTitleEl.innerText = project.title;
            document.getElementById('project-location').innerText = project.location;
            document.getElementById('project-desc').innerText = project.description;
            document.getElementById('main-product-image').src = project.thumb;

            // Specs
            const specsList = document.getElementById('project-specs');
            project.specs.forEach(spec => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> ${spec}`;
                specsList.appendChild(li);
            });

            // Gallery
            const galleryGrid = document.getElementById('project-gallery');
            project.gallery.forEach(imgUrl => {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `<img src="${imgUrl}" alt="${project.title} Gallery">`;
                // Simple Lightbox effect could go here, for now just display
                item.onclick = () => {
                    document.getElementById('main-product-image').src = imgUrl; // Click to swap main image
                };
                galleryGrid.appendChild(item);
            });

        } else {
            projectTitleEl.innerText = "Project Not Found";
            document.getElementById('project-location').innerText = "Please return to home page.";
        }
    }

});
