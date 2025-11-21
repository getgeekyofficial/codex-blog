// ===================================
// NAVIGATION
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// SMOOTH SCROLLING
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// EMAIL FORM SUBMISSION
// ===================================
const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    // Simulate form submission
    const submitBtn = emailForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Success! Check your email';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
        
        setTimeout(() => {
            emailForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Welcome to the tribe! Check your email for the free e-book.', 'success');
        }, 3000);
    }, 2000);
});

// ===================================
// NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)' : 'var(--accent-gradient)'};
        color: var(--primary-bg);
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 255, 255, 0.4);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 600;
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// SCROLL ANIMATIONS (AOS)
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// CODE RAIN EFFECT
// ===================================
function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    if (!codeRain) return;
    
    const characters = '01';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            color: ${Math.random() > 0.5 ? 'var(--neon-cyan)' : 'var(--neon-magenta)'};
            font-family: monospace;
            font-size: ${Math.random() * 10 + 10}px;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        span.textContent = characters[Math.floor(Math.random() * characters.length)].repeat(Math.floor(Math.random() * 5 + 1));
        codeRain.appendChild(span);
    }
}

// ===================================
// PARALLAX EFFECT
// ===================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-figure, .hooded-figure');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===================================
// TYPING EFFECT FOR TAGLINE
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// CURSOR GLOW EFFECT
// ===================================
function initCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Enlarge cursor on hover over interactive elements
    document.querySelectorAll('a, button, .pillar-card, .insta-post').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// LOADING SCREEN
// ===================================
function initLoadingScreen() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1000);
    });
}

// ===================================
// INSTAGRAM POSTS (PLACEHOLDER)
// ===================================
function loadInstagramPosts() {
    const instaPosts = document.querySelectorAll('.insta-post img');
    const placeholderImages = [
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=500&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=500&fit=crop'
    ];
    
    instaPosts.forEach((img, index) => {
        img.src = placeholderImages[index % placeholderImages.length];
        img.alt = `Instagram Post ${index + 1}`;
    });
}

// ===================================
// PILLAR IMAGES (PLACEHOLDER)
// ===================================
function loadPillarImages() {
    const pillarImages = {
        'conspiracy-vault.jpg': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=600&fit=crop',
        'geek-science.jpg': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
        'psych-mind.jpg': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop'
    };
    
    document.querySelectorAll('.card-image img').forEach(img => {
        const filename = img.src.split('/').pop();
        if (pillarImages[filename]) {
            img.src = pillarImages[filename];
        }
    });
}

// ===================================
// MEMBER BADGE INTERACTION
// ===================================
function initMemberBadge() {
    const badge = document.querySelector('.member-badge');
    
    badge.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Membership portal coming soon! Join our email list to get early access.', 'info');
    });
}

// ===================================
// ARTICLE LINK HANDLING
// ===================================
function initArticleLinks() {
    document.querySelectorAll('.btn-read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pillar = new URL(link.href).searchParams.get('pillar');
            showNotification(`Loading ${pillar} article...`, 'info');
            setTimeout(() => {
                window.location.href = link.href;
            }, 1000);
        });
    });
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'H' to go to home
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'J' to join tribe
        if (e.key === 'j' || e.key === 'J') {
            document.querySelector('#tribe').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// INITIALIZE ALL FEATURES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollAnimations();
    createCodeRain();
    initParallax();
    initCursorGlow();
    loadInstagramPosts();
    loadPillarImages();
    initMemberBadge();
    initArticleLinks();
    initKeyboardShortcuts();
    lazyLoadImages();
    
    // Type writer effect for tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        setTimeout(() => {
            typeWriter(tagline, originalText, 150);
        }, 1500);
    }
    
    // Console easter egg
    console.log('%c🔍 THE CODEX', 'font-size: 30px; font-weight: bold; background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cQuestion everything. Dive deeper.', 'font-size: 16px; color: #00ffff;');
    console.log('%cInterested in joining our team? Email: team@thecodex.com', 'font-size: 14px; color: #b0b0b0;');
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ===================================
// SERVICE WORKER (PWA READY)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}
