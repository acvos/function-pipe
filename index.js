var flatten = require('array-flatten')

function pipe() {
  var functions = flatten(Array.prototype.slice.call(arguments, 0))

  return function (x) {
    var i, f, result = x

    for (i in functions) {
      f = functions[i]
      result = f(result)
    }

    return result
  }
}

module.exports = pipe;
