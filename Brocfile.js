var copy = require('broccoli-static-compiler');
var merge = require('broccoli-merge-trees');
var concat = require('broccoli-concat');
var babel = require('broccoli-babel-transpiler');
var browserify = require('broccoli-browserify');
var stylus = require('broccoli-stylus');


var scripts, styles, vendor, public;

var app = 'app';


////////////////
// SCRIPTS
////////////////

scripts = babel(app, {});

scripts = browserify(scripts, {
	entries: ['./main.js'],
	outputFile: 'main.js'
});


////////////////
// STYLES
////////////////

styles = stylus('app/styles');


////////////////
// VENDOR
////////////////

vendor = copy('vendor', {
	srcDir: '.',
	destDir: 'vendor'
});


////////////////
// PUBLIC
////////////////

public = copy('public', {
	srcDir: '.',
	destDir: '.'
});


module.exports = merge([ scripts, styles, vendor, public ]);
