const FetchBooks = require("../src/fetchBooks").FetchBooks
const CommandLine = require("../src/commandLine").CommandLine;

module.exports = function () {
  describe("Test functionality of FetchBooks class", function() {
  let fetchedBooks;

    before("Initialize instance of FetchBooks class and set properties", function() {
      fetchedBooks = new FetchBooks();
      expect(fetchedBooks).to.be.an.instanceOf(FetchBooks);
      expect(fetchedBooks.url).to.equal("https://www.googleapis.com/books/v1/volumes?q=");
      expect(fetchedBooks.maxResult).to.equal("&maxResults=5")
      expect(fetchedBooks.type).to.equal("&printType=books")
    });

    it("fetch books from Google Books API", async () => {
      
        const cli = new CommandLine();

        const stub1 = sinon
          .stub(cli.userInput, "initSearchPrompt")
          .callsFake(() => true);

        const spy = sinon.spy(fetchedBooks, "fetchBooks");
        const stub2 = sinon.stub(console, "log");

        await fetchedBooks.fetchBooks("", {query: "Think and Grow Rich"})

        expect(spy).to.have.been.calledWith("", {query: "Think and Grow Rich"});
        spy.restore();
        stub1.restore();
        stub2.restore();
    })
  });
};