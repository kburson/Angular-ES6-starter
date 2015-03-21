'use strict';

// Load the app
// ask for greeting
// expect random greeting in message pane.


describe('get random greeting', function() {

  beforeEach(function() {
    browser.get('index.html');
  });

  it('application should default to home page', function() {
    expect(browser.getLocationAbsUrl()).to.eventually.match(/\/home/);
  });

});
