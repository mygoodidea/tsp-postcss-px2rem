/**
 * Created by tianshupei on 2017/6/1.
 */
var assert = require('assert')

var postcss = require('postcss')
var px2rem = require('../lib')

var rem = 'h1 { font-size: 20px; /* rem  */}'
var px = 'h1 { font-size: 20px; /* px */}'
var mulitVal = 'h1 { border:1px solid #fff; /* rem */}'

const processor = postcss([px2rem])


describe('#lib/index.js', function () {
    it('shoud replace px to rem', function () {
        var result = processor.process(rem).css
        assert.strictEqual(
            result.indexOf('px') === -1 && result.indexOf('rem') !== -1,
            true
        )
    })

    it('no replace', function () {
        var result = processor.process(px).css
        assert.strictEqual(
            result.indexOf('px') !== -1,
            true
        )
    })

    it('replace px value to rem', function () {
        var result = processor.process(mulitVal).css
        assert.strictEqual(
            result.indexOf('rem solid #fff') !== -1,
            true
        )
    })
})
