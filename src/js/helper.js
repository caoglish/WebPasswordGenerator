var _ = require('lodash');

module.exports = {
	isNumeric: function(x) {
		return ((typeof x === 'number' || typeof x === 'string') && !_.isNaN(Number(x)));
	},
	isLetter: function(x) {
		var letterNumber = /^[a-zA-Z]+$/;  
		return x.match(letterNumber);
	},
	isSpecialChar:function(x){
		var specialChar = /^[@#\$%\^&\*\(\)_\-\+=\!\[\]<>,\.\?;\:]+$/;  
		return x.match(specialChar);
	},
	isUpperCase:function(x){
		var specialChar = /^[A-Z]+$/;  
		return x.match(specialChar);
	}
}