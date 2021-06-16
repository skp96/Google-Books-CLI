const Userinput = require('./userInput').UserInput;

exports.CommandLine = class CommandLine {
  constructor() {
    this.userInput = new Userinput();
  }

  startCli() {
    console.log("Get ready to find your favorite books! /nPlease enter the name of the book you'd like to search for.")
    this.userInput.initSearchPrompt();

  }
}


