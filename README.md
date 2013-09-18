TrdParallax
======

TrdParallax is a very simple jQuery plugin to move elements according to cursor position in a specified viewport.

Usage
------

Example of an element positioned middle and bottom of the viewport, moving by 20 pixels in each direction and playing animations when cursor leaves and enters the viewport:
```
$('.element1').trdparallax({
	viewport: $('.viewport'),
	originX: 0.5,
	originY: 1,
	offsetX: 20,
	offsetY: 20
});
```
Do the same for every other element that should move in the viewport.
Those options can also be set on the viewport element like this (do this before you call the plugin on the elements):

```
$(".viewport").data('options', {
	enterAnimation: true,
	invert: true,
	resetOnResize: true
});
```
These values will be overridden, if the elements set the options themselfes. You should use this to provide default settings what especially makes sense for the animation, reset and invert options.

The viewport element needs to have a ```position``` attribute set to ```relative```, ```absolute``` or ```fixed```. I also recommend you to set ```overflow: hidden;```.

**Care**: Images need to be loaded when the plugin is attached to the element, you may need to use a wrapper like this:

```
$(window).load(function(){
	
});
```

Options
------

| Option | Description | Default |
| :------------- | :------------- | :----- |
| viewport | (Element, required) | null |
| originX | (0-1) Horizontal origin position | 0 |
| originY | (0-1) Vertical origin position | 0 |
| offsetX | (int) Margin in pixels how far the element moves horizontally | 0 |
| offsetY | (int) Margin in pixels how far the element moves vertically | 0 |
| invert | (bool) Elements move towards mouse cursor | false |
| enterAnimation | (bool) Animate the elements when mouse enters | false |
| leaveAnimation | (bool) Animate the elements when mouse leaves | false |
| enterAnimationDuration | (int) Duration of the mouse enter animation | 60 |
| leaveAnimationDuration | (int) Duration of the mouse leave animation | 250 |
| leaveReset | Reset position if curosr leaves the viewport, automatically active if leaveAnimation is true | false |
| resetOnResize | Recalculates element positions when window is resized | false |

License
------

```
Copyright (C) 2013 Leo Zurbriggen http://www.leoz.ch

This software is provided 'as-is', without any express or implied warranty. 
In no event will the authors be held liable for any damages arising from the 
use of this software. Permission is granted to anyone to use this software 
for any purpose, including commercial applications, and to alter it and 
redistribute it freely, subject to the following restrictions:

1. If we meet some day, and you think this stuff is worth it, you can buy 
   me a beer in return.
2. The origin of this software must not be misrepresented; you must not 
   claim that you wrote the original software. If you use this software in 
   a product, an acknowledgment in the product documentation would be 
   appreciated but is not required.
3. Altered source versions must be plainly marked as such, and must not 
   be misrepresented as being the original software.
```