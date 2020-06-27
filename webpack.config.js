var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var CleanWebpackPlugin = require("clean-webpack-plugin")
var webpack = require("webpack")
var extractPlugin = new ExtractTextPlugin({
    filename: "main.css"
})
module.exports = {
    entry:{
        app:"./src/js/app.js"
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js",
        // tell webpack-dev-server to look into publicPath
        // publicPath:"/dist"
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
            },{
                //this will analyse html files and will create a text file and then it is passed to plugin
                test:/\.html$/,
                use:["html-loader"]
            },{
                test:/\.(jpg|png)$/,
                use:{
                    loader:"file-loader",
                    options:{
                        name:'[name].[ext]',
                        outputPath:"img/",
                        // below will update our html file and tell it where to look
                        publicPath:"img/"
                    }
                }
            },
            {
                test:/\.html$/,
                use:[{
                    loader:"file-loader",
                    options:{
                        name:'[name].[ext]',
                         
                    }
                }],
                exclude:path.resolve(__dirname,"src/index.html")
            }
        ]
    },
    plugins:[
        // new webpack.optimize.UglifyJsPlugin({
            
        // }),
        // provide a custom plugin
        new webpack.ProvidePlugin({
            // whenever webpack sees $ or jQuery, use this jquery package
            $: "jquery",
            jQuery:"jquery"
        }),
        extractPlugin,
        //this will take text file and convert it to html
        new HtmlWebpackPlugin({
            filename:"index.html",
            template: "src/index.html"
        }),
        // new HtmlWebpackPlugin({
        //      filename:"users.html",
        //     template: "src/users.html",
        //      chunks:[]
        // }),
        // delete older dist folder
        new CleanWebpackPlugin([
            "dist"
        ])
    ]
}