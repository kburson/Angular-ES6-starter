/* global $, exports, window */

(function () {
    "use strict";

    var clientSideScripts = exports;

    /**
     * getBySizzleSelectorUsingJquery - search the DOM with a sizzle selector (see http://api.jquery.com/category/selectors/)
     *
     * Examples:
     * getBySizzleSelectorUsingJquery('.foo') - returns an array of all elements with the class 'foo'.
     * getBySizzleSelectorUsingJquery([el, '.foo']) - returns an array of all elements with the class 'foo' contained in the element el.
     *
     * @param  {elementFinder} selector   jquery element selector
     * @param  {element} parent   where to start the search for the desired elements
     * @returns {element[]} array of located elements
     */
    //clientSideScripts.getBySizzleSelectorUsingJquery = function (selector, parent) {
    //    var root = parent ? $(parent) : $('body');
    //    var result = root.find(selector);
    //    return result;
    //};

    clientSideScripts.waitForUrlMatch = function () {
        var interval;
        var expectedUrlRegex = arguments[0];
        var callback = arguments[arguments.length - 1];
        var checkUrl = function () {
            if (window.location.href.match(expectedUrlRegex)) {
                clearInterval(interval);
                callback();
            }
        };
        interval = setInterval(checkUrl, 100);
    };

    clientSideScripts.waitForIdToBePresent = function (id1) {
        var interval;
        var callback = arguments[arguments.length - 1];
        var checkId = function () {
            if (document.getElementById(id1)) {
                clearInterval(interval);
                callback();
            }
        };
        interval = setInterval(checkId, 100);
    };


})();
