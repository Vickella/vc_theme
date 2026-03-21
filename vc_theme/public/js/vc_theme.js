frappe.ready(() => {
    document.body.classList.add("vc-theme-enabled");

    const applyThemeClasses = () => {
        document.body.classList.add("vc-theme-enabled");

        document.querySelectorAll(
            ".page-container, .layout-main-section, .standard-page, .desk-page, .page-body"
        ).forEach((el) => {
            el.classList.add("vc-theme-transparent");
        });

        document.querySelectorAll(
            ".frappe-card, .widget, .form-section, .report-wrapper, .modal-content, .dropdown-menu"
        ).forEach((el) => {
            el.classList.add("vc-theme-glass");
        });
    };

    applyThemeClasses();

    const observer = new MutationObserver(() => {
        applyThemeClasses();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    $(document).on("page-change", function () {
        applyThemeClasses();
    });
});