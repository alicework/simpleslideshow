# simpleslideshow
===============

A very simple slideshow


## Usage


```php
var mySlide = new SimpleSlideshow(
     { containerSelector : "#mySlideshow",
         slideClass : "slide",
         previousButtonSelector : ".previous",
         nextButtonSelector : ".next",
         transition : SimpleSlideshow.TRANSITION_FADE,
         autoplay : false
);
```

## Params

- containerSelector (string)
- slideClass (string)
- previousButtonSelector (string)
- nextButtonSelector (string)
- autoplay (true | false)
- startDelay (int)
- moveDelay (int)
- effectDelay (int)
- transition ("fade" | "slide")
- direction ("forward" | "backward" | "upward" | "downward")

## Todo

- [ ] Add class constants for transitions and directions label
- [ ] Chrome debugging
