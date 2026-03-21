(() => {
    const THEME_CLASS = "vc-theme-enabled";

    function applyTheme() {
        document.documentElement.classList.add(THEME_CLASS);
        document.body.classList.add(THEME_CLASS);

        const transparent = [
            ".desk-container",
            ".main-section",
            ".layout-main",
            ".layout-main-section-wrapper",
            ".layout-main-section",
            ".page-container",
            ".page-body",
            ".standard-page",
            ".desk-page",
            ".workspace-body",
            ".form-page",
            ".form-layout",
            ".report-view",
            ".query-report",
            ".content",
        ];

        const glass = [
            ".frappe-card",
            ".widget",
            ".widget-body",
            ".form-section",
            ".form-dashboard",
            ".section-body",
            ".report-wrapper",
            ".modal-content",
            ".dropdown-menu",
            ".list-row-container",
            ".list-row",
            ".dt-scrollable",
            ".number-card",
            ".dashboard-graph",
            ".layout-side-section",
        ];

        transparent.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.classList.add("vc-theme-transparent");
            });
        });

        glass.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.classList.add("vc-theme-glass");
            });
        });
    }

    function initTheme() {
        applyTheme();

        const observer = new MutationObserver(() => {
            applyTheme();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        if (window.frappe && window.frappe.router) {
            $(document).on("page-change", function () {
                setTimeout(applyTheme, 50);
                setTimeout(applyTheme, 200);
                setTimeout(applyTheme, 500);
            });
        }

        window.addEventListener("hashchange", () => {
            setTimeout(applyTheme, 50);
            setTimeout(applyTheme, 200);
            setTimeout(applyTheme, 500);
        });

        setInterval(applyTheme, 1500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTheme);
    } else {
        initTheme();
    }
})();