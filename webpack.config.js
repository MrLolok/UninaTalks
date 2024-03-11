const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
require('dotenv').config({ path: './.env' }); 

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    entry: {
        home: './src/home/home.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pages/home.html',
            chunks: ["home"],
            minify: true,
            google_recaptcha_key: process.env.GOOGLE_RECAPTCHA_KEY
        }),
        new CopyPlugin({
            patterns: [{
                    from: "assets",
                    to: "assets"
                },
                {
                    from: "src/php/"
                },
            ]
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                homeStyles: {
                    type: "css/mini-extract",
                    name: "styles_home",
                    chunks: (chunk) => {
                        return chunk.name === "home";
                    },
                    enforce: true,
                }
            },
        },
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ],
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.plugins.push(new MiniCssExtractPlugin());
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
    }
    return config;
};
