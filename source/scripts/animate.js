$(function () {
    // constants - required classes on the animated elem

    var UP = 'simple-up',
        DOWN = 'simple-down',
        RIGHT = 'simple-right',
        LEFT = 'simple-left';

    var STEP = 0.1;

    var IS_MOBILE = window.matchMedia("only screen and (max-width: 760px)"),
        IS_TABLET = window.matchMedia("only screen and (min-width: 760px) and (max-width: 1024px)");

    // default state page (if JS whorked)
    // @var animatedBlock - js collection

    var animatedBlock = document.querySelectorAll('.simple-animate-block');

    [].forEach.call(animatedBlock, function (el) {
        // find all children inside each blocks
        var children = el.querySelectorAll('.simple-up, .simple-down, .simple-right, .simple-left');

        // starting value delay for animation
        var delay = 0;

        [].forEach.call(children, function (el) {
            // hiding items
            el.style.opacity = 0;

            // adding a delay to each item
            el.style.animationDelay = delay + 's';
            // increasing the delay with each iteration
            delay += STEP;
        });
    });

    

    // function init animation

    var initAnimatePage = {
        init: function () {

            window.addEventListener('scroll', function () {

                var wHeigt = $(window).height(),
                    wScroll = $(window).scrollTop();

                [].forEach.call(animatedBlock, function (el) {
                    var eTop = el.offsetTop,
                        eHeignt = $(el).outerHeight();

                    if (IS_MOBILE.matches) {
                        if (wScroll > (eTop / 1.3)) {
                            animation(true, el);
                        } else {
                            return;
                        }
                    } else if (IS_TABLET.matches) {
                        if (wScroll > eTop / 1.5) {
                            animation(true, el);
                        } else {
                            return;
                        }
                    } else {
                        if (wScroll > (eTop - 200)) {
                            console.log('wScroll', wScroll, ';', 'eTop + eHeignt - wHeigt - 100', eTop + eHeignt - wHeigt - 100, ';', 'wScroll + wHeigt > eTop + eHeignt', wScroll + wHeigt > eTop + eHeignt);
                            // add classes if the block is in scope
                            animation(true, el);
                        } else if ((wScroll + wHeigt) < (eTop + eHeignt / 2)) {

                            // disabling animation in the task_3658 is not required
                            return;

                            // remove classes if the block out of scope
                            animation(false, el);
                        }
                    }

                });
            });
        }
    }

    /**
     * getDirection
     * @param el - {node} - DOM elem
     * @return {string} - name class
     */

    function getDirection(el) {
        var name = el.classList;
        name = String(name);

        if (name.indexOf(UP) > 0) {
            return 'simple-toup';
        } else if (name.indexOf(DOWN) > 0) {
            return 'simple-todown';
        } else if (name.indexOf(RIGHT) > 0) {
            return 'simple-toright';
        } else if (name.indexOf(LEFT) > 0) {
            return 'simple-toleft';
        }
    }

    /**
     * addAnimation and removeAnimation
     * @param el - {node} - DOM elem
     * @param dir - {string} name class
     */

    function addAnimation(el, dir) {
        el.classList.add(dir);
        el.style.opacity = 1;
    }

    function removeAnimation(el, dir) {
        el.classList.remove(dir);
        el.style.opacity = 0;
    }

    /**
     *
     * @param bollean {bollean}
     * @param container {node}
     * @return {function}
     */

    function animation(bollean, container) {

        // find all children inside each blocks
        child = container.querySelectorAll('.simple-up, .simple-down, .simple-right, .simple-left');

        if (bollean) {
            [].forEach.call(child, function (el) {
                addAnimation(el, getDirection(el));
            });
        } else {
            [].forEach.call(child, function (el) {
                removeAnimation(el, getDirection(el));
            });
        }
    }

    // initialization plugin
    initAnimatePage.init();
});
