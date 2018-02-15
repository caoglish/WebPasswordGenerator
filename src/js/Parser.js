var _ = require('lodash');

function token(text,type,position,startOffset,endOffset){
    return {
        token:text,
        type:type,
        start_offset:startOffset,//start offset, include the start character poistion(substring() rule)
        end_offset:endOffset,//start offset, not include the start character poistion (substring() rule)
        position:position
    };
}


function parse(password) {
    let originalPassword=password;
    let tokenlist=[];
    let regexList={
        letter:/^[a-zA-Z]+/,
        number:/^[0-9]+/,
        symbol:/^[^a-zA-Z0-9]+/
    };
    let matches;
    let position = 0;
    while(password.length>0){
        for (let type in regexList){
            let regex = regexList[type];
            let matches = password.match(regex);
                    if(!_.isEmpty(matches)){
                        let startOffset=originalPassword.length - password.length;
                        let endOffset=startOffset + matches[0].length;
                        tokenlist.push(token(matches[0],type,position++,startOffset,endOffset));
                        password = _.trimStart(password,matches[0]);//remove processed part from the password.
                        break;
                    }
        }
    }
    return tokenlist;
}
module.exports = {
    parse:parse
}