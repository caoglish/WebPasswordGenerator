var _ = require('lodash');
var parser = require('./Parser');

function countBlockTypeNumber(parsedData) {
    let blockNumber = {};
    for (block of parsedData) {
        if (!_.isNumber(blockNumber[block.type])) blockNumber[block.type] = 1;
        else blockNumber[block.type]++;
    }
    return blockNumber;
}

function countTypeSize(parsedData){
    let list = {};
    for (block of parsedData) {
        
        if (!_.isNumber(list[block.type])) list[block.type] = block.block.length;
        else list[block.type]+= block.block.length;
    }
    return list;
}

function countletterCaseSize(parsedData){
    let list = {upperCase:0,lowerCase:0};
    for (block of parsedData) {
        if (block.type !== 'letter') continue;
        let charList=block.block.split("");
        charList.forEach(function(item){
            if(item === item.toLowerCase()) list.lowerCase++;
            if(item === item.toUpperCase()) list.upperCase++;
        });
    }
    return list;
}


function analyse(password) {
    let analyzedData = {
        password: password,
        parsedData: parser.parse(password),
        size: password.length
    };

    analyzedData.typeSize =  countTypeSize(analyzedData.parsedData);//size of each type
    analyzedData.blockNumber = analyzedData.parsedData.length;//number of blocks
    analyzedData.blockTypeNumber = countBlockTypeNumber(analyzedData.parsedData);//number of each type
    analyzedData.letterCaseSize = countletterCaseSize(analyzedData.parsedData);//number of each type of letter case

    return analyzedData;
}

module.exports = {
    analyse: analyse
}