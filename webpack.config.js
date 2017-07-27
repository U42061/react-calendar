var webpack = require('webpack');

module.exports = {
    entry: "./src/calendar.js",
    output: {
        path: __dirname + '/public/build',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.css/,
                loader: "style-loader!css-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.json$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]

};