var _ = require('lodash');

function block(text,type){
    return {
        block:text,
        type:type
    };
}
function parse(password) {
    let blocklist=[];

    let regex_letters=/^[a-zA-Z]+/;
    let regex_numbers=/^[0-9]+/;
    let regex_symbols=/^[^a-zA-Z0-9]+/;
    list={letter:regex_letters,number:regex_numbers,symbol:regex_symbols};
    let matches;

    while(password.length>0){
        for (type in list){
            regex = list[type];
            matches = password.match(regex);
                    if(!_.isEmpty(matches)){
                        password = _.trimStart(password,matches[0]);  //console.log(matches[0]);
                        blocklist.push(block(matches[0],type));
                        continue;
                    }
        }
    }
    return blocklist;
}
module.exports = {
    parse:parse
}