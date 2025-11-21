// ===================================
// ARTICLE PAGE SPECIFIC FUNCTIONALITY
// ===================================

// ===================================
// READING PROGRESS TRACKER
// ===================================
function updateReadingProgress() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = articleBody.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const articleTop = articleBody.offsetTop;
    
    // Calculate progress
    const progress = Math.min(
        Math.max(((scrollTop - articleTop + windowHeight) / documentHeight) * 100, 0),
        100
    );
    
    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(progress)}% Complete`;
    }
}

// ===================================
// SHARE FUNCTIONALITY
// ===================================
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const articleTitle = document.querySelector('.article-title')?.textContent || 'Check this out!';
    const articleUrl = window.location.href;
    
    shareButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.classList[1]; // twitter, facebook, etc.
            
            let shareUrl = '';
            
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
                    break;
                case 'reddit':
                    shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(articleTitle)}`;
                    break;
                case 'copy':
                    copyToClipboard(articleUrl);
                    showShareNotification('Link copied to clipboard!');
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
                showShareNotification(`Sharing on ${platform}...`);
            }
        });
    });
}

// ===================================
// TWEET QUOTE BUTTONS
// ===================================
function initTweetButtons() {
    const tweetButtons = document.querySelectorAll('.tweet-btn');
    
    tweetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const quote = btn.previousElementSibling.textContent;
            const articleUrl = window.location.href;
            const tweetText = `"${quote}" - The Codex`;
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(articleUrl)}`;
            
            window.open(tweetUrl, '_blank', 'width=600,height=400');
        });
    });
}

// ===================================
// COPY TO CLIPBOARD
// ===================================
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// ===================================
// SHARE NOTIFICATION
// ===================================
function showShareNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'share-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--accent-gradient);
        color: var(--primary-bg);
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const shareAnimStyle = document.createElement('style');
shareAnimStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shareAnimStyle);

// ===================================
// TABLE OF CONTENTS ACTIVE STATE
// ===================================
function updateTOCActiveState() {
    const sections = document.querySelectorAll('.article-body h2[id]');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const scrollPosition = window.pageYOffset + 200;
        
        if (scrollPosition >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Add active state styles
const tocStyle = document.createElement('style');
tocStyle.textContent = `
    .table-of-contents a.active {
        color: var(--neon-cyan);
        font-weight: 700;
        padding-left: 10px;
    }
`;
document.head.appendChild(tocStyle);

// ===================================
// SMOOTH SCROLL FOR TOC LINKS
// ===================================
function initTOCLinks() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 120; // Account for fixed navbar
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// DYNAMIC ARTICLE CONTENT BASED ON URL
// ===================================
function loadArticleContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const pillar = urlParams.get('pillar');
    
    const articleData = {
        conspiracy: {
            category: 'Conspiracy Vault',
            icon: 'fa-lock-open',
            title: 'The Hidden Truth Behind Global Surveillance Networks',
            tagline: 'What they don\'t want you to know about digital privacy in 2024',
            heroImage: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1600&h=900&fit=crop'
        },
        science: {
            category: 'Geek Science',
            icon: 'fa-atom',
            title: 'Quantum Computing: Breaking Reality\'s Code',
            tagline: 'How quantum mechanics will revolutionize everything we know',
            heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&h=900&fit=crop'
        },
        psychology: {
            category: 'Psych Mind Hacks',
            icon: 'fa-brain',
            title: 'The Dark Psychology of Social Media Addiction',
            tagline: 'Understanding the manipulation tactics keeping you scrolling',
            heroImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1600&h=900&fit=crop'
        }
    };
    
    if (pillar && articleData[pillar]) {
        const data = articleData[pillar];
        
        // Update category
        const categoryEl = document.getElementById('articleCategory');
        if (categoryEl) {
            categoryEl.innerHTML = `<i class="fas ${data.icon}"></i><span>${data.category}</span>`;
        }
        
        // Update title
        const titleEl = document.getElementById('articleTitle');
        if (titleEl) {
            titleEl.textContent = data.title;
        }
        
        // Update tagline
        const taglineEl = document.getElementById('articleTagline');
        if (taglineEl) {
            taglineEl.textContent = data.tagline;
        }
        
        // Update hero image
        const heroImageEl = document.getElementById('heroImage');
        if (heroImageEl) {
            heroImageEl.src = data.heroImage;
        }
        
        // Update page title
        document.title = `${data.title} - The Codex`;
    }
}

// ===================================
// READING TIME ESTIMATOR
// ===================================
function estimateReadingTime() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    
    const text = articleBody.textContent;
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    console.log(`📖 Estimated reading time: ${readingTime} minutes (${wordCount} words)`);
}

// ===================================
// HIGHLIGHT SELECTED TEXT
// ===================================
function initTextHighlight() {
    let highlightPopup = null;
    
    document.addEventListener('mouseup', () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim();
        
        // Remove existing popup
        if (highlightPopup) {
            highlightPopup.remove();
            highlightPopup = null;
        }
        
        if (selectedText.length > 0) {
            const range = selection.getRangeAt(0);
            const rect = range.getBoundingClientRect();
            
            // Create popup
            highlightPopup = document.createElement('div');
            highlightPopup.className = 'highlight-popup';
            highlightPopup.innerHTML = `
                <button class="highlight-btn tweet-selected" title="Tweet this">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="highlight-btn copy-selected" title="Copy">
                    <i class="fas fa-copy"></i>
                </button>
            `;
            
            highlightPopup.style.cssText = `
                position: fixed;
                top: ${rect.top - 50}px;
                left: ${rect.left + (rect.width / 2) - 50}px;
                background: var(--card-bg);
                padding: 10px;
                border-radius: 10px;
                display: flex;
                gap: 10px;
                z-index: 10000;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
                border: 1px solid var(--neon-cyan);
                animation: popIn 0.2s ease;
            `;
            
            document.body.appendChild(highlightPopup);
            
            // Tweet button
            highlightPopup.querySelector('.tweet-selected').addEventListener('click', () => {
                const tweetText = `"${selectedText}" - The Codex`;
                const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(window.location.href)}`;
                window.open(tweetUrl, '_blank', 'width=600,height=400');
                highlightPopup.remove();
            });
            
            // Copy button
            highlightPopup.querySelector('.copy-selected').addEventListener('click', () => {
                copyToClipboard(selectedText);
                showShareNotification('Text copied to clipboard!');
                highlightPopup.remove();
            });
        }
    });
}

