var assert = require('chai').assert;
var analyzer = require("../src/js/Analyzer");

describe('Analyzer', function () {
    describe('Analyzer', function () {
        it('Analysing basic: 12345fabcsdddf3Edd!@#d', function () {

            let result = analyzer.analyse("12345fabcsdddf3Edd!@#d");
            assert.equal(8, result.middleNumberOrSymbolSize);
            assert.equal(3, result.sequential.number);
            assert.equal(1, result.sequential.symbol);
            assert.equal(10, result.repetitiveCharacter.count);
            assert.equal(6, result.blockNumber);
            assert.deepEqual({
                upperCase: 1,
                lowerCase: 12
            }, result.letterCaseSize);
            assert.deepEqual({
                uppercase: 0,
                lowercase: 9,
                number: 4
            }, result.consecutive);
            assert.deepEqual({
                letter: 3,
                number: 2,
                symbol: 1
            }, result.blockTypeNumber);
            assert.deepEqual({
                letter: 13,
                number: 6,
                symbol: 3
            }, result.typeSize);
        });

        it('Analysing basic: adg231!+#dDd', function () {

            let result = analyzer.analyse("adg231f!+#dDd");
            
            assert.equal(6, result.middleNumberOrSymbolSize);
            assert.equal(0, result.sequential.number);
            assert.equal(0, result.sequential.symbol);
            assert.equal(3, result.repetitiveCharacter.count);
            assert.equal(5, result.blockNumber);
            assert.deepEqual({
                upperCase: 1,
                lowerCase: 6
            }, result.letterCaseSize);
            assert.deepEqual({
                uppercase: 0,
                lowercase: 2,
                number: 2
            }, result.consecutive);
            assert.deepEqual({
                letter: 3,
                number: 1,
                symbol: 1
            }, result.blockTypeNumber);
            assert.deepEqual({
                letter: 7,
                number: 3,
                symbol: 3
            }, result.typeSize);
        });

        it('Analysing only letter or number', function () {
            let result = analyzer.analyse("abcddd");
            assert.equal('letter', result.onlyType);
            result = analyzer.analyse("123456");
            assert.equal('number', result.onlyType);
        });
    });
});