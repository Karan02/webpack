var path = require("path")
var webpack = require("webpack")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var extractPlugin = new ExtractTextPlugin({
    filename: "main.css"
})
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
            // {
            //     test: /\.css$/,
            //     // loader: "css-loader"
            //     use:[
            //         //order is important, webpack loads in reverse order
            //         // first css-loader will be executed
            //         "style-loader","css-loader"
            //     ]
            // },
            {
                test: /\.js$/,
                use: [{
                    loader:"babel-loader",
                    options:{
                        presets:["es2015"]
                    }
                }]
            },{
                test:/\.scss$/,
                use: extractPlugin.extract({
                    // last loader is first compiled
                    use:[
                        "css-loader","sass-loader"
                    ]
                })
            }
        ]
    },
    plugins:[
        // new webpack.optimize.UglifyJsPlugin({
            
        // }),
        extractPlugin
    ]
}