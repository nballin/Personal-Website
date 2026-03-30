// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Read the target id from the clicked link.
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            // Keep target clear of the fixed top navbar.
            const navbarHeight = navbar ? navbar.offsetHeight : 70;
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 12;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});


// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Save current scroll value for future scroll-based features.
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');
    
    projectCards.forEach(card => {
        // Start hidden so cards can animate in when they enter view.
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    sections.forEach(section => {
        // The research blog is one very tall section: visible height / section height can stay
        // below the observer threshold, so it would never fade in. Leave it fully visible.
        if (section.classList.contains('research-blog')) {
            return;
        }
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Trigger initial animation for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        setTimeout(() => {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Match nav link href (ex: #projects) with current section id.
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--text-light);
    }
    .nav-link.active::after {
        width: 100%;
        background-color: var(--text-light);
    }
`;
document.head.appendChild(style);

// Click-to-zoom for blog images
document.addEventListener('DOMContentLoaded', () => {
    const blogImages = document.querySelectorAll('.research-blog-image');
    if (!blogImages.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.innerHTML = `
        <button class="image-lightbox-close" aria-label="Close image preview">&times;</button>
        <img src="" alt="Expanded blog visual">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.image-lightbox-close');

    const closeLightbox = () => {
        // Reset image and unlock page scrolling.
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = '';
    };

    blogImages.forEach((img) => {
        img.addEventListener('click', () => {
            // Open clicked image in a larger preview.
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});

// Pause and mute videos once they are mostly out of view.
document.addEventListener('DOMContentLoaded', () => {
    const videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return;

    const minVisibleRatio = 0.35;

    const pauseAndMuteIfOutOfView = (video) => {
        // Measure how much of the video is currently visible.
        const rect = video.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

        // If mostly out of view, pause and mute to reduce noise/distraction.
        if (ratio < minVisibleRatio) {
            video.muted = true;
            if (!video.paused) video.pause();
        }
    };

    const checkAllVideos = () => {
        videos.forEach(pauseAndMuteIfOutOfView);
    };

    let ticking = false;
    const scheduleCheck = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            // Run once per frame while scrolling/resizing.
            checkAllVideos();
            ticking = false;
        });
    };

    // IntersectionObserver helps catch initial transitions quickly.
    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => pauseAndMuteIfOutOfView(entry.target));
        },
        { threshold: [0, 0.2, 0.35, 0.6, 1] }
    );

    videos.forEach((video) => videoObserver.observe(video));
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            videos.forEach((video) => {
                video.muted = true;
                if (!video.paused) video.pause();
            });
        } else {
            scheduleCheck();
        }
    });

    // Initial pass.
    checkAllVideos();
});

