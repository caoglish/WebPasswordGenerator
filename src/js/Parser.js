var _ = require('lodash');

function block(text,type){
    return {
        block:text,
        type:type
    };
}
function parse(password) {
    let blocklist=[];
    let regexList={
        letter:/^[a-zA-Z]+/,
        number:/^[0-9]+/,
        symbol:/^[^a-zA-Z0-9]+/
    };
    let matches;

    while(password.length>0){
        for (type in regexList){
            regex = regexList[type];
            matches = password.match(regex);
                    if(!_.isEmpty(matches)){
                        password = _.trimStart(password,matches[0]);  
                        blocklist.push(block(matches[0],type));
                        break;
                    }
        }
    }
    return blocklist;
}
module.exports = {
    parse:parse
}