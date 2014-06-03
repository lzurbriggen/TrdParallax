/**
 * TrdParallax
 * Very simple plugin to move parallax elements according to cursor position in viewport.
 *
 * @author Leo Zurbriggen
 * @version 1.2
 * Copyright © 2014 Leo Zurbriggen <leo@leoz.ch>
 */

;(function($) {"use strict";

	var TrdParallax = function(el, options) {
		var self = this;
		this.$el = $(el);
		this.options = options;
		this.$viewport = this.options.viewport;
		this.viewportOptions = this.$viewport.data('options') || {};
		this.originX = this.options.originX || this.viewportOptions.originX || 0;
		this.originY = this.options.originY || this.viewportOptions.originY || 0;
		this.offsetX = this.options.offsetX || this.viewportOptions.offsetX || 0;
		this.offsetY = this.options.offsetY || this.viewportOptions.offsetY || 0;
		this.invert = this.options.invert || this.viewportOptions.invert || false;
		this.enterAnimation = this.options.enterAnimation || this.viewportOptions.enterAnimation || false;
		this.leaveAnimation = this.options.leaveAnimation || this.viewportOptions.leaveAnimation || false;
		this.enterAnimationDuration = this.options.enterAnimationDuration || this.viewportOptions.enterAnimationDuration || 60;
		this.leaveAnimationDuration = this.options.leaveAnimationDuration || this.viewportOptions.leaveAnimationDuration || 250;
		this.leaveReset = this.options.leaveReset || this.viewportOptions.leaveReset || this.leaveAnimation;
		this.resetOnResize = this.options.resetOnResize || this.viewportOptions.resetOnResize || false;
		this.easing = this.options.easing || 'ease';

		$(window).resize(function(){
			if(self.resetOnResize){
				self.resize();
			}
		});

		this.animating = false;

		this.sign = 1;
		if(this.invert){
			this.sign = -1;
		}

		// Initial calculate element position
		self.$el.css('float', 'left');
		self.$el.css('position', 'absolute');

		self.$el.css('left', self.originX * self.$viewport.innerWidth() - self.originX * self.$el.innerWidth() + (self.originX - 0.5) *  self.offsetX * 2 + 'px');
		self.$el.css('top', self.originY * self.$viewport.innerHeight() - self.originY * self.$el.innerHeight() + (self.originY - 0.5) * self.offsetY * 2 + 'px');
		
		resetPosition();

		// Animate elements to cursor position to make entering the viewport smoother when configured
		self.$viewport.on('mouseenter', function(e) {
			if(self.enterAnimation){
				var parentOffset = self.$el.parent().offset(); 
				var mouseX = e.pageX - parentOffset.left;
				var mouseY = e.pageY - parentOffset.top;

				var ratioX = mouseX / self.$viewport.innerWidth() ;
				var ratioY = mouseY / self.$viewport.innerHeight() ;

				self.animating = true;
				self.$el.css('transition', 'all ' + self.enterAnimationDuration / 1000 + 's ' + self.easing);
				self.$el.css('transform', 'translate3d(' + (self.sign * ratioX * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px, '
														 + (self.sign * ratioY * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px, 0)');

				setTimeout(function(){
					self.animating = false;
				}, self.enterAnimationDuration);
			}

			self.hover = true;
		});

		// Recalculate element positions when mouse moves and enter animation is not being played
		self.$viewport.on('mousemove', function(e) {
			if(self.hover && self.animating === false){
				calcPosition(e);
			}
		});
		
		// Reset element position when configured (with or without animation)
		self.$viewport.on('mouseleave', function(e) {
			if(self.leaveReset){
				if(self.leaveAnimation){
					self.$el.css('transition', 'all ' + self.leaveAnimationDuration / 1000 + 's ' + self.easing);
					self.$el.css('transform', 'translate3d(' + (self.sign * 0.5 * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px, '
															 + (self.sign * 0.5 * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px, 0)');
				}else{
					resetPosition();
				}
			}
			self.hover = false;
		});

		// Recalculate element positions
		self.resize = function(){
			self.$el.css('left', self.originX * self.$viewport.innerWidth() - self.originX * self.$el.innerWidth() + (self.originX - 0.5) *  self.offsetX * 2 + 'px');
			self.$el.css('top', self.originY * self.$viewport.innerHeight() - self.originY * self.$el.innerHeight() + (self.originY - 0.5) * self.offsetY * 2 + 'px');
			
			resetPosition();
		}

		// Reset element position
		function resetPosition(){
			self.$el.css('transform', 'translate3d(' + (self.sign * 0.5 * self.offsetX / 2 -self.sign * self.originX * self.offsetX / 2) * 2 + 'px, '
													 + (self.sign * 0.5 * self.offsetY / 2 -self.sign * self.originY * self.offsetY / 2) * 2 + 'px, 0)');
		}
		
		// Calculate element position based on cursor position in viewport
		function calcPosition(e){
			var parentOffset = self.$el.parent().offset(); 
			var mouseX = e.pageX - parentOffset.left;
			var mouseY = e.pageY - parentOffset.top;

			var ratioX = mouseX / self.$viewport.innerWidth() ;
			var ratioY = mouseY / self.$viewport.innerHeight() ;

			self.$el.css('transition', 'all 0 linear');
			self.$el.css('transform', 'translate3d(' + (self.sign * ratioX * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px,'
								 					 + (self.sign * ratioY * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px, 0)');
		}

		return this;
	}

	$.fn.trdparallax = function(options) {
		return this.each(function() {
			var el = $(this);
			var trdParallax = new TrdParallax(this, options);
		});
	};

})(jQuery); 