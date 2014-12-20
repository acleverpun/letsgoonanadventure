var concat = require('broccoli-concat'),
	pickFiles = require('broccoli-static-compiler'),
	mergeTrees = require('broccoli-merge-trees'),
	browserify = require('broccoli-browserify');


var scripts, vendor, public;


////////////////
// SCRIPTS
////////////////

scripts = browserify('app/', {
	entries: ['./main.js'],
	outputFile: 'main.js',
	transform: [
		['6to5ify'],
	],
});


////////////////
// VENDOR
////////////////

vendor = pickFiles('vendor', {
	srcDir: '.',
	destDir: 'vendor'
});


////////////////
// PUBLIC
////////////////

public = pickFiles('public', {
	srcDir: '.',
	destDir: '.'
});


module.exports = mergeTrees([scripts, vendor, public]);
