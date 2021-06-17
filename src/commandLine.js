const Userinput = require('./userInput').UserInput;

exports.CommandLine = class CommandLine {
  constructor() {
    this.userInput = new Userinput();
  }

  // Init CLI
  startCli() {
    console.log("Get ready to find your favorite books!");
    this.userInput.initSearchPrompt();
  }

  restartCli() {
    console.log("Sorry for the technical difficulties! Lets find your favorite books!")
    this.userInput.initSearchPrompt();
  }

  // Display search results
  displaySearchResults(searchResults) {
    console.log("Your search results are:");
    for(let book of searchResults.books) {
      book.displayBook();
    }
    this.userInput.initPostSearchPrompt();
  } 

  displayBookTitles(bookTitles = null) {
    if (!bookTitles) bookTitles = global.searchResult.getBookTitles();
    for (let i = 0; i < bookTitles.length; i++) {
      const {id, title} = bookTitles[i];
      console.log(`Id: ${id}, Title: ${title}`);
    }
    this.userInput.initAddToListPrompt();
  }

  displayGeneralOptions() {
    console.log("What would you like to do next?");
    console.log("Options: 'Search', 'View List', 'Exit'");
    this.userInput.initGeneralOptions();
  }

  displayList() {
    const list = global.readingList.books

    for (let book of list) {
      const {title, authors, publisher} = book
      console.log(`Title: ${title}, Authors: ${authors}, Publisher: ${publisher}`)
    }
    this.displayGeneralOptions();
  }

  exit() {
    console.log("Thank you for using the Google Books CLI application. See you again soon!");
  }
}


