# function-pipe
[![Build Status](https://travis-ci.org/acvos/function-pipe.svg?branch=master)](https://travis-ci.org/acvos/function-pipe)
Functional composition for JS

## Motivation
Javascript is a very powerful language. Why not make it even more powerful with a simple functional composition tool? Function pipe allows you to create functions by combining other functions, just like lego blocks.

## Features
- Supports Promises or any mixture of sync and async functions
- First function in the pipe can accept multiple arguments
- Peturns a promise  when there is a promise in the pipe
- Works synchronously when all the parts of the pipe are synchronous
- Flattens nested arrays of functions

## Installation

```
npm install function-pipe
```

## Usage

```javascript
import pipe from 'function-pipe'

const toUppercase = string => string.toUpperCase()
const reverse = string => string.split('').reverse().join('')
const splitInWords = string => string.split(' ')

// Simple use
const pipe1 = pipe(toUppercase, reverse, splitInWords)

console.log(pipe1('wow such very much doge!'))
// -> [ '!EGOD', 'HCUM', 'YREV', 'HCUS', 'WOW' ]

pipe1(Promise.resolve('wow such very much doge!'))
  .then(console.log)
// -> [ '!EGOD', 'HCUM', 'YREV', 'HCUS', 'WOW' ]

// Multiple arguments
const join = (separator, array) => array.join(separator)

const pipe2 = pipe(join, toUppercase)
console.log(pipe2('-', ['doge', 'wow']))
// -> 'DOGE-WOW'

// Async functions in the pipe
const asyncPipe = pipe(
  fetchFrom('http://some.com/resource/:id'),
  toJson(),
  map(conutItems)
)

asyncPipe('doge').then(console.log)

console.log(pipe5('wow such very much doge!'));

```

## Testing

```
npm test
```
