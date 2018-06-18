const maybe = function(callback) {
  if (typeof callback !=="function") return;
  return function(...args) {
    if (args.length === 0) return;
    let arg;
    for (arg of args) {
      if (typeof arg === "undefined" || arg === null) return;
    }
    return callback.apply(this, args)
  }
}

export default maybe

