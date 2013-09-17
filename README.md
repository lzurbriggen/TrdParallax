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
	offsetY: 20,
	leaveAnimation: true,
	enterAnimation: true
});
```
Do the same for every other element that should move in the viewport.

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