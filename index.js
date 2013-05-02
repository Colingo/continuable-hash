module.exports = hash

//  hash := (tasks:Object<String, Continuable<T>>)
//      => Continuable<Object<String, T>>
function hash(tasks) {
    return function continuable(callback) {
        var result = {}
        var ended = false
        var count = 0
        var keys = Object.keys(tasks)
        var length = keys.length

        keys.forEach(function (key) {
            var source = tasks[key]

            source(function (err, value) {
                if (err && !ended) {
                    callback(err)
                } else if (!err) {
                    result[key] = value
                    if (++count === length) {
                        callback(null, result)
                    }
                }
            })
        })
    }
}
