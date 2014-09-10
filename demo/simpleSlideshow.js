/**
 * Class slideshow
 * 
 * Example Usage
 * 
 * var mySlide = new SimpleSlideshow(
 *      { containerSelector : "#mySlideshow",
 *          slideClass : "slide",
 *          previousButtonSelector : ".previous",
 *          nextButtonSelector : ".next",
 *          transition : SimpleSlideshow.TRANSITION_FADE,
 *          autoplay : false
 * );
 * 
 * 
 * PARAMS ******************************
 *  containerSelector                 string
 *  slideClass                  string
 *  previousButtonSelector      string
 *  nextButtonSelector          string
 *  autoplay                    true | false
 *  startDelay                  int
 *  moveDelay                   int
 *  effectDelay                   int
 *  transition                  fade | slide
 *  direction                   forward | backward | upward | downward
 */
function SimpleSlideshow(params) {
    // Params
    this.containerSelector = params.containerSelector || "#slideshow";
    this.slideClass = params.slideClass || "slide";
    this.previousButtonSelector = params.previousButtonSelector || ".previous";
    this.nextButtonSelector = params.nextButtonSelector || ".next";
    this.autoplay = params.autoplay || false;
    this.startDelay = params.startDelay || 2000;
    this.moveDelay = params.moveDelay || 4000;
    this.effectDelay = params.effectDelay || 1000;
    this.direction = params.direction || "forward";
    this.transition = params.transition || "slide";
    this.width = params.width || 0;
    this.height = params.height || 0;

    // Dynamic params
    this.slides = {};
    this.timer = null;
    this.currentPosition = 0;
    this.count = 0;
    this.reading = false;

    this.init = function() {
        $container = $(this.containerSelector);
        this.slides = $container.find("." + this.slideClass);

        this.count = this.slides.length;

        this.slides.wrapAll('<div class="wrapper-slides"></div>')
                .css({
            'float': 'left',
            'width': this.width
        });

        // styling
        $container.css('width', this.width);
        $container.css('height', this.height);
        $container.css("overflow", "hidden");
        if (this.direction === "backward" || this.direction === "forward" || this.transition === "fade") {
            $container.find(".wrapper-slides").css('width', this.width * this.count);

            this.slides.each(function() {
                $(this).css('width', this.width);
                $(this).css('float', "left");
            });
        } else {
            $container.find(".wrapper-slides").css('height', this.height * this.count);

            this.slides.each(function() {
                $(this).css('height', this.height);
            });
        }

        // Binds
        var t = this;
        if ($(this.nextButtonSelector).length > 0)
            $(this.nextButtonSelector).click(function() {
                t.stop();
                t.next();
                return false;
            });
        if ($(this.previousButtonSelector).length > 0)
            $(this.previousButtonSelector).click(function() {
                t.stop();
                t.previous();
                return false;
            });

        if (this.autoplay) {
            var t = this;
            window.setTimeout(function() {
                t.play();
            }, this.startDelay);
        }
    }

    this.init();
}

/** METHODS **/
SimpleSlideshow.prototype.play = function() {
    this.stop();
    var t = this;
    if (this.direction === "backward" || this.direction === "upward") {
        this.timer = setInterval(function() {
            t.previous();
        }, this.moveDelay);
    } else {
        this.timer = setInterval(function() {
            t.next();
        }, this.moveDelay);
    }
    this.reading = true;
};

SimpleSlideshow.prototype.stop = function() {
    this.reading = false;
    clearInterval(this.timer);
};

SimpleSlideshow.prototype.next = function() {
    this.currentPosition++;
    if (this.currentPosition >= (this.count)) {
        this.currentPosition = 0;
    }
    this.move();
};

SimpleSlideshow.prototype.previous = function() {
    this.currentPosition--;
    if (this.currentPosition < 0) {
        this.currentPosition = this.count - 1;
    }
    this.move();
};

SimpleSlideshow.prototype.move = function(fast) {
    fast = (fast || false);
    var animDuration = fast ? 0 : this.effectDelay;

    switch (this.transition) {
        case "fade":
            this.slides.filter(":visible").hide();
            if (fast) {
                this.slides.eq(this.currentPosition).show();
            } else {
                this.slides.eq(this.currentPosition).fadeIn(this.effectDelay);
            }
            break;
        case "slide":
        default:
            if (this.direction === "backward" || this.direction === "forward") {
                $(this.containerSelector).find(".wrapper-slides").animate({
                    'marginLeft': this.width * (-this.currentPosition)
                }, animDuration);
            } else {
                $(this.containerSelector).find(".wrapper-slides").animate({
                    'marginTop': this.height * (-this.currentPosition)
                }, animDuration);
            }
            break;
    }
};

SimpleSlideshow.prototype.moveTo = function(index) {
    this.currentPosition = index;
    this.move();
};

SimpleSlideshow.prototype.setPosition = function(index) {
    this.currentPosition = index;
    this.move(true);
};