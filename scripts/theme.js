class ThemeSwitcher {
  constructor() {
    this.body = document.body;
    this.themeIcon = document.getElementById('themeIcon');
    this.toggleThemeBtn = document.getElementById('toggleThemeBtn');
    this.savedTheme = localStorage.getItem('theme');

    this.init();
  }

  init() {
    if (this.savedTheme) {
      this.body.classList.add(this.savedTheme);
    }

    if (this.themeIcon) {
      this.updateThemeIcon(this.savedTheme);
    }

    this.toggleThemeBtn.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    if (this.body.classList.contains('light-theme')) {
      this.setTheme('dark-theme');
    } else {
      this.setTheme('light-theme');
    }
  }

  setTheme(theme) {
    this.body.classList.remove('light-theme', 'dark-theme');
    this.body.classList.add(theme);
    localStorage.setItem('theme', theme);

    if (this.themeIcon) {
      this.updateThemeIcon(theme);
    }
  }

  updateThemeIcon(theme) {
    if (theme === 'light-theme') {
      this.themeIcon.classList.remove('fa-moon');
      this.themeIcon.classList.add('fa-sun');
    } else {
      this.themeIcon.classList.remove('fa-sun');
      this.themeIcon.classList.add('fa-moon');
    }
  }
}

export default ThemeSwitcher;
