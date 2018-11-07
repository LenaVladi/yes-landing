var feedbackSlider = new Swiper('.swiper-container', {
    init: true,
    speed: 400,
    grabCursor: true,
    autoplay: {
        delay: 2000,
    },
    autoHeight: false,
    slidesPerView: 1,
    slideActiveClass: 'active',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    touchEventsTarget: '.swiper-container',
    observer: true,
});
