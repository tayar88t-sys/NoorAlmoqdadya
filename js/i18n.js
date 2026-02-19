// Internationalization (i18n) System for Noor Al-Muqdadiyah
// Manages language switching, translations, and direction changes

class I18n {
  constructor() {
    this.currentLanguage = this.getStoredLanguage() || 'ar-IQ';
    this.translations = {};
    
    // Language metadata with names, directions, and flag emojis
    this.languages = {
      'ar-IQ': { 
        name: 'العربية (العراق)', 
        nativeName: 'عربي العراق',
        dir: 'rtl', 
        flag: '🇮🇶' 
      },
      'en-US': { 
        name: 'English (USA)', 
        nativeName: 'English',
        dir: 'ltr', 
        flag: '🇺🇸' 
      },
      'fr-FR': { 
        name: 'Français', 
        nativeName: 'Français',
        dir: 'ltr', 
        flag: '🇫🇷' 
      },
      'de-DE': { 
        name: 'Deutsch', 
        nativeName: 'Deutsch',
        dir: 'ltr', 
        flag: '🇩🇪' 
      },
      'es-ES': { 
        name: 'Español', 
        nativeName: 'Español',
        dir: 'ltr', 
        flag: '🇪🇸' 
      },
      'it-IT': { 
        name: 'Italiano', 
        nativeName: 'Italiano',
        dir: 'ltr', 
        flag: '🇮🇹' 
      },
      'pt-PT': { 
        name: 'Português', 
        nativeName: 'Português',
        dir: 'ltr', 
        flag: '🇵🇹' 
      },
      'zh-CN': { 
        name: '中文 (简体)', 
        nativeName: '中文',
        dir: 'ltr', 
        flag: '🇨🇳' 
      },
      'ja-JP': { 
        name: '日本語', 
        nativeName: '日本語',
        dir: 'ltr', 
        flag: '🇯🇵' 
      },
      'ko-KR': { 
        name: '한국어', 
        nativeName: '한국어',
        dir: 'ltr', 
        flag: '🇰🇷' 
      },
      'ru-RU': { 
        name: 'Русский', 
        nativeName: 'Русский',
        dir: 'ltr', 
        flag: '🇷🇺' 
      },
      'tr-TR': { 
        name: 'Türkçe', 
        nativeName: 'Türkçe',
        dir: 'ltr', 
        flag: '🇹🇷' 
      }
    };
    
    this.init();
  }

  /**
   * Initialize the i18n system
   */
  async init() {
    await this.loadTranslations(this.currentLanguage);
    this.applyLanguage();
  }

  /**
   * Get the stored language preference from localStorage
   */
  getStoredLanguage() {
    return localStorage.getItem('selectedLanguage');
  }

  /**
   * Save language preference to localStorage
   */
  saveLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
  }

  /**
   * Load translation file for specified language
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations = await response.json();
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
      // Fallback to a default language if load fails
      if (lang !== 'ar-IQ') {
        await this.loadTranslations('ar-IQ');
      }
    }
  }

  /**
   * Apply the current language settings to the page
   */
  applyLanguage() {
    const langData = this.languages[this.currentLanguage];
    
    // Set HTML element attributes
    document.documentElement.lang = this.currentLanguage;
    document.documentElement.dir = langData.dir;
    document.body.dir = langData.dir;
    
    // Update document title if available
    if (this.translations.themeTitle) {
      document.title = this.translations.themeTitle;
    }
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (this.translations[key]) {
        // Handle different element types
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = this.translations[key];
        } else {
          element.textContent = this.translations[key];
        }
      }
    });
    
    // Update language selector button to show active language
    this.updateLanguageSelector();
  }

  /**
   * Change the current language and update the page
   */
  async changeLanguage(lang) {
    if (!this.languages[lang]) {
      console.error(`Language ${lang} not supported`);
      return;
    }
    
    this.currentLanguage = lang;
    this.saveLanguage(lang);
    await this.loadTranslations(lang);
    this.applyLanguage();
  }

  /**
   * Get translation for a specific key
   */
  getTranslation(key) {
    return this.translations[key] || key;
  }

  /**
   * Get all supported languages
   */
  getLanguages() {
    return this.languages;
  }

  /**
   * Get current language data
   */
  getCurrentLanguage() {
    return {
      code: this.currentLanguage,
      ...this.languages[this.currentLanguage]
    };
  }

  /**
   * Update the language selector UI to show which language is active
   */
  updateLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (selector) {
      const buttons = selector.querySelectorAll('[data-lang]');
      buttons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-lang') === this.currentLanguage) {
          button.classList.add('active');
        }
      });
    }
  }
}

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
  });
} else {
  window.i18n = new I18n();
}
