var _ = require('lodash');




function block(text){

    return {
        block:text
    };

}
function parse(password) {
    let blocklist=[];


    let regex_letters=/^[a-zA-Z]+/;
    let regex_numbers=/^[0-9]+/;
    let regex_symbols=/^[^a-zA-Z0-9]+/;
    let matches;

    while(password.length>0){
        matches = password.match(regex_letters);
        if(!_.isEmpty(matches)){
            password = _.trimStart(password,matches[0]);  //console.log(matches[0]);
            blocklist.push(block(matches[0]));
            continue;
        }

        matches= password.match(regex_numbers);
        if(!_.isEmpty(matches)){
            password = _.trimStart(password,matches[0]);
            blocklist.push(block(matches[0]));
            continue;
        }

        matches= password.match(regex_symbols);
        if(!_.isEmpty(matches)){
            password = _.trimStart(password,matches[0]);
            blocklist.push(block(matches[0]));
            continue;
        }


    }

  

  




  
    return blocklist;
}


module.exports = {
    parse:parse
}