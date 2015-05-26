var copy = require('broccoli-static-compiler');
var merge = require('broccoli-merge-trees');
var babel = require('broccoli-babel-transpiler');
var browserify = require('broccoli-browserify');
var stylus = require('broccoli-stylus');


var scripts, styles, vendor, public;

var app = 'app';


////////////////
// SCRIPTS
////////////////

scripts = babel(app, {
	optional: [
		'es7.classProperties',
		'es7.decorators'
	]
});

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
