import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel {
 
  _initListeners() {
    super._initListeners();
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  }

  _swipeStart(event) {
    this.swipeStartX = event.changedTouches[0].pageX;
  }

  _swipeEnd(event) {
    this.swipeEndX = event.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
    this.swipeStartX - this.swipeEndX > 100 && this.next();
  }
};

export default SwipeCarousel;
