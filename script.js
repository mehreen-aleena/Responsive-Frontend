document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const siteNav = document.querySelector('.site-nav');

    // Interactive State Toggle for Mobile Navigation Menu
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', () => {
            siteNav.classList.toggle('active');
            navToggle.classList.toggle('active-menu');
            
            // Manage Accessibility attributes natively
            const isExpanded = siteNav.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});