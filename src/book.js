

exports.Book = class Book {
  constructor(id, title, authors, publisher) {
    this.id = id
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;

    this.displayBook = this.displayBook.bind(this)
  }

  displayBook() {
    console.log(`Title: ${this.title}, Authors: ${this.authors}, Publisher: ${this.publisher}`)
  }
}