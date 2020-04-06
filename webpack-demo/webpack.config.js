const path = require('path');
const HtmlWebpackPlugn = require("html-webpack-plugin");

module.exports = {
    mode: "development",//development开发环境 production生产环境 
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ["babel-loader"],
                include: path.join(__dirname, "src"),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugn({
            template: path.join(__dirname, "src", "index.html"),
            filename: "index.html"
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "dist")
    }
}