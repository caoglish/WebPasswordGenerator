var Analyzer = require('./Analyzer');
var Vue = require('vue');
var _ = require('lodash');

var app = new Vue({
  el: '#app',
  data: {
    password: 'abc123---fadf-e3!@#$68',

  },
  computed: {
    analyzedInfo: function () {
      return Analyzer.analyse(this.password);
    },
    tableItem: function () {
      return [{
          "rule": "Number of Characters",
          "count": this.analyzedInfo.size
        },
        {
          "rule": "Uppercase Letters",
          "count": this.analyzedInfo.letterCaseSize.upperCase
        },
        {
          "rule": "Lowercase Letters",
          "count": this.analyzedInfo.letterCaseSize.lowerCase
        }, {
          "rule": "Numbers",
          "count": this.analyzedInfo.typeSize.number
        },
        {
          "rule": "Symbols",
          "count": this.analyzedInfo.typeSize.symbol
        },
        {
          "rule": "Middle Numbers or Symbols",
          "count": this.analyzedInfo.middleNumberOrSymbolSize
        },
        {
          "rule": "only type",
          "count": _.isEmpty(this.analyzedInfo.onlyType)?"-":this.analyzedInfo.onlyType
        },
        {
          "rule": "Repeat Characters",
          "count": this.analyzedInfo.repetitiveCharacter.count
        }
        ,
        {
          "rule": "Consecutive Uppercase Letters",
          "count": this.analyzedInfo.consecutive.uppercase
        },
        {
          "rule": "Consecutive Lowercase Letters",
          "count": this.analyzedInfo.consecutive.lowercase
        },
        
        {
          "rule": "Consecutive Numbers",
          "count": this.analyzedInfo.consecutive.number
        },
        {
          "rule": "Sequential Letters (3+)",
          "count": this.analyzedInfo.sequential.letter
        },
        {
          "rule": "Sequential Numbers (3+)",
          "count": this.analyzedInfo.sequential.number
        },{
          "rule": "Sequential Symbols (3+)",
          "count": this.analyzedInfo.sequential.symbol
        }

      ]

    }
  }
})