import path from 'path';

import { Configuration } from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDev = process.env.NODE_ENV === "development";

const common: Configuration = {
    mode: isDev ? "development" : "production",
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx", ".json"],
    },
    externals: ["fsevents"],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "./",
        filename: "[name].js",
        assetModuleFilename: "assets/[name][ext]",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDev,
                        }
                    }
                ]
            },
            {
                test: /\.(ico|png|jpe?g|svg|eot|woff?2?)$/,
                type: "asset/resource",
            }
        ]
    },
    watch: isDev,
    devtool: isDev ? "inline-source-map" : undefined,
};

const main: Configuration = {
    ...common,
    target: "electron-main",
    entry: {
        main: "./src/main/main.ts",
    }
}

const preload: Configuration = {
    ...common,
    target: "electron-preload",
    entry: {
        preload: "./src/main/preload.ts"
    }
}

const renderer: Configuration = {
    ...common,
    target: "web",
    entry: {
        app: "./src/app.tsx",
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        })
    ]
}

const config = isDev ? [renderer] : [main, preload, renderer];
export default config