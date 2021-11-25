const HtmlWebPackPlugin    = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin           = require('copy-webpack-plugin');

module.exports = {
    mode   : 'development',
    output : {
        clean : true
    },
    module : {
        rules : [
        {
            test    : /\.html$/i,
            loader  : 'html-loader',
            options : {
                sources  : false,
                minimize : false // true para Quitar comentarios, poner todo en una sola linea, etc.
            }
        },
        {
            test    : /\.css$/i,
            exclude : /styles.css$/,
            use     : ['style-loader', 'css-loader']
        },
        {
            test :  /styles.css$/i,
            use  : [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
    ]},
    plugins : [
        new HtmlWebPackPlugin({
            title    : 'Mi Webpack App',
            template : './src/index.html',
            filename : './index.html'
        }),
        new MiniCssExtractPlugin({
            filename    : '[name].css', // Mismo nombre [name], id unico para no mantener cache de navegador [fullhash]
            ignoreOrder : false,
            linkType    : 'text/css',
        }),
        new CopyPlugin({
            patterns: [
                { from : 'src/assets/', to : 'assets/' },
            ],
        }),
    ]
}