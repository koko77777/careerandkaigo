window.onload = function () {};

var Home = function () {};

Home = {
    deviceJudgment: function () {
        var ua = navigator.userAgent;
        if (
            (ua.indexOf("iPhone") > 0 || ua.indexOf("Android") > 0) &&
            ua.indexOf("Mobile") > 0
        ) {
            $("meta[name ='viewport']").attr(
                "content",
                "width=device-width, initial-scale=1.0"
            );
        } else if (ua.indexOf("iPad") > 0 || ua.indexOf("Android") > 0) {
            $("meta[name ='viewport']").attr("content", "width=1200");
        } else {
            $("meta[name ='viewport']").attr(
                "content",
                "width=device-width, initial-scale=1.0"
            );
        }
    },

    imageReplace: function () {
        var $elem = $(".js-switch");
        var sp = "_sp.";
        var pc = "_pc.";
        var replaceWidth = 641;
        var windowWidth = parseInt(window.innerWidth);
        $elem.each(function () {
            var $this = $(this);
            if (windowWidth >= replaceWidth) {
                $this.attr("src", $this.attr("src").replace(sp, pc));
            } else {
                $this.attr("src", $this.attr("src").replace(pc, sp));
            }
        });
    },

    heroEffect: function () {
        gsap.from(".fv-ttl, .fv-txt", {
            duration: 0.8,
            ease: Power1.easeOut,
            x: -50,
            opacity: 0,
            delay: 0.3,
        });
        gsap.from(".fv-list .item01", {
            duration: 0.8,
            ease: Power1.easeOut,
            y: 50,
            opacity: 0,
            delay: 0.6,
        });
        gsap.from(".fv-list .item02", {
            duration: 0.8,
            ease: Power1.easeOut,
            y: 50,
            opacity: 0,
            delay: 0.9,
        });
    },

    scrollEffect: function () {
        $(window).scroll(function () {
            let scroll = $(window).scrollTop();
            let winHeight = $(window).height();
            $(".fade").each(function () {
                let elPos = $(this).offset().top;
                if (scroll > elPos - winHeight + winHeight / 5) {
                    $(this).addClass("fadeIn");
                }
            });
            $(".fadeup").each(function () {
                let elPos = $(this).offset().top;
                if (scroll > elPos - winHeight + winHeight / 5) {
                    $(this).addClass("fadeUp");
                }
            });
        });
    },
};

$(function () {
    Home.deviceJudgment();
    Home.imageReplace();
    Home.heroEffect();
    Home.scrollEffect();
});

$(window).on("load resize", function () {
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
        Home.imageReplace();
    }, 200);
});

function smoothScroll() {
    $('a[href^="#"]').click(function (e) {
        let headerHight = $(".armg_lpheader").innerHeight();
        let headerHightSp = $(".armg_lpheader_hgroup").innerHeight();
        console.log(headerHight);
        let speed = 400;
        let windowWidth0 = parseInt(window.innerWidth);
        let replaceWidth0 = 768;
        if (windowWidth0 <= replaceWidth0) {
            let href = $(this).attr("href");
            let target = $(href == "#" || href == "" ? "html" : href);
            let position = target.offset().top - headerHightSp;
            $("body,html").animate({ scrollTop: position }, speed, "swing");
            return false;
        } else {
            let href = $(this).attr("href");
            let target = $(href == "#" || href == "" ? "html" : href);
            let position = target.offset().top - headerHight;
            $("body,html").animate({ scrollTop: position }, speed, "swing");
        }
        return false;
    });
}
function slider01() {
    let sliderTab1 = new Swiper(".swiper-container-tab01", {
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    let mySwiper01 = new Swiper(".swiper-container01", {
        loop: true,
        autoHeight: true,
        thumbs: {
            swiper: sliderTab1,
        },
        navigation: {
            nextEl: ".swiper-button-next01",
            prevEl: ".swiper-button-prev01",
        },
    });
}
$(window).on("load resize", function () {
    $(".scroll__wrap--num01 .simplebar-content-wrapper").scroll(function (e) {
        $(".scroll__wrap .scroll__icon").fadeOut();
    });
});

$(function () {
    // smoothScroll();
    slider01();
});
