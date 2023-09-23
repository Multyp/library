import ThemeSwitcher from './theme.js';
import Library from './library.js';
import Tutorial from './tutorial.js';

document.addEventListener('DOMContentLoaded', () => {
  new ThemeSwitcher();
  new Library();
  new Tutorial();
});
