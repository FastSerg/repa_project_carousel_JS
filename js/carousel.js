
class Carousel {
  constructor(obj) {
    const settings = this._initConfig(obj);
    this.container = document.querySelector(settings.container);
    this.slides = this.container.querySelectorAll(settings.slider);
    this.interval = settings.interval;
    this.isPlaing = settings.isPlaing;
  }

  _initConfig(paramsObj) {

    return {...{container: '.carousel', slider:'.slide__item', interval: 2000, isPlaing: true}, ...paramsObj};

  }

  _initProps() {
    this.currentSlide = 0;
    this.SLIDE_LENDS = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.PLAY = `<i class="fas fa-play"></i>`;
    this.PAUSE =`<i class="fas fa-pause"></i>`
    this.LEFT = `<i class="fas fa-chevron-left"></i>`;
    this.RIGHT = `<i class="fas fa-chevron-right"></i>`;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PREV = `<div type="button" class="controls__item controls__prev">${this.LEFT}</div>`;
    const NEXT = `<div type="button" class="controls__item controls__next">${this.RIGHT}</div>`;
    const PAUSE = `<div type="button" class="controls__item controls__pause">
                    <span id = "fa-play">${this.PLAY}</span>
                    <span id = "fa-pause">${this.PAUSE}</span>
                  </div>`;

    this.container.append(controls);
    controls.setAttribute('class', 'controls');
    controls.innerHTML = PREV + NEXT + PAUSE;

    this.pauseBtn = document.querySelector('.controls__pause');
    this.prevBtn = document.querySelector('.controls__prev');
    this.nextBtn = document.querySelector('.controls__next');
    this.pauseIcon = this.container.querySelector('#fa-pause');
    this.playIcon = this.container.querySelector('#fa-play');

    this.isPlaing ? this._pauseVisible() : this._playVisible()

  }

  _prevVisible(e){
    let target = e.target; 
    this.prevBtn.style.opacity = target ? 1 : 0;
  }

  _prevInvisible(e) {
    let target = e.target; 
    this.prevBtn.style.opacity = !target ? 1 : 0;
  }

  _nextVisible(e){
    let target = e.target; 
    this.nextBtn.style.opacity = target ? 1 : 0;
  }

  _nextInvisible(e) {
    let target = e.target; 
    this.nextBtn.style.opacity = !target ? 1 : 0;
  }

  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0;
    this.playIcon.style.opacity = !isVisible ? 1 : 0;

  }
  _playVisible() {
    this._pauseVisible(false);
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    indicators.setAttribute('class', 'indicators');
    this.container.append(indicators);

    for(let i = 0, n = this.SLIDE_LENDS; i < n; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicators__item' : 'indicators__item active');
      indicator.setAttribute('data-slide-to', i);
      indicators.append(indicator); 
    }

    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = document.querySelectorAll('.indicators__item');
  }

  _tick(flag = true) {
    if(!flag) return;
    this.timerID = setInterval(() => this._nextSlide(), this.interval);
  }

    _goTotSlide(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  }

  _prevSlide() {
    this._goTotSlide(this.currentSlide - 1);
  }

  _nextSlide() {
    this._goTotSlide(this.currentSlide + 1);
  }

  _pause() {
    clearInterval(this.timerID);
    this.isPlaing = false;
    this._playVisible();
  }

  _play() {
    this.isPlaing = true;
    this._pauseVisible();
    this._tick(); 
  }

  _indicate(event) {
    const target = event.target;
    if(target && target.classList.contains('indicators__item')) {
      this._goTotSlide(+target.getAttribute('data-slide-to'));
      this._pause();
    }
  }

    _pressKey(event) {
    if(event.code === this.CODE_LEFT_ARROW) this.prev();
    if(event.code === this.CODE_RIGHT_ARROW) this.next();
    if(event.code === this.CODE_SPACE) this.pausePlay();
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this)); 
    this.pauseBtn.addEventListener('mouseenter', this._pause.bind(this));
    this.pauseBtn.addEventListener('mouseleave', this._play.bind(this));
    this.prevBtn.addEventListener('mouseenter', this._prevVisible.bind(this));
    this.prevBtn.addEventListener('mouseleave', this._prevInvisible.bind(this));
    this.nextBtn.addEventListener('mouseenter', this._nextVisible.bind(this));
    this.nextBtn.addEventListener('mouseleave', this._nextInvisible.bind(this));

  }
  
  pausePlay() {
    this.isPlaing ? this._pause() : this._play();
  }

  next() {
    this._nextSlide();
    this._pause()
  }

  prev() {
    this._prevSlide();
    this._pause();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaing);
  }

}

export default Carousel;