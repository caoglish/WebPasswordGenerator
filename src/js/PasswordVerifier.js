var _ = require('lodash');
var helper = require("./helper");

var hasType= function(str,func){
	var charlist = str.split("");
	return _.some(charlist, function(v) {
				return func.call(this,v);
			});
}

module.exports = {
		hasNumber: function(str) {
			return hasType(str,helper.isNumeric);
		},
		hasLetter: function(str) {
			return hasType(str,helper.isLetter);
		},
		hasSpecialChar:function(str){
			return hasType(str,helper.isSpecialChar);
		},
		hasUpperCase:function(str){
			return hasType(str,helper.isUpperCase);
		}
	}