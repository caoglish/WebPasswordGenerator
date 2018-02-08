var assert = require('assert');
var passwordVerifier = require("../src/js/PasswordVerifier");


// describe('PasswordVerifier', function() {
// 	describe('hasNumber', function() {
// 		it('has a number', function() {
// 			assert.ok(passwordVerifier.hasNumber("abc342"));
// 		});

// 		it('not has any number', function() {
// 			assert.ok(!passwordVerifier.hasNumber("abcabc"));
// 		});
// 	});

// 	describe('hasLetter', function() {
// 		it('has a letter', function() {
// 			assert.ok(passwordVerifier.hasLetter("abc342"));
// 		});

// 		it('not has any letter', function() {
// 			assert.ok(!passwordVerifier.hasLetter("12.-="));
// 		});
// 	});

// 	describe('hasSpecialChar', function() {
// 		it('has a special character', function() {
// 			assert.ok(passwordVerifier.hasSpecialChar("abc3#42"));
// 		});

// 		it('not has any special character', function() {
// 			assert.ok(!passwordVerifier.hasSpecialChar("12af3"));
// 		});
// 	});


// 	describe('hasUpperCase', function() {
// 		it('has a upper case', function() {
// 			assert.ok(passwordVerifier.hasUpperCase("aBc342"));
// 		});

// 		it('not has any upper case', function() {
// 			assert.ok(!passwordVerifier.hasUpperCase("adfs3243$^%"));
// 		});
// 	});
// });