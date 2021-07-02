global.sinon = require('sinon');
global.expect = require('chai').expect;
global.assert = require('assert');
global.chai = require('chai');
global.sinonChai = require('sinon-chai');
global.chai.use(global.sinonChai);

global.testAPIResult = {
  items: [
      {
        volumeInfo: {
          title: "Think and Grow Rich",
          authors: ["Napoleon Hill"],
          publisher: "Sristhi Publishers & Distributors"
      }
    }
  ]
}