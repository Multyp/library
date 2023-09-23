import ThemeSwitcher from './theme.js';
import Library from './library.js';

document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  new Library();

  const openInstructionsBtn = document.getElementById('openInstructionsBtn');
    const closeInstructionsBtn = document.getElementById('closeInstructionsBtn');
    const instructionsModal = document.getElementById('instructionsModal');
    
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');
    const carousel = document.querySelector('.carousel');
    let currentSlide = 0;

    openInstructionsBtn.addEventListener('click', () => {
      instructionsModal.classList.remove('hidden');
      showSlide(currentSlide);
    });

    closeInstructionsBtn.addEventListener('click', () => {
      instructionsModal.classList.add('hidden');
    });

    function showSlide(slideIndex) {
      const slides = document.querySelectorAll('.carousel-item');
      slides.forEach((slide, index) => {
        if (index === slideIndex) {
          slide.style.display = 'flex';
        } else {
          slide.style.display = 'none';
        }
      });
    }
  
    function updateHowTo() {
      const body = document.body;
      const image1 = document.getElementById("HowTo-1");
      const image2 = document.getElementById("HowTo-2");
    
      if (body.classList.contains("light-theme")) {
        image1.src = "assets/light-add-a-book.png";
        image2.src = "assets/light-add-form.png";
      } else {
        image1.src = "assets/dark-add-a-book.png";
        image2.src = "assets/dark-add-form.png";
      }
    }

    const observer = new MutationObserver(updateHowTo);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    updateHowTo();

    prevSlideBtn.addEventListener('click', () => {
      currentSlide = Math.max(currentSlide - 1, 0);
      showSlide(currentSlide);
    });

    nextSlideBtn.addEventListener('click', () => {
      currentSlide = Math.min(currentSlide + 1, carousel.childElementCount - 1);
      showSlide(currentSlide);
    });
});
