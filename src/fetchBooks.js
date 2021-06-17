const fetch = require('node-fetch');
const List = require('./list').List

exports.FetchBooks = class FetchBooks {
  constructor(resultSize = 5) {
    this.url = "https://www.googleapis.com/books/v1/volumes?q=";
    this.maxResult = `&maxResults=${resultSize}`;
    this.type = "&printType=books";
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  // Async function to fetch books and pass results to CLI to display
  async fetchBooks (err, {query}) {
    const encodedQuery = encodeURI(query)

    try {
      console.log(`Fetching results for ${query} from Google`)
      const result = await fetch(this.url + encodedQuery + this.maxResult + this.type )
      const books = await result.json();
      global.searchResult = new List(books);
      global.cli.displaySearchResults(global.searchResult);
      
    } catch(err) {
      console.log("Oh no, something went wrong! Restarting Google Books CLI application")
      global.cli = new Cli();
      global.cli.restartCLI();
    }
    
  }
}