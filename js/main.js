/**
 * مدينه العاب نور المقدادية - JavaScript
 * Main JavaScript file for interactivity
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS Animation
    initAOS();
    
    // Initialize Navigation
    initNavigation();
    
    // Initialize Mobile Menu
    initMobileMenu();
    
    // Initialize Game Filters
    initGameFilters();
    
    // Initialize FAQ Accordion
    initFAQ();
    
    // Initialize Form Validation
    initForms();
    
    // Initialize Smooth Scroll
    initSmoothScroll();
    
    // Initialize Counter Animation
    initCounters();
    
    // Initialize Gallery
    initGallery();
    
    // Initialize Booking Modal
    initBookingModal();
    
    // Initialize Visitor Counter
    initVisitorCounter();
});

/**
 * Initialize AOS Animation Library
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: function() {
                return window.innerWidth < 768;
            }
        });
    }
}

/**
 * Initialize Navigation - Sticky Navbar
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Initialize Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Toggle is handled by onclick in HTML
    }
}

/**
 * Toggle Mobile Menu
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * Close Mobile Menu
 */
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
    }
}

/**
 * Initialize Game Filters
 */
function initGameFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    if (filterBtns.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.classList.add('bg-gray-100', 'text-gray-700');
                b.classList.remove('bg-primary', 'text-white');
            });
            btn.classList.add('active');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            btn.classList.add('bg-primary', 'text-white');
            
            // Filter games
            gameCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Initialize FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

/**
 * Initialize Form Validation and Submission
 */
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
    
    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingFormSubmit);
    }
    
    // Event Booking Form
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventFormSubmit);
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Modal Booking Form
    const modalBookingForm = document.getElementById('modal-booking-form');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', handleModalBookingFormSubmit);
    }
}

/**
 * Handle Contact Form Submission
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Basic validation
    const name = formData.get('name');
    const phone = formData.get('phone');
    const message = formData.get('message');
    
    if (!name || !phone || !message) {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin rtl:ml-2 rtl:mr-0"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showAlert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريباً', 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Also open WhatsApp with the message
        const whatsappMessage = `مرحباً 👋\n\n📧 الاسم: ${name}\n📱 الرقم: ${phone}\n\n💬 الرسالة:\n${message}`;
        openWhatsApp(whatsappMessage);
    }, 1500);
}

/**
 * Handle Booking Form Submission
 */
function handleBookingFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const tickets = formData.get('tickets');
    const date = formData.get('date');
    
    if (!name || !phone || !tickets || !date) {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Show confirmation
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin rtl:ml-2 rtl:mr-0"></i> جاري الحجز...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert(`تم حجز ${tickets} تذكرة بنجاح!`, 'success');
        form.reset();
        submitBtn.innerHTML = 'احجز الآن';
        submitBtn.disabled = false;
        
        // Open WhatsApp with booking details
        const arabicDate = formatDateArabic(date);
        const message = `مرحباً 👋\n\n🎟️ حجز تذاكر\n📊 عدد التذاكر: ${tickets}\n📅 التاريخ: ${arabicDate}\n👤 الاسم: ${name}\n📱 رقمي: ${phone}`;
        openWhatsApp(message);
    }, 1500);
}

/**
 * Handle Event Booking Form Submission
 */
function handleEventFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const eventType = formData.get('event-type');
    const date = formData.get('date');
    const guests = formData.get('guests');
    
    if (!name || !phone || !eventType || !date || !guests) {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin rtl:ml-2 rtl:mr-0"></i> جاري الحجز...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert(`تم حجز ${eventType} بنجاح! سنتواصل معك قريباً`, 'success');
        form.reset();
        submitBtn.innerHTML = 'احجز الآن';
        submitBtn.disabled = false;
        
        const arabicDate = formatDateArabic(date);
        const message = `مرحباً 👋\n\n🎉 حجز فعالية/حفلة\n📌 نوع الفعالية: ${eventType}\n📅 التاريخ: ${arabicDate}\n👥 عدد الضيوف: ${guests}\n👤 الاسم: ${name}\n📱 رقمي: ${phone}`;
        openWhatsApp(message);
    }, 1500);
}

/**
 * Handle Newsletter Subscription
 */
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!email || !isValidEmail(email)) {
        showAlert('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    showAlert('تم الاشتراك في النشرة بنجاح!', 'success');
    form.reset();
}

/**
 * Handle Modal Booking Form Submission
 */
function handleModalBookingFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const tickets = formData.get('tickets');
    const date = formData.get('date');
    const packageType = formData.get('package');
    
    if (!name || !phone || !tickets || !date) {
        showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin rtl:ml-2 rtl:mr-0"></i> جاري الحجز...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showAlert(`تم حجز ${tickets} تذكرة بنجاح!`, 'success');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Open WhatsApp with booking details
        const arabicDate = formatDateArabic(date);
        const packageLabel = packageType ? ` (${packageType})` : '';
        const message = `مرحباً 👋\n\nأريد حجز ${tickets} تذكرة${packageLabel}\n📅 التاريخ: ${arabicDate}\n👤 الاسم: ${name}\n📱 رقمي: ${phone}`;
        openWhatsApp(message);
        
        // Close modal
        closeBookingModal();
    }, 1500);
}

/**
 * Initialize Smooth Scroll
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

/**
 * Initialize Counter Animation
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for triggering animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

/**
 * Initialize Gallery
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
}

/**
 * Open Lightbox
 */
function openLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4';
    lightbox.innerHTML = `
        <button class="absolute top-4 right-4 text-white text-3xl hover:text-primary transition-colors" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <img src="${src}" alt="${alt}" class="max-w-full max-h-[90vh] rounded-lg shadow-2xl">
    `;
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });
}

/**
 * Initialize Booking Modal
 */
function initBookingModal() {
    // Close modal when clicking outside
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
}

/**
 * Open Booking Modal
 */
function openBookingModal(gameName) {
    const modal = document.getElementById('booking-modal');
    const gameInput = document.getElementById('booking-game');
    
    if (modal) {
        if (gameInput && gameName) {
            gameInput.value = gameName;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close Booking Modal
 */
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Convert date to Arabic format
 */
function formatDateArabic(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString + 'T00:00:00');
    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    const days = [
        'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayName = days[date.getDay()];
    
    return `${dayName} ${day} ${month} ${year}`;
}

/**
 * Open WhatsApp
 */
function openWhatsApp(message) {
    const phoneNumber = '9647716163020'; // نور المقدادية
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

/**
 * Show Alert Message
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `fixed top-24 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-4 rounded-lg shadow-2xl animate-slide-up ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    alertDiv.innerHTML = `
        <div class="flex items-center gap-3">
            <i class="fas fa-${
                type === 'success' ? 'check-circle' :
                type === 'error' ? 'exclamation-circle' :
                'info-circle'
            } text-xl"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
}

/**
 * Validate Email
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Format Phone Number
 */
function formatPhone(phone) {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');
    
    // Add country code if not present
    if (cleaned.startsWith('0')) {
        cleaned = '964' + cleaned.substring(1);
    } else if (!cleaned.startsWith('964')) {
        cleaned = '964' + cleaned;
    }
    
    return cleaned;
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
    
    @keyframes slide-up {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.openBookingModal = openBookingModal;
window.closeBookingModal = closeBookingModal;
window.openWhatsApp = openWhatsApp;

/**
 * Initialize Visitor Counter
 * Uses localStorage to track visitor count - increments by 1 per visit
 * Works without server or PHP, purely client-side
 */
function initVisitorCounter() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (!visitorCountElement) return;
    
    // Get current count from localStorage
    let currentCount = localStorage.getItem('visitorCount');
    
    if (currentCount === null) {
        // First visit - set to 1
        currentCount = 1;
    } else {
        // Increment for each visit
        currentCount = parseInt(currentCount) + 1;
    }
    
    // Save updated count to localStorage
    localStorage.setItem('visitorCount', currentCount.toString());
    
    // Display the count with animation
    animateValue(visitorCountElement, Math.max(0, currentCount - 1), currentCount, 1000);
}

/**
 * Animate counter value from start to end
 */
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Show emoji fallback when image fails to load
 */
function showEmojiFallback(img, emoji) {
    const container = img.parentElement;
    const fallbackDiv = container.querySelector('.emoji-fallback');
    if (fallbackDiv) {
        fallbackDiv.style.display = 'flex';
    }
}

/**
 * Initialize Gallery - Load real images or show emoji fallback
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-image');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            img.onload = function() {
                // Image loaded successfully
                const fallbackDiv = this.parentElement.querySelector('.emoji-fallback');
                if (fallbackDiv) {
                    fallbackDiv.style.display = 'none';
                }
                this.style.display = 'block';
            };
            
            img.onerror = function() {
                // Image failed to load, show emoji
                const fallbackDiv = this.parentElement.querySelector('.emoji-fallback');
                if (fallbackDiv) {
                    fallbackDiv.style.display = 'flex';
                }
            };
            
            // Force reload
            img.src = img.src;
        }
    });
}

/**
 * Open lightbox with image or emoji fallback
 */
function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    if (lightbox && img) {
        img.alt = alt;
        img.src = src;
        
        img.onload = function() {
            // Image loaded, hide fallback if exists
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };
        
        img.onerror = function() {
            // Image failed, show emoji placeholder
            const emojiMap = {
                'السفينة': '🚢',
                'الأخطبوط': '🐙',
                'سيارات التصادم': '🏎️',
                'ميدان الرمي': '🎯',
                'القطار': '🚂',
                'المقص': '✂️',
                'الديلاب الهواء': '🎠',
                'لعبة الارنب': '🐰'
            };
            
            // Create a placeholder div with the emoji
            const placeholder = document.createElement('div');
            placeholder.style.cssText = 'width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 200px; background: linear-gradient(135deg, #8B5CF6, #A78BFA); border-radius: 20px;';
            placeholder.textContent = emojiMap[alt] || '🎢';
            
            // Clear and append placeholder
            img.style.display = 'none';
            const parent = img.parentElement;
            const existingPlaceholder = parent.querySelector('.placeholder-emoji');
            if (existingPlaceholder) existingPlaceholder.remove();
            
            const newPlaceholder = placeholder.cloneNode(true);
            newPlaceholder.className = 'placeholder-emoji';
            parent.insertBefore(newPlaceholder, img);
            
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        };
    }
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
        // Clean up placeholder
        const placeholder = lightbox.querySelector('.placeholder-emoji');
        if (placeholder) placeholder.remove();
    }
}

// Setup lightbox close on outside click
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Make functions globally available
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    window.showEmojiFallback = showEmojiFallback;
});
