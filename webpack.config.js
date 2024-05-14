const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
require('dotenv').config({ path: './.env' });

const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const HTMLComponentsPath = path.resolve(__dirname, "./src/components/");

const config = {
    entry: {
        home: './src/home/app.home.ts',
        event: './src/event/app.event.ts',
        proposal: './src/proposal/app.proposal.ts',
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
            HTML_COMPONENTS_PATH: HTMLComponentsPath,
            GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY,
            GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
        }),
        new HtmlWebpackPlugin({
            filename: 'seminar-minecraft.html',
            template: './src/pages/seminar-minecraft.html',
            chunks: ["event"],
            minify: true,
            HTML_COMPONENTS_PATH: HTMLComponentsPath,
            GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY,
            GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
        }),
        new HtmlWebpackPlugin({
            filename: 'hackathon-minecraft.html',
            template: './src/pages/hackathon-minecraft.html',
            chunks: ["event"],
            minify: true,
            HTML_COMPONENTS_PATH: HTMLComponentsPath,
            GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY,
            GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
        }),
        new HtmlWebpackPlugin({
            filename: 'proposal.html',
            template: './src/pages/proposal.html',
            chunks: ["proposal"],
            minify: true,
            HTML_COMPONENTS_PATH: HTMLComponentsPath,
            GOOGLE_RECAPTCHA_KEY: process.env.GOOGLE_RECAPTCHA_KEY,
            GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
        }),
        new CopyPlugin({
            patterns: [{
                    from: "assets",
                    to: "assets",
                    noErrorOnMissing: true,
                    globOptions: {
                        dot: true,
                        ignore: ["**/.htaccess", "**/browserconfig.xml", "**/sitemap.xml", "**/favicon.ico"]
                    }
                },
                {
                    from: "assets/static/"
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
                commonStyles: {
                    type: "css/mini-extract",
                    name: "styles_common",
                    chunks: (chunk) => {
                        return chunk.name === "home" || chunk.name === "event" || chunk.name === "proposal";
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
