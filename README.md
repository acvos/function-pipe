# function-pipe
[![Build Status](https://travis-ci.org/acvos/function-pipe.svg?branch=master)](https://travis-ci.org/acvos/function-pipe)
Functional composition for JS

## Motivation
Javascript is a very powerful language. Why not make it even more powerful with a simple functional composition tool? Function pipe allows you to create functions by combining other functions, just like lego blocks.

## Features
- Supports Promises or any mixture of sync and async functions
- Supports array or multiple arguments syntax
- Flattens nested arrays of functions
- First function in the pipe can accept multiple arguments

## Installation

```
npm install function-pipe
```

## Usage

```javascript
var pipe = require('function-pipe');

function toUppercase(string) {
  return string.toUpperCase();
}

function reverse(string) {
  return string.split('').reverse().join('');
}

function splitInWords(string) {
  return string.split(' ');
}

// All of these filters return [ '!EGOD', 'HCUM', 'YREV', 'HCUS', 'WOW' ]
var pipe1 = pipe(toUppercase, reverse, splitInWords)
var pipe2 = pipe([toUppercase, reverse, splitInWords])
var pipe3 = pipe(toUppercase, [reverse, splitInWords])
var pipe4 = pipe([toUppercase, reverse], splitInWords)
var pipe5 = pipe(toUppercase, [reverse, [splitInWords]])

console.log(pipe1('wow such very much doge!'));
console.log(pipe2('wow such very much doge!'));
console.log(pipe3('wow such very much doge!'));
console.log(pipe4('wow such very much doge!'));
console.log(pipe5('wow such very much doge!'));

// Promise support: following work equally well
Promise.resolve('wow such very much doge!').then(pipe1).then(console.log);
pipe1(Promise.resolve('wow such very much doge!')).then(console.log);

// Async functions support
const asyncPipe = pipe(
  fetchFrom('http://some.com/resource/:id'),
  toJson(),
  map(conutItems)
)

asyncPipe('doge').then(console.log)
```

## Testing

```
npm test
```