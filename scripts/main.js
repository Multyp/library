const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

document.addEventListener("DOMContentLoaded", () => {

  class Book {
      constructor(title, author, description, pages, isRead) {
          this.title = title;
          this.author = author;
          this.description = description;
          this.pages = pages;
          this.isRead = isRead;
      }
  }

  // References to UI elements
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const booksContainer = document.getElementById('booksContainer');
  const addBookForm = document.getElementById('addBookForm');

  openModalBtn.addEventListener('click', () => modal.classList.remove('hidden'));
  closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

  addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const title = document.getElementById('bookTitle').value;
      const author = document.getElementById('bookAuthor').value;
      const description = document.getElementById('bookDescription').value;
      const pages = document.getElementById('bookPages').value;
      const isRead = document.getElementById('bookReadStatus').checked;

      // Create new Book
      const book = new Book(title, author, description, pages, isRead);

      // Display book
      displayBook(book);

      // Save to localStorage
      saveBook(book);

      // Clear form & close modal
      addBookForm.reset();
      modal.classList.add('hidden');
  });

  function displayBook(book) {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('bg-gray-800', 'p-6', 'rounded-lg', 'shadow-sm', 'transition-transform', 'transform', 'hover:scale-105');
      bookDiv.innerHTML = `
          <h3 class="text-2xl mb-1 font-semibold">${book.title}</h3>
          <p class="text-gray-400 mb-2 italic">By ${book.author}</p>
          <p class="text-gray-500 mb-4">${book.description}</p>
          <div class="flex justify-between items-center mt-4">
              <div>
                  <p><span class="text-gray-400">Pages:</span> ${book.pages}</p>
                  <p><span class="text-gray-400">Read:</span> ${book.isRead ? 'Yes' : 'No'}</p>
              </div>
              <button class="bg-red-700 text-gray-200 px-3 py-1 rounded hover:bg-red-600 transition duration-300">Delete</button>
          </div>
      `;

      booksContainer.appendChild(bookDiv);

      // Attach delete event
      const deleteBtn = bookDiv.querySelector('button');
      deleteBtn.addEventListener('click', () => {
          removeBookFromDisplay(bookDiv);
          removeBookFromStorage(book);
      });
  }

  function saveBook(book) {
      let books = JSON.parse(localStorage.getItem('books')) || [];
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
  }

  function removeBookFromDisplay(bookDiv) {
      booksContainer.removeChild(bookDiv);
  }

  function removeBookFromStorage(bookToRemove) {
      let books = JSON.parse(localStorage.getItem('books')) || [];
      books = books.filter(book => {
          return book.title !== bookToRemove.title ||
              book.author !== bookToRemove.author ||
              book.description !== bookToRemove.description ||
              book.pages !== bookToRemove.pages;
      });
      localStorage.setItem('books', JSON.stringify(books));
  }

  // Load books from localStorage on page load
  function loadBooks() {
      let books = JSON.parse(localStorage.getItem('books')) || [];
      books.forEach(book => displayBook(book));
  }

  loadBooks();
});
