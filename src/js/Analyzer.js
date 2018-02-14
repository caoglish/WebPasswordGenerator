var _ = require('lodash');
var parser = require('./Parser');

function initTypeList() {
    return {
        letter: 0,
        number: 0,
        symbol: 0
    }
}

function countBlockTypeNumber(parsedData) {
    let blockNumber = initTypeList();
    for (let block of parsedData) {
        if (!_.isNumber(blockNumber[block.type])) blockNumber[block.type] = 1;
        else blockNumber[block.type]++;
    }
    return blockNumber;
}

function countTypeSize(parsedData) {
    let list = initTypeList();
    for (let block of parsedData) {

        if (!_.isNumber(list[block.type])) list[block.type] = block.block.length;
        else list[block.type] += block.block.length;
    }
    return list;
}

function countletterCaseSize(parsedData) {
    let list = {
        upperCase: 0,
        lowerCase: 0
    };
    for (let block of parsedData) {
        if (block.type !== 'letter') continue;
        let charList = block.block.split("");
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
    let bn = analyzedData.blockNumber;


    let firstBlock = pd[0];
    let lastBlack = pd[bn - 1];

    let middleNum = ts["number"] + ts["symbol"];

    if (firstBlock.type !== 'letter') middleNum--;
    if (lastBlack.type !== 'letter') middleNum--;

    return middleNum;


}


function analyseConsecutive(parsedData) {
    let list = {
        uppercase: 0,
        lowercase: 0,
        number: 0
    }

    for (let block of parsedData) {
        if (block.type === 'number') {
            list.number += block.block.length - 1;
        }

        if (block.type === 'letter' && block.block.length > 1) {
            let letterList = block.block.split("");
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


    for (let block of parsedData) {
        let str = block.block;
        let type = block.type;

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
    analyzedData.blockNumber = analyzedData.parsedData.length; //number of blocks
    analyzedData.blockTypeNumber = countBlockTypeNumber(analyzedData.parsedData); //number of each type
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