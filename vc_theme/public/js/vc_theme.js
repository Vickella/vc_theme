// VC Theme - Persistent Theme Application
(function() {
    "use strict";
    
    const THEME_CLASS = "vc-theme-enabled";
    
    function applyTheme() {
        // Add theme class to html and body
        document.documentElement.classList.add(THEME_CLASS);
        document.body.classList.add(THEME_CLASS);
        
        // Log for debugging
        if (window.vcThemeDebug) {
            console.log("VC Theme: Applied to page");
        }
    }
    
    // Apply immediately
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyTheme);
    } else {
        applyTheme();
    }
    
    // Watch for DOM changes
    const observer = new MutationObserver(function(mutations) {
        if (!document.body.classList.contains(THEME_CLASS)) {
            applyTheme();
        }
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true
    });
    
    // Reapply on route changes (for SPAs)
    if (window.frappe && frappe.router) {
        frappe.router.on("change", function() {
            setTimeout(applyTheme, 100);
        });
    }
    
    // Fallback interval
    setInterval(function() {
        if (!document.body.classList.contains(THEME_CLASS)) {
            applyTheme();
        }
    }, 2000);
    
    // Enable debug mode (optional)
    window.vcThemeDebug = false;
})();
