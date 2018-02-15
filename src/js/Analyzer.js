var _ = require('lodash');
var parser = require('./Parser');

function initTypeList() {
    return {
        letter: 0,
        number: 0,
        symbol: 0
    }
}

function counttokenTypeNumber(parsedData) {
    let tokenNumber = initTypeList();
    for (let token of parsedData) {
        if (!_.isNumber(tokenNumber[token.type])) tokenNumber[token.type] = 1;
        else tokenNumber[token.type]++;
    }
    return tokenNumber;
}

function countTypeSize(parsedData) {
    let list = initTypeList();
    for (let token of parsedData) {

        if (!_.isNumber(list[token.type])) list[token.type] = token.token.length;
        else list[token.type] += token.token.length;
    }
    return list;
}

function countletterCaseSize(parsedData) {
    let list = {
        upperCase: 0,
        lowerCase: 0
    };
    for (let token of parsedData) {
        if (token.type !== 'letter') continue;
        let charList = token.token.split("");
        charList.forEach(function (item) {
            if (item === item.toLowerCase()) list.lowerCase++;
            if (item === item.toUpperCase()) list.upperCase++;
        });
    }
    return list;
}

function analyseOnlyType(parsedData) {
    return parsedData.length === 1 ? parsedData[0].type : null;
}

function analyseRepetitiveCharacter(password) {
    let charlist = password.split("");
    let list = {};

    for (let char of charlist) {
        if (list[char] === undefined) {
            list[char] = 1;
        } else {
            list[char]++;
        }
    }

    return {
        list: list,
        count: _.reduce(list, function (sum, num) {
            if (num > 1) {
                return sum + num;
            }
            return sum;
        }, 0)
    };
}

function countMiddleNumberOrSymbol(analyzedData) {
   
    let pd = analyzedData.parsedData;
    if(pd.length===0)  return 0;
    let ts = analyzedData.typeSize;
    let bn = analyzedData.tokenNumber;


    let firstToken = pd[0];
    let lastToken = pd[bn - 1];

    let middleNum = ts["number"] + ts["symbol"];

    if (firstToken.type !== 'letter') middleNum--;
    if (lastToken.type !== 'letter') middleNum--;

    return middleNum;


}


function analyseConsecutive(parsedData) {
    let list = {
        uppercase: 0,
        lowercase: 0,
        number: 0
    }

    for (let token of parsedData) {
        if (token.type === 'number') {
            list.number += token.token.length - 1;
        }

        if (token.type === 'letter' && token.token.length > 1) {
            let letterList = token.token.split("");
            let un = 0; //uppercase number
            let ln = 0; //lowercase number
            for (let char of letterList) {
                if (char.toLowerCase() === char) {
                    ln++;
                    un = 0;
                    if (ln > 1) {
                        list.lowercase++;
                    }
                } else {
                    ln = 0;
                    un++;
                    if (un > 1) {
                        list.uppercase++;
                    }
                }
            }
        }
    }

    return list;
}

function analyzeSequential(parsedData) {
    let list = {
        letter: 0,
        number: 0,
        symbol: 0
    }

    let seqPatternList = {
        letter: "abcdefghijklmnopqrstuvwxyz",
        number: "01234567890",
        symbol: "!@#$%^&*()_+"
    }

    let sReverse = function (str) {
        return _.reverse(str.split("")).join("");
    }

    let revSeqPatternList = {};
    for (let key in seqPatternList) {
        revSeqPatternList[key] = sReverse(seqPatternList[key]);
    }


    for (let token of parsedData) {
        let str = token.token;
        let type = token.type;

        for (let i = 0; i < str.length - 2; i++) {
            let chkstr = str.substr(i, 3);
            if (seqPatternList[type].indexOf(chkstr) !== -1 || revSeqPatternList[type].indexOf(chkstr) !== -1) {
                list[type]++;
            }
        }
    }
    return list;
}





function analyse(password) {
    let analyzedData = {
        password: password,
        parsedData: parser.parse(password),
        size: password.length
    };

    analyzedData.typeSize = countTypeSize(analyzedData.parsedData); //size of each type
    analyzedData.tokenNumber = analyzedData.parsedData.length; //number of tokens
    analyzedData.tokenTypeNumber = counttokenTypeNumber(analyzedData.parsedData); //number of each type
    analyzedData.letterCaseSize = countletterCaseSize(analyzedData.parsedData); //number of each type of letter case
    analyzedData.onlyType = analyseOnlyType(analyzedData.parsedData); //number of each type of letter case
    //analyzedData.repetitivePattern = analyseRepetitivePattern(analyzedData.password); //number of each type of letter case
    analyzedData.repetitiveCharacter = analyseRepetitiveCharacter(analyzedData.password); //number of each type of letter case
    analyzedData.middleNumberOrSymbolSize = countMiddleNumberOrSymbol(analyzedData); //number of each type of letter case
    analyzedData.consecutive = analyseConsecutive(analyzedData.parsedData); //number of each type of letter case
    analyzedData.sequential = analyzeSequential(analyzedData.parsedData); //number of each type of letter case

    return analyzedData;
}

module.exports = {
    analyse: analyse
}