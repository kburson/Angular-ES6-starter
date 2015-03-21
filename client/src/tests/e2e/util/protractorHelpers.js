/* jshint node: true */
"use strict";

var clientSideScripts = require('./clientsidescripts.js');

var helpers = exports;

/**
 * Checks for the given element in the page, then clears the input field and types the
 * given value. Next, it checks to see if the value sent is actually set to what was expected.
 * Finally, the ENTER key is sent to commit changes with Angular's event loop.
 *
 * NOTE: Webdriver has issues with certain types of input fields! Most notably are date inputs
 * and inputs being watched by a javascript library (like our datepicker calendar dropdown).
 * @see https://github.com/angular/protractor/issues/562
 *
 * @param {elementFinder} el  ex: element(By.linkText('foo'))
 * @param {string} value      The string to be typed within the input field
 * @returns {null} null
 */
helpers.findAndType = function (el, value) {
    assert.eventually.isTrue(el.isPresent());
    el.clear();
    el.sendKeys(value);
    assert.eventually.equal(el.getAttribute('value'), value);
    el.sendKeys(protractor.Key.ENTER);
};


helpers.waitUntilHidden = function (element, timeout) {
    timeout = timeout || 100;

    browser.driver.wait(function () {
        return element.isDisplayed().then(function(displayed) {
            return !displayed;
        });
    }, timeout);
};

helpers.waitForElement = function (locator, timeout, isPresent) {
    timeout = timeout || 100;
    var ptor = protractor.getInstance();
    ptor.driver.wait(function() {
        return element(locator).isPresent().then(function(present) {
            return present === isPresent;
        });
    }, timeout);

};

helpers.findAndClear = function (el) {
    assert.eventually.isTrue(el.isPresent());
    el.clear();
    assert.eventually.equal(el.getAttribute('value'), '');
    el.sendKeys(protractor.Key.ENTER);
};

/**
 * If the navEl exists, it will be clicked. Next, the browser's URL is checked to see
 * if the expectedUrlRegex was actually navigated to. All actions are wrapped in promise-friendly
 * asserts to sanely fail if any step in the process fails.
 *
 * @param {elementFinder}   navEl              for the given link/button
 * @param {string}          expectedUrlRegex  (OPTIONAL)  The URL that should be navigated to after the button click
 * @returns {null} null
 */
helpers.navigateToMenuItem = function (navEl, expectedUrlRegex) {
    expectedUrlRegex = expectedUrlRegex || null;

    assert.eventually.isTrue(navEl.isPresent(), 'navigateToMenuItem: nav element is not present:' + JSON.stringify(navEl) + "=" + navEl.isPresent());
    assert.isFulfilled(navEl.click());

    if (expectedUrlRegex) {
        assert.isFulfilled(browser.executeAsyncScript(clientSideScripts.waitForUrlMatch, expectedUrlRegex));
    }
};

helpers.waitForUrlMatch = function (expectedUrlRegex) {
    assert.isFulfilled(browser.executeAsyncScript(clientSideScripts.waitForUrlMatch, expectedUrlRegex));
};



helpers.selectOptionOnElement = function (selectList, optionText, startsWith) {
    var desiredOption;

    selectList.click();

    selectList.findElements(By.tagName('option'))
        .then(function findMatchingOption(options) {
            options.some(function (option) {
                option.getText().then(function doesOptionMatch(text) {
                    if (startsWith && text.indexOf(optionText) === 0) {
                        desiredOption = option;
                        return true;
                    }
                    else if (optionText === text) {
                        desiredOption = option;
                        return true;
                    }
                });
            });
        })
        .then(function clickOption() {
            if (desiredOption) {
                desiredOption.click();
            }
        });
};

helpers.selectOption = function (selector, optionText, startsWith) {
    var selectList;

    selectList = browser.findElement(selector);
    helpers.selectOptionOnElement(selectList, optionText, startsWith);
};

helpers.dragToOffsetOfElement = function (source, target, offset) {
    var targetLocation, sourceLocation;
    target.getLocation().then(function (targetLoc) {
        targetLocation = targetLoc;
    });
    source.getLocation().then(function (sourceLoc) {
        sourceLocation = sourceLoc;
    }).then(function () {
        helpers.dragToOffsetSlowly(source, {
            x: offset.x + (targetLocation.x - sourceLocation.x),
            y: offset.y + (targetLocation.y - sourceLocation.y)
        });
    });
};

helpers.scrollToTop = function () {
    browser.driver.actions().keyDown(protractor.Key.CONTROL).sendKeys(protractor.Key.HOME).perform();
};

helpers.scrollToBottom = function () {
    browser.driver.actions().keyDown(protractor.Key.CONTROL).sendKeys(protractor.Key.END).perform();
};


//By.addLocator('sizzleSelector', clientSideScripts.getBySizzleSelectorUsingJquery);

helpers.waitForAjax = function () {
    helpers.waitForElement(By.id('loading-bar-spinner'), 10000, false);
};
