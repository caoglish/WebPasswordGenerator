var assert = require('chai').assert;
var analyzer = require("../src/js/Analyzer");


describe('Analyzer', function() {
	describe('Analyzer', function() {
		it('Analysing', function() {
            console.log(analyzer.analyse("abc###233fasdf3E#@$f"))
            console.log(analyzer.analyse("c123ddd123,,,123d34ddd"))
            console.log(analyzer.analyse("221c123ddd123,,,123d34dddDDD!"))
        });

        // it('Analysing only type', function() {
            
        // });
    });
});
