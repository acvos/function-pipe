var flatten = require('array-flatten')
var apply = require('poly-apply')

function identity(x) {
  return x
}

function pipe() {
  var funcs = flatten(Array.prototype.slice.call(arguments, 0))
  if (!funcs.length) {
    return identity
  }

  var first = funcs[0]
  var rest = funcs.slice(1)

  return function () {
    var args = Array.prototype.slice.call(arguments, 0)
    var i, f, result = apply(first, args)

    for (i = 0; i < rest.length; i++) {
      f = rest[i]
      result = apply(f, [result])
    }

    return result
  }
}

module.exports = pipe;
