class Tutorial {
  constructor() {
    this.openInstructionsBtn = document.getElementById('openInstructionsBtn');
    this.closeInstructionsBtn = document.getElementById('closeInstructionsBtn');
    this.instructionsModal = document.getElementById('instructionsModal');
    this.prevSlideBtn = document.getElementById('prevSlideBtn');
    this.nextSlideBtn = document.getElementById('nextSlideBtn');
    this.carousel = document.querySelector('.carousel');
    this.currentSlide = 0;

    this.openInstructionsBtn.addEventListener('click', () => {
      this.instructionsModal.classList.remove('hidden');
      this.showSlide(this.currentSlide);
    });

    this.closeInstructionsBtn.addEventListener('click', () => {
      this.instructionsModal.classList.add('hidden');
    });

    this.prevSlideBtn.addEventListener('click', () => {
      if (this.currentSlide > 0) {
        this.currentSlide = Math.max(this.currentSlide - 1, 0);
        this.showSlide(this.currentSlide);
      }
    });

    this.nextSlideBtn.addEventListener('click', () => {
      if (this.currentSlide < this.carousel.childElementCount - 1) {
        this.currentSlide = Math.min(this.currentSlide + 1, this.carousel.childElementCount - 1);
        this.showSlide(this.currentSlide);
      }
    });

    this.updateHowTo();
    this.observeThemeChanges();
    this.updateButtonVisibility();
  }

  updateButtonVisibility() {
    this.prevSlideBtn.style.visibility = this.currentSlide === 0 ? 'hidden' : 'visible';
    this.nextSlideBtn.style.visibility = this.currentSlide === this.carousel.childElementCount - 1 ? 'hidden' : 'visible';
  }

  showSlide(slideIndex) {
    const slides = document.querySelectorAll('.carousel-item');
    slides.forEach((slide, index) => {
      if (index === slideIndex) {
        slide.style.display = 'flex';
      } else {
        slide.style.display = 'none';
      }
    });
    this.updateButtonVisibility();
  }

  updateHowTo() {
    const body = document.body;
    const image1 = document.getElementById("HowTo-1");
    const image2 = document.getElementById("HowTo-2");
    const image3 = document.getElementById("HowTo-3");

    if (body.classList.contains("light-theme")) {
      image1.src = "assets/light-add-a-book.png";
      image2.src = "assets/light-add-form.png";
      image3.src = "assets/light-book.png";
    } else {
      image1.src = "assets/dark-add-a-book.png";
      image2.src = "assets/dark-add-form.png";
      image3.src = "assets/dark-book.png";
    }
  }

  observeThemeChanges() {
    const observer = new MutationObserver(this.updateHowTo);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }
}

export default Tutorial;
