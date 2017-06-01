/**
 * Created by tianshupei on 2017/6/1.
 */
var postcss = require('postcss')

var options = {
    rootValue: 75,
    precision: 6
}

function px2rem(px) {
    var root = options.rootValue
    var precision = options.precision

    return Number(px / root).toFixed(precision)
}

function handleComent(comment) {
    var decl = comment.prev()
    if (decl) {
        var px = decl.value.substring(0, decl.value.length - 2)
        decl.value = px2rem(px) + 'rem'
    }
}

module.exports = postcss.plugin('tsp-postcss-px2rem', function (opts) {
    options = Object.assign(options, opts)

    return function (root) {
        return root.walkComments(function (comment) {
            if (comment.text.trim() === 'rem') {
                handleComent(comment)
            }
        })
    }
})