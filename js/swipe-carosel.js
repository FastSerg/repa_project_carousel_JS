
function SwipeCarosel() {
  Carousel.apply(this, arguments);
}

SwipeCarosel.prototype = Object.create(Carousel.prototype);
SwipeCarosel.prototype.constructor = SwipeCarosel;

SwipeCarosel.prototype._initListeners = function() {
  Carousel.prototype._initListeners.apply(this);
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
}

SwipeCarosel.prototype._swipeStart = function(event) {
  this.swipeStartX = event.changedTouches[0].pageX;
};

SwipeCarosel.prototype._swipeEnd = function(event) {
  this.swipeEndX = event.changedTouches[0].pageX;
  this.swipeStartX - this.swipeEndX < -100 && this.prev();
  this.swipeStartX - this.swipeEndX > 100 && this.next();
};