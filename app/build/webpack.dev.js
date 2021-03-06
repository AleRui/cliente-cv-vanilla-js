const path = require("path"); // Path library
//Plugins
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

// Contstants
const base = (pathToFile) => path.resolve(__dirname, pathToFile);
const glob = require("glob"); // Require for Purge
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  //Base
  mode: "development",
  entry: base("../src/index.js"),
  output: {
    path: base("../dist"),
    filename: "custom-dev.js",
  },
  //Modules
  module: {
    rules: [
      // Babel
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"] // Async and others...
            },
          },
        ],
      },
      //Sass
      {
        test: /\.scss$/,
        // use: [
        //   "style-loader",
        //   "css-loader",
        //   {
        //     //loader: "postcss-loader",

        //     options: {
        //       plugins: () => [autoprefixer()],
        //     },
        //   },
        //   "sass-loader",
        // ],

        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              filename: '[name].min.css'
            }
          },
          //'css-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              url: false
            }
          },
          //'css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:6]',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
              ]
            }
          },
          'sass-loader',
        ]
      },
      // Fonts
      {
        test: /\.(ttf|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/fonts/[name].[ext]",
              publicPath: "/dist/fonts",
            },
          },
        ],
      },
      // Others Fonts, Images, Video
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/[name].[ext]",
              publicPath: "/dist/assets",
            },
          },
        ],
      },
    ],
  }, // End Loaders modules
  // Plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      title: 'Cliente Alejandro Ruiz | CV DEV',
      template: './src/home-dev.html'
    }),
    new MiniCSSExtractPlugin({
      filename: "css/style.min.[contenthash].css",
    }),
  ],
};