// Add highlight popup styles
const highlightStyle = document.createElement('style');
highlightStyle.textContent = `
    @keyframes popIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .highlight-btn {
        width: 40px;
        height: 40px;
        background: var(--secondary-bg);
        border: 1px solid rgba(0, 255, 255, 0.2);
        border-radius: 8px;
        color: var(--neon-cyan);
        cursor: pointer;
        transition: var(--transition-smooth);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .highlight-btn:hover {
        background: var(--accent-gradient);
        color: var(--primary-bg);
        transform: scale(1.1);
    }
`;
document.head.appendChild(highlightStyle);

// ===================================
// NEWSLETTER CTA FORM
// ===================================
function initNewsletterForm() {
    const ctaForm = document.querySelector('.cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = ctaForm.querySelector('input[type="email"]').value;
            const submitBtn = ctaForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = '✓ Subscribed!';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff00 0%, #00cc00 100%)';
                
                setTimeout(() => {
                    ctaForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    
                    showShareNotification('Welcome to the tribe! Check your email.');
                }, 2000);
            }, 1500);
        });
    }
}

// ===================================
// LAZY LOAD IMAGES
// ===================================
function lazyLoadArticleImages() {
    const images = document.querySelectorAll('.article-body img, .related-image img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.addEventListener('load', () => {
                    img.style.opacity = '1';
                });
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// KEYBOARD SHORTCUTS FOR ARTICLE
// ===================================
function initArticleKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Press 'S' to share on Twitter
        if (e.key === 's' || e.key === 'S') {
            const twitterBtn = document.querySelector('.share-btn.twitter');
            if (twitterBtn) twitterBtn.click();
        }
        
        // Press 'C' to copy link
        if (e.key === 'c' || e.key === 'C') {
            if (!e.ctrlKey && !e.metaKey) { // Avoid conflict with Ctrl+C
                const copyBtn = document.querySelector('.share-btn.copy');
                if (copyBtn) copyBtn.click();
            }
        }
    });
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-gradient);
        border: none;
        border-radius: 50%;
        color: var(--primary-bg);
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: var(--transition-smooth);
        z-index: 998;
        box-shadow: 0 5px 20px rgba(0, 255, 255, 0.4);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.pointerEvents = 'auto';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// INITIALIZE ALL ARTICLE FEATURES
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadArticleContent();
    initShareButtons();
    initTweetButtons();
    initTOCLinks();
    initTextHighlight();
    initNewsletterForm();
    lazyLoadArticleImages();
    initArticleKeyboardShortcuts();
    initScrollToTop();
    estimateReadingTime();
    
    // Update progress and TOC on scroll
    window.addEventListener('scroll', () => {
        updateReadingProgress();
        updateTOCActiveState();
    });
    
    // Initial update
    updateReadingProgress();
    updateTOCActiveState();
    
    console.log('%c📖 Article loaded successfully', 'color: #00ffff; font-size: 14px;');
    console.log('%cKeyboard shortcuts: S = Share on Twitter, C = Copy link', 'color: #b0b0b0; font-size: 12px;');
});
