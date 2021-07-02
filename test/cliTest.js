const CommandLine = require("../src/commandLine").CommandLine
const List = require("../src/list").List;
const Book = require("../src/book").Book; 

module.exports = function () {
  describe("Test functionality of CommandLine class", function() {
    let cli;
    it("Initalize instance of Cli", function() {
      cli = new CommandLine();
      expect(cli).to.be.an.instanceOf(CommandLine);
      const stub = sinon.stub(console, "log");
      stub.restore();
    })

    it("Start Cli", function() {
      const stub = sinon.stub(cli.userInput, "initSearchPrompt").
      callsFake(() => true);
      cli.startCli();

      assert(stub.called);
      stub.restore();
    })

    it("Restart Cli", function() {
      const stub = sinon.stub(cli.userInput, "initSearchPrompt").
      callsFake(() => true);
      cli.restartCli();

      assert(stub.called);
      stub.restore();
    })

    it("Display Search Results", function() {
      const listOfBook = new List(global.testAPIResult);
      const spy = sinon.spy(console, "log");
      const stub = sinon.stub(cli.userInput, "initPostSearchPrompt").callsFake(() => true);

      cli.displaySearchResults(listOfBook);

      assert(spy.calledWith("Title: Think and Grow Rich, Authors: Napoleon Hill, Publisher: Sristhi Publishers & Distributors"));
      assert(stub.called);

      spy.restore();
      stub.restore();
    })

    it ("Display Book Title", function() {
      global.seaarchResult = new List(global.testAPIResult);
      const spy = sinon.spy(console, "log");
      const stub = sinon.stub(cli.userInput, "initAddToListPrompt").callsFake(() => true);

      cli.displayBookTitles(global.seaarchResult.getBookTitles());

      assert(spy.calledWith("Id: 0, Title: Think and Grow Rich"));
      assert(stub.called);

      spy.restore();
      stub.restore();
    })

    it("Display General Options", function() {
      const stub1 = sinon.stub(console, "log").callsFake(() => true);
      const stub2 = sinon.stub(cli.userInput, "initGeneralOptions").callsFake(() => true);

      cli.displayGeneralOptions();

      assert(stub1.called);
      assert(stub2.called);


      stub1.restore();
      stub2.restore();
    })

    it("Display List", function() {
      global.readingList = new List(global.testAPIResult);
      const stub1 = sinon.stub(cli, "displayGeneralOptions").callsFake(() => true)
      const stub2 = sinon.stub(console, "log").callsFake(() => true);

      cli.displayList();

      stub1.restore();
      stub2.restore();
    })
  })
}