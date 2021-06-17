const Book = require('./book').Book

exports.List = class List {
  constructor(bookData = null) {
    this.books = []
    
    
    if (bookData && Array.isArray(bookData.items)) {
      const {items} = bookData;
      for (let i = 0; i < items.length; i++) {
        const book = items[i];
        const {volumeInfo: {title, authors, publisher}} = book;
        this.books.push(
          new Book(i, title, authors, publisher)
        );
      }
    }
  }

  getBookTitles() {
    const bookTitles = []
    for (let {id, title} of this.books) {
      bookTitles.push({id, title})
    }
    return bookTitles;
  }

  listIncludesBook(id) {
    const searchResult = global.searchResult.books[id]
    for (let i = 0; i < this.books.length; i++) {
      const book = this.books[i];

      if (searchResult.title === book.title && searchResult.authors[0] === book.authors[0] && searchResult.publisher === book.publisher) {
        return true;
      }
    }
    return false
  }

  addBookToList(id) {
    if (this.listIncludesBook(id)) {
      console.log("This book is already in your Reading List, please select another book!")
      global.cli.displayBookTitles()
    } else {
      this.books.push(global.searchResult.books[id])
      console.log("You have successfully added a book to your Reading List!")
      global.cli.displayGeneralOptions()
    }
  }
}