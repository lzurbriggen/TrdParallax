/*
 TrdParallax
 Very simple plugin to move parallax elements according to cursor position in viewport.
 */

;(function($) {"use strict";

	var TrdParallax = function(el, options) {
		var self = this;
		this.$el = $(el);
		this.options = options;
		this.$viewport = this.options.viewport;
		this.originX = this.options.originX || 0;
		this.originY = this.options.originY || 0;
		this.offsetX = this.options.offsetX || 0;
		this.offsetY = this.options.offsetY || 0;
		this.invert = this.options.invert || false;
		this.enterAnimation = this.options.enterAnimation || false;
		this.leaveAnimation = this.options.leaveAnimation || false;
		this.enterAnimationDuration = this.options.enterAnimationDuration || 60;
		this.leaveAnimationDuration = this.options.leaveAnimationDuration || 250;
		this.leaveReset = this.options.leaveReset || this.leaveAnimation;

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

		// Recalculate element positions when mouse moves and enter animation is not being played
		self.$viewport.on('mousemove', function(e) {
			if(self.animating == false){
				calcMargins(e);
			}
		});
		
		// Animate elements to cursor position to make entering the viewport smoother when configured
		self.$viewport.on('mouseenter', function(e) {
			if(self.enterAnimation){
				var parentOffset = self.$el.parent().offset(); 
				var mouseX = e.pageX - parentOffset.left;
				var mouseY = e.pageY - parentOffset.top;

				var ratioX = mouseX / self.$viewport.innerWidth() ;
				var ratioY = mouseY / self.$viewport.innerHeight() ;

				self.animating = true;
				self.$el.stop().animate({
					'margin-left': (self.sign * ratioX * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px',
					'margin-top': (self.sign * ratioY * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px'}, self.enterAnimationDuration, function(){
						self.animating = false;
					});
			}
		});
		
		// Reset element position when configured (with or without animation)
		self.$viewport.on('mouseleave', function(e) {
			if(self.leaveReset){
				if(self.leaveAnimation){
					self.$el.animate({
						'margin-left': (self.sign * 0.5 * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px',
						'margin-top': (self.sign * 0.5 * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px'}, self.leaveAnimationDuration);
				}else{
					resetPosition();
				}
			}
		});

		// Reset element position
		function resetPosition(){
			self.$el.css('margin-left', (self.sign * 0.5 * self.offsetX / 2 -self.sign * self.originX * self.offsetX / 2) * 2 + 'px');
			self.$el.css('margin-top', (self.sign * 0.5 * self.offsetY / 2 -self.sign * self.originY * self.offsetY / 2) * 2 + 'px');
		}
		
		// Calculate element position based on cursor position in viewport
		function calcMargins(e){
			var parentOffset = self.$el.parent().offset(); 
			var mouseX = e.pageX - parentOffset.left;
			var mouseY = e.pageY - parentOffset.top;

			var ratioX = mouseX / self.$viewport.innerWidth() ;
			var ratioY = mouseY / self.$viewport.innerHeight() ;

			self.$el.css('margin-left', (self.sign * ratioX * self.offsetX / 2 - self.sign * self.originX * self.offsetX / 2) * 2 + 'px');
			self.$el.css('margin-top', (self.sign * ratioY * self.offsetY / 2 - self.sign * self.originY * self.offsetY / 2) * 2 + 'px');
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