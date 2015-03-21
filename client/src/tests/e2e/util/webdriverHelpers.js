/* jshint node: true */
"use strict";

var helpers = exports;
var fs = require('fs');
var execSync = require('exec-sync');

var directoryName;
var isSetup = false;

helpers.setupScreenshot = function (myDir) {
    execSync("rm -rf screenshots");
    isSetup = true;
    directoryName = myDir || 'screenshots';
    fs.mkdirSync(directoryName);
};

function cleanifyName(name) {
    return name.replace(/\//g, '_');
}

helpers.screenshot = function (filename) {
    if (!isSetup) {
        helpers.setupScreenshot();
    }
    return  browser.driver.takeScreenshot().then(function (data) {
        fs.writeFileSync(directoryName + '/' + (cleanifyName(filename) || 'phantom_screenshot.png'), data, 'base64');
    });

};
