// Calendly inline widget initialization and responsive behavior
window.onload = function () {
    Calendly.initInlineWidget({
        url: 'https://calendly.com/leor-architex/30min',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: {},
        utm: {
            utmSource: "architex_website",
            utmMedium: "hire_page",
            utmCampaign: "architectural_services"
        }
    });

    // Add responsive behavior for Calendly
    function adjustCalendlyHeight() {
        var calendlyWidget = document.querySelector('.calendly-inline-widget');
        if (window.innerWidth <= 480) {
            calendlyWidget.style.height = '550px';
        } else if (window.innerWidth <= 576) {
            calendlyWidget.style.height = '580px';
        } else if (window.innerWidth <= 768) {
            calendlyWidget.style.height = '600px';
        } else {
            calendlyWidget.style.height = '630px';
        }
    }

    // Initial adjustment
    adjustCalendlyHeight();

    // Adjust on resize
    window.addEventListener('resize', adjustCalendlyHeight);
};