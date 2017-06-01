/**
 * Created by tianshupei on 2017/6/1.
 */
var postcss = require('postcss')
var px2rem = require('../lib')

var css = 'h1 { font-size: 20px; /* rem */}'

console.log(postcss(px2rem).process(css).css)

