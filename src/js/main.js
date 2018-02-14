var Analyzer = require('./Analyzer');
var Vue = require('vue');

var app = new Vue({
    el: '#app',
    data: {
      password: 'Hello Vue! caoglish',
     
    },
    computed:{
        analyzedInfo:function () {
           return Analyzer.analyse(this.password);
          }
    }
  })

 



  
