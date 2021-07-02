const prompt = require("prompt")
const FetchBooks = require('./fetchBooks').FetchBooks;
const List = require('./list').List;
const config = require("config");

exports.UserInput = class UserInput {
  constructor() {
    this.prompt = prompt.start();
    this.getBooks = new FetchBooks();

    this.processPostSearchPrompt = this.processPostSearchPrompt.bind(this);
    this.processAddToList = this.processAddToList.bind(this);
    this.processGeneralOptions = this.processGeneralOptions.bind(this);
  }

  // Initialize search
  initSearchPrompt()  {
    console.log("Please enter your query!")
    prompt.get(["query"], this.getBooks.fetchBooks)
  }

  // Initialize post search prompt
  initPostSearchPrompt() {
    console.log("Would you like to add any of these books to your Reading List, or continue to search?")
    console.log("Enter 'Add to List' to add a book to your Reading List, or 'Search' to continue searching for your favorite book, or 'Exit to exit the application")
    prompt.get(["input"], this.processPostSearchPrompt)
  }

  // Initialize prompt to add book to Reading List
  initAddToListPrompt() {
    prompt.get(["input"], this.processAddToList)
  }

  // Initialize prompt to Search, View List, or Exit CLI application
  initGeneralOptions() {
    prompt.get(["input"], this.processGeneralOptions)
  }

  processPostSearchPrompt(err, {input}) {
    if (input === config.get("processPostSearchAdd")) {
        // Get Book titles, init a global readling list, and instruct CLI to display book titles

        console.log("Please enter the Id of the book you would like to add to your Reading List")
        const bookTitles = global.searchResult.getBookTitles();
        global.readingList = global.readingList ? global.readingList :  new List();
        global.cli.displayBookTitles(bookTitles);

    } else if (input === config.get("processPostSearchFind")) {
        // Initalize search prompt

        this.initSearchPrompt()
    } else if (input === config.get("processPostSearchExit")) {
      global.cli.exit();
    }else {
        // Invalid selection - initalize post search prompt again
        console.log("Please enter a valid selection - Add to List, Search, or Exit")
        this.initPostSearchPrompt();
    }
  }

  processAddToList(err, {input}) {
    const bookTitles = global.searchResult.getBookTitles();
    if (bookTitles[input]) {
      global.readingList.addBookToList(input)
    } else {
      console.log("It seems you inputted the incorrect Id, please try again!")
      this.initAddToListPrompt()
    }
  }

  processGeneralOptions(err, {input}) {
    if (input === config.get("processPostSearchFind")) {
      this.initSearchPrompt();
    } else if (input === config.get("processPostSearchView")) {
      global.cli.displayList();
    } else if (input === config.get("processPostSearchExit")) {
      global.cli.exit()
    } else {
      console.log("Invalid input, please try again!")
      this.initGeneralOptions();
    }
  }

}