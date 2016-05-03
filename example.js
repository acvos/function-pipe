var pipe = require('./index');

function toUppercase(string) {
  return string.toUpperCase();
}

function reverse(string) {
  return string.split('').reverse().join('');
}

function splitInWords(string) {
  return string.split(' ');
}

// All of the tests return [ '!EGOD', 'HCUM', 'YREV', 'HCUS', 'WOW' ]
var myStringTransformer = pipe(toUppercase, reverse, splitInWords)
var myStringTransformer = pipe([toUppercase, reverse, splitInWords])
var myStringTransformer = pipe(toUppercase, [reverse, splitInWords])
var myStringTransformer = pipe([toUppercase, reverse], splitInWords)
var myStringTransformer = pipe(toUppercase, [reverse, [splitInWords]])

console.log(myStringTransformer('wow such very much doge!'));

var myStringTransformer = pipe([toUppercase, reverse, splitInWords])
console.log(myStringTransformer('wow such very much doge!'));

var myStringTransformer = pipe(toUppercase, [reverse, splitInWords])
console.log(myStringTransformer('wow such very much doge!'));

var myStringTransformer = pipe([toUppercase, reverse], splitInWords)
console.log(myStringTransformer('wow such very much doge!'));

var myStringTransformer = pipe(toUppercase, [reverse, [splitInWords]])
console.log(myStringTransformer('wow such very much doge!'));
