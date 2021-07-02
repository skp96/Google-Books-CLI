const List = require("../src/list").List
const Book = require("../src/book").Book;
const CommandLine = require("../src/commandLine");

module.exports = function () {
  describe("Test functionality of List Class", function() {
    
    before("Initialize instance of List", function() {
      const list = new List();
      expect(list).to.be.an.instanceOf(List);
      expect(list.books).to.be.empty;
    });

    beforeEach("Inititalize default global reading and search list", function() {
      global.readingList = undefined;
      global.searchResult = undefined;
    })

    let listWithBook;
    it("Initialize instance of List with book", function() {
      listWithBook = new List(global.testAPIResult);
      expect(listWithBook).to.be.instanceOf(List);
      expect(listWithBook.books[0]).to.be.instanceOf(Book);
    });

    it("Get Book Titles", function() {
      expect(listWithBook.getBookTitles()).to.deep.equal([{id: 0, title: "Think and Grow Rich"}])
      
    });

    it("List Includes Book", function() {
      global.readingList = listWithBook;
      global.searchResult = listWithBook;
      

      expect(global.readingList.listIncludesBook(0)).to.equal(true);
    })

    it("Add book to List", function() {
      global.readingList = new List();
      global.searchResult = listWithBook;

      const spy = sinon.spy(console, "log");

      const stub = sinon.stub(global.cli, "displayBookTitles").callsFake(() => true);

      const stub2 = sinon.stub(global.cli, "displayGeneralOptions").callsFake(() => true);

      global.readingList.addBookToList(0);

      assert(spy.calledWith("You have successfully added a book to your Reading List!"));

      spy.restore();
      stub.restore();
      stub2.restore();
    })

    it("Fails to add book to list", function(){
      global.readingList = listWithBook;
      global.searchResult = listWithBook;

      const spy = sinon.spy(console, "log");

      const stub = sinon.stub(global.cli, "displayBookTitles").callsFake(() => true);

      const stub2 = sinon.stub(global.cli, "displayGeneralOptions").callsFake(() => true);

      global.readingList.addBookToList(0);

      assert(spy.calledWith("This book is already in your Reading List, please select another book!"));

      spy.restore();
      stub.restore();
      stub2.restore();
    })
  
  });
};