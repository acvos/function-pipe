var flatten = require('array-flatten')

function isPromise(x) {
  return (x instanceof Promise)
}

function apply(f, args) {
  if (!f) {
    return args[0]
  }

  if (args.length === 1 && isPromise(args[0])) {
    return args[0].then(f)
  }

  if (args.filter(isPromise).length > 0) {
    return Promise.all(args).then(function (xs) {
      return f.apply(undefined, xs)
    })
  }

  return f.apply(undefined, args)
}

function pipe() {
  var first = arguments[0]
  var rest = flatten(Array.prototype.slice.call(arguments, 1))

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
