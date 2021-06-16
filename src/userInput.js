const prompt = require("prompt")
const FetchBooks = require("./fetchBooks").FetchBooks;

exports.UserInput = class UserInput {
  constructor() {
    this.prompt = prompt.start();
    this.getBooks = new FetchBooks();
  }

  initSearchPrompt()  {
    prompt.get(["query"], this.getBooks.fetchBooks)
  }
}