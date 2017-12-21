var assert = require('assert');
var helper = require("../src/js/helper");


describe('helper Test', function() {
	describe('isNumeric', function() {
		it('The string is numeric', function() {
			assert.ok(helper.isNumeric("3334"));
		});

		it('The string is not numeric', function() {
			assert.ok(!helper.isNumeric("33a2"));
		});
	});

	describe('isLetter', function() {
		it('The string is letter', function() {
			assert.ok(helper.isLetter("adfs"));
		});

		it('The string is not letter', function() {
			assert.ok(!helper.isLetter("3 s 57"));
		});
	});

	describe('isSpecialChar', function() {
		it('The string is special character', function() {
			assert.ok(helper.isSpecialChar("#$@#$"));
		});

		it('The string is not special character', function() {
			assert.ok(!helper.isSpecialChar("3 s 57"));
		});
	});

	describe('isUpperCase', function() {
		it('The string is  upper case', function() {
			assert.ok(helper.isUpperCase("ASDF"));
		});

		it('The string is not upper case', function() {
			assert.ok(!helper.isUpperCase("Addfs"));
		});
	});
});