import Library from "./library.js";

document.addEventListener("DOMContentLoaded", () => {
  // Find the theme toggle button
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const body = document.body;
  
  // Add event listener to the theme toggle button
  toggleThemeBtn.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  });

  new Library();
});
