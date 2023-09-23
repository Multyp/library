import Book from "./book.js";

class Library {
  constructor() {
    this.booksContainer = document.getElementById('booksContainer');
    this.addBookForm = document.getElementById('addBookForm');
    this.modal = document.getElementById('modal');
    this.openModalBtn = document.getElementById('openModalBtn');
    this.closeModalBtn = document.getElementById('closeModalBtn');

    this.attachEventListeners();
    this.loadBooks();
  }

  attachEventListeners() {
    this.openModalBtn.addEventListener('click', () => this.modal.classList.remove('hidden'));
    this.closeModalBtn.addEventListener('click', () => this.modal.classList.add('hidden'));

    this.addBookForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const id = this.addBookForm.dataset.bookId;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const description = document.getElementById('bookDescription').value;
    const pages = document.getElementById('bookPages').value;
    const isRead = document.getElementById('bookReadStatus').checked;

    if (this.addBookForm.dataset.editing === "true") {
      this.updateBook(id, title, author, description, pages, isRead);
    } else {
      const book = new Book(Date.now(), title, author, description, pages, isRead);
      this.displayBook(book);
      this.saveBook(book);
    }

    this.addBookForm.reset();
    this.modal.classList.add('hidden');
    this.addBookForm.dataset.editing = "false";
    delete this.addBookForm.dataset.bookId;
  }

  displayBook(book) {
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('bg-gray-800', 'p-6', 'rounded-lg', 'shadow-sm', 'transition-transform', 'transform', 'hover:scale-105');
    bookDiv.id = (book.id);
    bookDiv.innerHTML = `
          <div class="flex justify-center items-center border-b border-gray-700 pb-4">
              <h3 class="text-2xl font-semibold">${book.title}</h3>
          </div>
          <div class="py-4">
              <p class="text-gray-400 mb-2 italic text-center">By ${book.author}</p>
              <p class="text-gray-500 mb-4 px-4">${book.description}</p>
              <div class="flex justify-between items-center mt-4 px-4">
                  <div>
                      <p><span class="text-gray-400">Pages:</span> ${book.pages}</p>
                      <p><span class="text-gray-400">Read:</span> ${book.isRead ? 'Yes' : 'No'}</p>
                  </div>
              </div>
          </div>
          <div class="flex justify-end space-x-2 border-t border-gray-700 pt-4">
              <button class="edit bg-blue-700 text-gray-200 px-3 py-1 rounded hover:bg-blue-400 transition duration-300">Edit</button>
              <button class="delete bg-red-700 text-gray-200 px-3 py-1 rounded hover:bg-red-400 transition duration-300">Delete</button>
          </div>
    `;


    booksContainer.appendChild(bookDiv);

    const editBtn = bookDiv.querySelector('.edit');
    editBtn.addEventListener('click', () => {
      this.openModalForEdit(book, bookDiv);
    });

    const deleteBtn = bookDiv.querySelector('.delete');
    deleteBtn.addEventListener('click', () => {
      this.removeBookFromDisplay(bookDiv);
      this.removeBookFromStorage(book);
    });
  }

  openModalForEdit(book, bookDiv) {
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookReadStatus').checked = book.isRead;

    this.modal.classList.remove('hidden');
    this.addBookForm.dataset.editing = "true";
    this.addBookForm.dataset.bookId = book.id;
  }

  updateBook(id, title, author, description, pages, isRead) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.map(book => {
      if (book.id == id) {
        book.title = title;
        book.author = author;
        book.description = description;
        book.pages = pages;
        book.isRead = isRead;
      }
      return book;
    });
    localStorage.setItem('books', JSON.stringify(books));
    this.loadBooks();
  }

  saveBook(book) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  removeBookFromDisplay(bookDiv) {
    this.booksContainer.removeChild(bookDiv);
  }

  removeBookFromStorage(bookToRemove) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.id !== bookToRemove.id);
    localStorage.setItem('books', JSON.stringify(books));
  }

  loadBooks() {
    booksContainer.innerHTML = '';
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(book => this.displayBook(book));
  }
}

export default Library;
