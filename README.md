simpleslideshow
===============

A very simple slideshow


Class slideshow

Example Usage

var mySlide = new SimpleSlideshow(
     { containerSelector : "#mySlideshow",
         slideClass : "slide",
         previousButtonSelector : ".previous",
         nextButtonSelector : ".next",
         transition : SimpleSlideshow.TRANSITION_FADE,
         autoplay : false
);


PARAMS ******************************
 containerSelector                 string
 slideClass                  string
 previousButtonSelector      string
 nextButtonSelector          string
 autoplay                    true | false
 startDelay                  int
 moveDelay                   int
 effectDelay                   int
 transition                  fade | slide
 direction                   forward | backward | upward | downward
