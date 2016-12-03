var j = require('path').join;
var WebpackHtmlPlugin = require('webpack-html-plugin');
module.exports = {
    entry: "./input.js",
    context: j(__dirname, 'example'),
    output: {
        path: j(__dirname, 'output'),
        filename: 'output.js'
    },
    module: {
        loaders: [{
            test: /.*\.jsonreq$/,
            loader: j(__dirname, 'index.js')
        }]
    },
    plugins: [
        new WebpackHtmlPlugin()
    ]
};
