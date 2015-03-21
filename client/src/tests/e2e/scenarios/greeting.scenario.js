'use strict';

// Load the app
// ask for greeting
// expect random greeting in message pane.


describe('get random greeting', function() {

  browser.get('');

  it('application should default to home page', function() {
    expect(browser.getLocationAbsUrl()).toMatch('/home');
  });

});
