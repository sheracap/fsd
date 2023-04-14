const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env = {}, options) => {
  const { mode = "development" } = options;

  const isProd = mode === "production";
  const isDev = mode === "development";

  console.log("NODE JS VERSION", process.version);

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CopyWebpackPlugin([
        { from: "public" }
      ]),
      new HtmlWebpackPlugin({
        template: "public/index.html",
        favicon: "public/favicon.png",
        buildTime: new Date().toString().slice(0, 24),
      }),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main.[hash:8].css",
        }),
        new CleanWebpackPlugin()
      );
    } else {
      plugins.push(
        new webpack.SourceMapDevToolPlugin({
          filename: "[file].map",
        })
      );
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      );
      plugins.push(
        new ReactRefreshWebpackPlugin()
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",

    entry: path.resolve(__dirname, "src/index.tsx"),

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProd ? "main-[hash:8].js" : undefined,
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // loading images
        {
          test: /\.(jpg|png|gif|ico|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },

        // loading css
        {
          test: /\.(css)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
                sourceMap: true,
              },
            },
          ],
        },

        // loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
                sourceMap: true,
              },
            },
            "sass-loader",
          ],
        },

        // loading LESS
        {
          test: /\.less$/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
                sourceMap: true,
              },
            },
            "less-loader"
          ],
        },
      ],
    },

    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        "#widgets": path.resolve(__dirname, "../src/widgets/"),
        "#features": path.resolve(__dirname, "../src/features/"),
        "#entities": path.resolve(__dirname, "../src/entities/"),
        "#shared": path.resolve(__dirname, "../src/shared/"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", "scss", "sass"],
    },

    plugins: getPlugins(),

    devtool: isProd ? false: "eval-cheap-module-source-map",

    devServer: {
      open: true,
      port: 7078,
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "https://api.polygon.io",
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};