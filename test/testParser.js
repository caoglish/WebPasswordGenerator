var assert = require('chai').assert;
var passwordVerifier = require("../src/js/Parser");


describe('Parser', function() {
	describe('parser', function() {
		it('parse string "abc342*-/3b!"', function() {
			assert.deepEqual([{
				block: "abc",
				"type": "letter"
			},
			{
				block: "342",
				"type": "number"
			},
						{
				block: "*-/",
				"type": "symbol"
			},
			{
				block: "3",
				"type": "number"
			},
			{
				block: "b",
				"type": "letter"
			},
			{
				block: "!",
				"type": "symbol"
			},

			], passwordVerifier.parse("abc342*-/3b!"));
		});


	});


});