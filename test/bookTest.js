const Book = require("../src/book").Book

module.exports = function() {
  describe("Test functionality of Book class", function() {
  let book;

    before("Initialize instance of Book and set properties", function() {
      book = new Book(0, "Think and Grow Rich", "Napoleon Hill", "Sristhi Publishers & Distributors");
      expect(book).to.be.an.instanceOf(Book);
      expect(book.id).to.equal(0);
      expect(book.title).to.equal("Think and Grow Rich");
      expect(book.authors).to.equal("Napoleon Hill");
      expect(book.publisher).to.equal("Sristhi Publishers & Distributors");
    })

    it("correctly display's book information", function(){
      const spy = sinon.spy(console, "log");

      const book = new Book(0, "Think and Grow Rich", "Napoleon Hill", "Sristhi Publishers & Distributors");
      expect(book).to.be.an.instanceOf(Book);
      expect(book.id).to.equal(0);
      expect(book.title).to.equal("Think and Grow Rich");
      expect(book.authors).to.equal("Napoleon Hill");
      expect(book.publisher).to.equal("Sristhi Publishers & Distributors");

      book.displayBook();

      assert(spy.calledWith("Title: Think and Grow Rich, Authors: Napoleon Hill, Publisher: Sristhi Publishers & Distributors"));
      spy.restore();
    }); 
  });
};
