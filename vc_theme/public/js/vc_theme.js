// your_theme_app/public/js/theme.js

(function() {
    "use strict";

    const THEME_CLASS = "vc-theme-force";
    let observer = null;
    let intervalId = null;

    // Function to apply theme to all elements
    function applyThemeToElements() {
        if (!document.body) return;

        // Add theme class to root elements
        document.documentElement.classList.add(THEME_CLASS);
        document.body.classList.add(THEME_CLASS);

        // Find all elements that might contain background
        const allElements = document.querySelectorAll('*');
        const backgroundElements = [
            'div', 'section', 'main', 'article', 'aside', 
            'header', 'footer', 'nav', 'form', 'fieldset'
        ];

        // Force background on all major containers
        backgroundElements.forEach(tag => {
            const elements = document.querySelectorAll(tag);
            elements.forEach(el => {
                const computedStyle = window.getComputedStyle(el);
                const bgColor = computedStyle.backgroundColor;
                const bgImage = computedStyle.backgroundImage;
                
                // If element has white or light background, make it transparent
                if (bgColor && (bgColor.includes('rgb(255, 255, 255)') || 
                    bgColor.includes('rgb(248, 249, 250)') ||
                    bgColor.includes('rgb(245, 245, 245)'))) {
                    el.style.setProperty('background', 'transparent', 'important');
                }
            });
        });
    }

    // Function to handle dynamic content
    function handleDynamicContent() {
        applyThemeToElements();
        
        // Force all buttons to have hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (!button.hasAttribute('data-theme-applied')) {
                button.setAttribute('data-theme-applied', 'true');
                button.classList.add('btn-theme-enhanced');
            }
        });
    }

    // Initialize theme
    function initTheme() {
        // Apply theme immediately
        applyThemeToElements();
        handleDynamicContent();

        // Use MutationObserver to watch for DOM changes
        if (window.MutationObserver) {
            observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                        handleDynamicContent();
                    }
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['class', 'style']
            });
        }

        // Watch for Frappe router changes
        if (window.frappe && window.frappe.router) {
            // Override frappe router methods to ensure theme persists
            const originalRoute = frappe.router.set_route;
            if (originalRoute) {
                frappe.router.set_route = function() {
                    const result = originalRoute.apply(this, arguments);
                    setTimeout(() => {
                        applyThemeToElements();
                        handleDynamicContent();
                    }, 100);
                    return result;
                };
            }
        }

        // Watch for hash changes
        window.addEventListener('hashchange', function() {
            setTimeout(() => {
                applyThemeToElements();
                handleDynamicContent();
            }, 100);
        });

        // Watch for popstate (browser back/forward)
        window.addEventListener('popstate', function() {
            setTimeout(() => {
                applyThemeToElements();
                handleDynamicContent();
            }, 100);
        });

        // Periodic check to ensure theme persists (backup)
        intervalId = setInterval(() => {
            if (!document.body.classList.contains(THEME_CLASS)) {
                document.body.classList.add(THEME_CLASS);
            }
            handleDynamicContent();
        }, 2000);
    }

    // Start theme when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Ensure theme persists even after full page reloads
    window.addEventListener('load', function() {
        setTimeout(() => {
            applyThemeToElements();
            handleDynamicContent();
        }, 50);
    });

    // Export cleanup function (optional)
    window.cleanupTheme = function() {
        if (observer) observer.disconnect();
        if (intervalId) clearInterval(intervalId);
        document.documentElement.classList.remove(THEME_CLASS);
        document.body.classList.remove(THEME_CLASS);
    };
})();

// Frappe specific - ensure theme is applied after Frappe initialization
if (window.frappe) {
    frappe.ready(function() {
        setTimeout(() => {
            document.body.classList.add('vc-theme-force');
            const style = document.createElement('style');
            style.textContent = `
                .vc-theme-force {
                    background: linear-gradient(135deg, #4158D0 0%, #C850C0 50%, #FFCC70 100%) !important;
                }
            `;
            document.head.appendChild(style);
        }, 100);
    });
}