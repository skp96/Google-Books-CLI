const bookTest = require("./bookTest");
const fetchBooks = require("./fetchBooksTest");
const listTest = require("./listTest");
const cliTest = require("./cliTest");
const CommandLine = require("../src/commandLine").CommandLine;

describe("Google Books CLI Tests", function(){
  before("Init global cli", function() {
    global.cli = new CommandLine();
    expect(global.cli).to.be.an.instanceOf(CommandLine);
    const stub = sinon.stub(global.cli.userInput, "processPostSearchPrompt").callsFake(() => true);
  });
  describe("CLI Class Tests", cliTest.bind(this));
  describe("Book Class Tests", bookTest.bind(this));
  describe("FetchBooks Class Tests", fetchBooks.bind(this));
  describe("List Class Tests", listTest.bind(this));
})