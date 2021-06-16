const fetch = require('node-fetch');

exports.FetchBooks = class FetchBooks {
  constructor(resultSize = 5) {
    this.url = "https://www.googleapis.com/books/v1/volumes?q=";
    this.maxResult = `&maxResults=${resultSize}`;
    this.type = "&printType=books";
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  async fetchBooks (err, result) {
    const encodedQuery = encodeURI(result.query)

    try {
      const result = await fetch(this.url + encodedQuery + this.maxResult + this )
      const books = await result.json();
    } catch(err) {
      console.log("There seems to be an issue, please check your input and try again")
    }
    
  }
}