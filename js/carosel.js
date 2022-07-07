function Carousel(container = '.carousel', slider = '.slide__item') {
  this.container = document.querySelector(container);
  this.slides = this.container.querySelectorAll(slider);
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;
    this.isPlaing = true;
    this.interval = 2000;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.LEFT = `<i class="fas fa-chevron-left"></i>`;
    this.RIGHT = `<i class="fas fa-chevron-right"></i>`;
  },

  _initControls() {
    const controls = document.createElement('div');
    const PREV = `<div type="button" class="controls__item controls__prev">${this.LEFT}</div>`;
    const NEXT = `<div type="button" class="controls__item controls__next">${this.RIGHT}</div>`;
    const PAUSE = `<div type="button" class="controls__item controls__pause">Pause</div>`;

    this.container.append(controls);
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PREV + NEXT + PAUSE;

    this.pauseBtn = document.querySelector('.controls__pause');
    this.prevBtn = document.querySelector('.controls__prev');
    this.nextBtn = document.querySelector('.controls__next');
  },

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');
    this.container.append(indicators);

    for(i = 0, n = this.slides.length; i < n; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicators__item' : 'indicators__item active');
      indicator.setAttribute('data-slide-to', i);
      indicators.append(indicator);   
    }

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = document.querySelectorAll('.indicators__item');
  },

  _tick() { 
    this.timerID = setInterval(() => this._nextSlide(), this.interval);
  },

   _goTotSlide: function(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _prevSlide: function() {
    this._goTotSlide(this.currentSlide - 1);
  },

  _nextSlide: function() {
    this._goTotSlide(this.currentSlide + 1);
  },

  _pause: function() {
    clearInterval(this.timerID);
    this.isPlaing = false;
    this.pauseBtn.innerHTML = 'Play'
  },

  _play: function() {
    this.isPlaing = true;
    this.pauseBtn.innerHTML = 'Pause';
    this._tick();
  },

  _indicate: function(event) {
    const target = event.target;
    if(target && target.classList.contains('indicators__item')) {
      this._goTotSlide(+target.getAttribute('data-slide-to'));
      this._pause();
    }
  },

   _pressKey: function(event) {
    if(event.code === this.CODE_LEFT_ARROW) this.prev();
    if(event.code === this.CODE_RIGHT_ARROW) this.next();
    if(event.code === this.CODE_SPACE) this.pausePlay();
  },

  _initListeners: function() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this)); 
  },
  
  pausePlay: function() {
    this.isPlaing ? this._pause() : this._play();
  },

  next: function() {
    this._nextSlide();
    this._pause()
  },

  prev: function() {
    this._prevSlide();
    this._pause();
  },

  init: function() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
}

Carousel.prototype.constructor = Carousel;

