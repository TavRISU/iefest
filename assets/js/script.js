const eventConfig = {
    name: "IE-FEST",
    fullName: "Incsada English Festival",
    tagline: "Where Every Voice Becomes a Star.",
    
    date: "YOUR_EVENT_DATE",
    location: "YOUR_EVENT_LOCATION",
    
    registrationUrl: "YOUR_REGISTRATION_LINK",
    
    guidebookPath: "assets/docs/guidebook.pdf",
    
    submission: {
        speech: "YOUR_SPEECH_SUBMISSION_LINK",
        storytelling: "YOUR_STORYTELLING_SUBMISSION_LINK"
    },
    
    social: {
        instagram: "YOUR_INSTAGRAM_LINK",
        youtube: "YOUR_YOUTUBE_LINK"
    }
};

function initConfigData() {
    document.querySelectorAll('[data-config]').forEach(el => {
        const key = el.getAttribute('data-config');
        if (eventConfig[key]) {
            el.textContent = eventConfig[key];
        }
    });

    const regBtn = document.getElementById('btn-register-link');
    if (regBtn) regBtn.href = eventConfig.registrationUrl !== "YOUR_REGISTRATION_LINK" ? eventConfig.registrationUrl : "#";

    const guideViewBtn = document.getElementById('btn-guide-view');
    const guideDlBtn = document.getElementById('btn-guide-download');
    if (guideViewBtn) guideViewBtn.href = eventConfig.guidebookPath;
    if (guideDlBtn) guideDlBtn.href = eventConfig.guidebookPath;

    const subSpeechBtn = document.getElementById('btn-submit-speech');
    if (subSpeechBtn) subSpeechBtn.href = eventConfig.submission.speech !== "YOUR_SPEECH_SUBMISSION_LINK" ? eventConfig.submission.speech : "#";

    const subStoryBtn = document.getElementById('btn-submit-story');
    if (subStoryBtn) subStoryBtn.href = eventConfig.submission.storytelling !== "YOUR_STORYTELLING_SUBMISSION_LINK" ? eventConfig.submission.storytelling : "#";

    const linkIg = document.getElementById('link-ig');
    if (linkIg) linkIg.href = eventConfig.social.instagram !== "YOUR_INSTAGRAM_LINK" ? eventConfig.social.instagram : "#";

    const linkYt = document.getElementById('link-yt');
    if (linkYt) linkYt.href = eventConfig.social.youtube !== "YOUR_YOUTUBE_LINK" ? eventConfig.social.youtube : "#";

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('shadow-xl', 'bg-deep/95');
            navbar.classList.remove('bg-deep/80');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-deep/95');
            navbar.classList.add('bg-deep/80');
        }
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initGalleryAndLightbox() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-white/20', 'text-white', 'shadow-lg');
                b.classList.add('bg-white/5', 'text-honeydew/70');
            });
            
            btn.classList.add('active', 'bg-white/20', 'text-white', 'shadow-lg');
            btn.classList.remove('bg-white/5', 'text-honeydew/70');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden-gallery-item');
                } else {
                    item.classList.add('hidden-gallery-item');
                }
            });
        });
    });

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBg = document.getElementById('lightbox-bg');

    function openLightbox(imgSrc) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = imgSrc;
        lightbox.classList.remove('hidden');
        setTimeout(() => {
            lightbox.classList.remove('opacity-0');
            lightbox.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0');
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightboxImg.src = '';
        }, 300);
        document.body.style.overflow = 'auto';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBg) lightboxBg.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}

function initConstellationCanvas() {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    const colors = ['#F7E7B2', '#9FA8DA', '#9966CC', '#E8F5E9'];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.radius = Math.random() * 1.8 + 0.6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.baseAlpha = Math.random() * 0.6 + 0.3;
        }

        update() {
            if (prefersReducedMotion) return;
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.baseAlpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createParticles() {
        particles = [];
        const density = window.innerWidth < 768 ? 24000 : 16000;
        const particleCount = Math.min(Math.floor((width * height) / density), window.innerWidth < 768 ? 35 : 90);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    let mouse = { x: null, y: null, radius: 140 };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function drawConstellation() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#9FA8DA';
                    ctx.globalAlpha = (1 - (distance / 130)) * 0.25;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
            
            if (mouse.x != null && !prefersReducedMotion) {
                const dxMouse = particles[i].x - mouse.x;
                const dyMouse = particles[i].y - mouse.y;
                const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
                
                if (distanceMouse < mouse.radius) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#F7E7B2';
                    ctx.globalAlpha = (1 - (distanceMouse / mouse.radius)) * 0.5;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }

    function animateConstellation() {
        requestAnimationFrame(animateConstellation);
        drawConstellation();
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    createParticles();
    if (!prefersReducedMotion) {
        animateConstellation();
    } else {
        drawConstellation();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initConfigData();
    initNavigation();
    initGalleryAndLightbox();
    initConstellationCanvas();
});