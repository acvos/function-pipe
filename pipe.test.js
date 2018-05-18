const expect = require("expect.js")
const pipe = require("./index.js")

const upper = function (x) { return x.toUpperCase() }
const split = function (x) { return x.split('') }
const reverse = function (xs) { return xs.reverse() }
const concat = function (x, y) { return x + y }
const asyncWow = function (x) { return Promise.resolve(x + ' wow!') }

test('empty pipe is transparent', function () {
  const p = pipe()

  expect(p('doge')).to.be('doge')
  expect(p()).to.be(undefined)
  expect(p('such', 'much', 'wow')).to.be('such')
})

test('pipes synchronously through functions', function () {
  const p = pipe(upper, split, reverse)
  expect(p('doge')).to.eql(['E', 'G', 'O', 'D'])
})

test('pipes multiple arguments', function () {
  const p = pipe(concat, upper)
  expect(p('very', 'doge')).to.eql('VERYDOGE')
})

test('pipes promises', function () {
  const p1 = pipe(upper, split, reverse)
  expect(p1(Promise.resolve('doge'))).to.be.a(Promise)
  p1(Promise.resolve('doge')).then(function (x) { expect(x).to.be.eql(['E', 'G', 'O', 'D']) })

  const p2 = pipe(concat, upper)
  expect(p2(Promise.resolve('doge'), 'very')).to.be.a(Promise)
  p2(Promise.resolve('doge'), 'very').then(function (x) { expect(x).to.be.eql('DOGEVERY') })

  expect(p2(Promise.resolve('such'), Promise.resolve('much'))).to.be.a(Promise)
  p2(Promise.resolve('such'), Promise.resolve('much')).then(function (x) { expect(x).to.be.eql('SUCHMUCH') })
})

test('pipes through async functions', function () {
  const p = pipe(upper, asyncWow)
  expect(p(Promise.resolve('doge'))).to.be.a(Promise)
  p(Promise.resolve('doge')).then(function (x) { expect(x).to.be.eql('DOGE wow!') })
})
