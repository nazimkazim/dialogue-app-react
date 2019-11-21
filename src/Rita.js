import React from "react";
var nlp = require("compromise");
//import { RiString } from 'rita';
//var rita = require('rita');

var str = nlp("I have been trying to conceal, because it is expensive");
var result = str.verbs();

console.log(result.terms());

//console.log(result.original.list[0].terms);
result.original.list[0].terms.forEach(item => {
  //console.log(item.tags);
});
export default function Rita() {
  return (
    <div>
      <p>Result</p>
    </div>
  );
}
