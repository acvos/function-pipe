const expect = require("expect")

const pipe = require("../index.js")

const upper = function (x) { return x.toUpperCase() }
const split = function (x) { return x.split('') }
const reverse = function (xs) { return xs.reverse() }
const concat = function (x, y) { return x + y }
const asyncWow = function (x) { return Promise.resolve(x + ' wow!') }

describe("pipe", function () {
  it('empty pipe is transparent', function () {
    const p = pipe()

    expect(p('doge')).toBe('doge')
    expect(p()).toBe(undefined)
    expect(p('such', 'much', 'wow')).toBe('such')
  })

  it('pipes synchronously through functions', function () {
    const p = pipe(upper, split, reverse)
    expect(p('doge')).toEqual(['E', 'G', 'O', 'D'])
  })

  it('pipes constants', function () {
    const p = pipe('doge', upper, split, reverse)
    expect(p('nothing')).toEqual(['E', 'G', 'O', 'D'])
  })

  it('supports arrays of functions', function () {
    var p

    p = pipe('doge', [upper, split, reverse])
    expect(p('nothing')).toEqual(['E', 'G', 'O', 'D'])

    p = pipe(['doge', upper, split, reverse])
    expect(p('nothing')).toEqual(['E', 'G', 'O', 'D'])

    p = pipe(['doge', [upper, split], reverse])
    expect(p('nothing')).toEqual(['E', 'G', 'O', 'D'])

    p = pipe(['doge', [upper, [split], [reverse]]])
    expect(p('nothing')).toEqual(['E', 'G', 'O', 'D'])
  })

  it('pipes multiple arguments', function () {
    const p = pipe(concat, upper)
    expect(p('very', 'doge')).toEqual('VERYDOGE')
  })

  it('pipes promises', function () {
    const p1 = pipe(upper, split, reverse)
    expect(p1(Promise.resolve('doge'))).toBeInstanceOf(Promise)
    expect(p1(Promise.resolve('doge'))).resolves.toEqual(['E', 'G', 'O', 'D'])

    const p2 = pipe(concat, upper)
    expect(p2(Promise.resolve('doge'), 'very')).toBeInstanceOf(Promise)
    expect(p2(Promise.resolve('doge'), 'very')).resolves.toEqual('DOGEVERY')

    expect(p2(Promise.resolve('such'), Promise.resolve('much'))).toBeInstanceOf(Promise)
    expect(p2(Promise.resolve('such'), Promise.resolve('much'))).resolves.toEqual('SUCHMUCH')
  })

  it('pipes through async functions', function () {
    const p = pipe(upper, asyncWow)
    expect(p(Promise.resolve('doge'))).toBeInstanceOf(Promise)
    expect(p(Promise.resolve('doge'))).resolves.toEqual('DOGE wow!')
  })
})
