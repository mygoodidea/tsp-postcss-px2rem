/**
 * Created by tianshupei on 2017/6/1.
 */
var postcss = require('postcss')

var options = {
    rootValue: 75,
    precision: 6
}

var pxRegExp = /\b(\d+(\.\d+)?)px\b/

function px2rem(px) {
    var root = options.rootValue
    var precision = options.precision

    return Number(px / root).toFixed(precision)
}

function handleComent(comment) {
    var decl = comment.prev()
    if (decl && pxRegExp.test(decl.value)) {
        decl.value = decl.value.replace(new RegExp(pxRegExp.source, 'g'), function ($0, $1) {
            return px2rem($1) + 'rem'
        })
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