var path = require("path")
var webpack = require("webpack")
module.exports = {
    entry:"./src/js/app.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js",
        // tell webpack-dev-server to look into publicPath
        publicPath:"/dist"
    },
    module:{
        rules: [
            {
                test: /\.css$/,
                // loader: "css-loader"
                use:[
                    //order is important, webpack loads in reverse order
                    // first css-loader will be executed
                    "style-loader","css-loader"
                ]
            }
        ]
    },
    plugins:[
        // new webpack.optimize.UglifyJsPlugin({
            
        // })
    ]
}