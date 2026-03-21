(() => {
    const BODY_CLASS = "vc-theme-enabled";

    function applyTheme() {
        document.body.classList.add(BODY_CLASS);
        document.documentElement.classList.add(BODY_CLASS);

        const transparentSelectors = [
            ".layout-main-section-wrapper",
            ".layout-main-section",
            ".layout-main",
            ".page-container",
            ".page-body",
            ".standard-page",
            ".desk-page",
            ".main-section",
            ".content.page-container",
            ".workspace-body",
            ".widget-group",
            ".form-page"
        ];

        const glassSelectors = [
            ".frappe-card",
            ".widget",
            ".form-section",
            ".report-wrapper",
            ".modal-content",
            ".dropdown-menu",
            ".list-row-container",
            ".list-row",
            ".section-body",
            ".dashboard-graph",
            ".number-card",
            ".form-dashboard",
            ".form-grid",
            ".dt-scrollable",
            ".layout-side-section"
        ];

        transparentSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.classList.add("vc-theme-transparent");
            });
        });

        glassSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => {
                el.classList.add("vc-theme-glass");
            });
        });
    }

    function bootTheme() {
        applyTheme();

        const observer = new MutationObserver(() => {
            applyTheme();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        document.addEventListener("click", () => {
            setTimeout(applyTheme, 50);
            setTimeout(applyTheme, 200);
            setTimeout(applyTheme, 500);
        });

        window.addEventListener("hashchange", () => {
            setTimeout(applyTheme, 50);
            setTimeout(applyTheme, 200);
            setTimeout(applyTheme, 500);
        });

        if (window.frappe && frappe.router) {
            $(document).on("page-change", function () {
                setTimeout(applyTheme, 50);
                setTimeout(applyTheme, 200);
                setTimeout(applyTheme, 500);
            });
        }

        setInterval(applyTheme, 1500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bootTheme);
    } else {
        bootTheme();
    }
})();