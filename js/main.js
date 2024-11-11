(function ($) {
    "use strict";
    
    // Debounce function to limit the rate of event handling
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Back to top button
    $(window).scroll(debounce(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow').attr("aria-label", "Scroll to top");
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    }));
    
    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });
    
    // Dropdown on mouse hover
    function toggleNavbarMethod() {
        if ($(window).width() > 992) {
            $('.navbar .dropdown').on('mouseover', function () {
                $('.dropdown-toggle', this).trigger('click');
            }).on('mouseout', function () {
                $('.dropdown-toggle', this).trigger('click').blur();
            });
        } else {
            $('.navbar .dropdown').off('mouseover').off('mouseout');
        }
    }

    $(document).ready(toggleNavbarMethod);
    $(window).resize(debounce(toggleNavbarMethod, 50));
    
    // Testimonials carousel
    const carouselSettings = {
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1 },
            576: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    };

    $(".testimonials-carousel").owlCarousel(carouselSettings);
    
    // Portfolio isotope and filter
    const portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
    
})(jQuery);
