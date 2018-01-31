var assert = require('chai').assert;
var passwordVerifier = require("../src/js/Parser");


describe('Parser', function() {
	describe('parser', function() {
		it('has a number', function() {
			assert.deepEqual([{
				block: "abc"
			},
			{
				block: "342"
			},
						{
				block: "*-/"
			},
			{
				block: "3"
			},
			{
				block: "b"
			},
			{
				block: "!"
			},

			], passwordVerifier.parse("abc342*-/3b!"));
		});


	});


});