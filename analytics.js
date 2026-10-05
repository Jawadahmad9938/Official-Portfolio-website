// Analytics Configuration
// Replace these placeholder IDs with your actual IDs
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
const CLARITY_PROJECT_ID = 'CLARITY_PROJECT_ID';

// Google Analytics 4 (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', GA4_MEASUREMENT_ID);

// Microsoft Clarity
(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", CLARITY_PROJECT_ID);

// Event tracking helpers
function trackWhatsAppClick(source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'contact',
            'event_label': source
        });
    }
}

function trackEmailClick(source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'email_click', {
            'event_category': 'contact',
            'event_label': source
        });
    }
}

function trackFormSubmit(formName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'event_category': 'contact',
            'event_label': formName
        });
    }
}

function trackSocialClick(platform, source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'event_category': 'social',
            'event_label': platform + '_' + source
        });
    }
}

// Auto-attach event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    // Track WhatsApp links
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(function(link) {
        link.addEventListener('click', function() {
            var source = this.closest('section')?.id || this.closest('[class*="section"]')?.className || 'unknown';
            trackWhatsAppClick(source);
        });
    });

    // Track email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(link) {
        link.addEventListener('click', function() {
            var source = this.closest('section')?.id || this.closest('[class*="section"]')?.className || 'unknown';
            trackEmailClick(source);
        });
    });

    // Track social links
    document.querySelectorAll('a[href*="twitter.com"], a[href*="x.com"], a[href*="linkedin.com"], a[href*="github.com"], a[href*="facebook.com"]').forEach(function(link) {
        link.addEventListener('click', function() {
            var platform = 'unknown';
            if (this.href.includes('twitter.com') || this.href.includes('x.com')) platform = 'twitter';
            else if (this.href.includes('linkedin.com')) platform = 'linkedin';
            else if (this.href.includes('github.com')) platform = 'github';
            else if (this.href.includes('facebook.com')) platform = 'facebook';
            
            var source = this.closest('section')?.id || this.closest('[class*="section"]')?.className || 'unknown';
            trackSocialClick(platform, source);
        });
    });

    // Track Formspree forms
    document.querySelectorAll('form[action*="formspree"]').forEach(function(form) {
        form.addEventListener('submit', function() {
            var formName = this.id || this.className || 'contact_form';
            trackFormSubmit(formName);
        });
    });
});
