var assert = require('chai').assert;
var passwordVerifier = require("../src/js/Parser");


describe('Parser', function() {
	describe('parser', function() {
		it('parse string "abc342*-/3b!abc"', function() {
			assert.deepEqual([{
				token: "abc",
				"type": "letter",
				"position":0,
				"start_offset":0,
				"end_offset":3
			},
			{
				token: "342",
				"type": "number",
				"position":1,
				"start_offset":3,
				"end_offset":6
			},
						{
				token: "*-/",
				"type": "symbol",
				"position":2,
				"start_offset":6,
				"end_offset":9
			},
			{
				token: "3",
				"type": "number",
				"position":3,
				"start_offset":9,
				"end_offset":10
			},
			{
				token: "b",
				"type": "letter",
				"position":4	,
				"start_offset":10,
				"end_offset":11
			},
			{
				token: "!",
				"type": "symbol",
				"position":5,
				"start_offset":11,
				"end_offset":12
			},
			{
				token: "abc",
				"type": "letter",
				"position":6,
				"start_offset":12,
				"end_offset":15
			},

			], passwordVerifier.parse("abc342*-/3b!abc"));
		});


	});


});