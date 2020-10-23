const path = require("path"); // Path library
//Plugins
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    path: base("../dist-server"),
    filename: "main.js",
  },
  // Modules
  module: {
    rules: [
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
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          "sass-loader",
        ],
      },
      // Fonts
      {
        test: /\.(ttf|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/fonts/[name].[ext]",
              //publicPath: "/dist/fonts",
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
              //publicPath: "/dist/assets",
            },
          },
        ],
      },
    ], // End Loaders modules
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/home-dev.html'
    }),
  ],
};
