const path = require("path"); // Path library
//Plugins
const autoprefixer = require("autoprefixer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Contstants
const base = (pathToFile) => path.resolve(__dirname, pathToFile);
const glob = require("glob"); // Require for Purge
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = {
  //Base
  mode: "production",
  entry: base("../src/index.js"),
  output: {
    path: base("../dist-prod"),
    filename: "custom-prod.js",
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
            },
          },
        ],
      },
      //Sass
      {
        test: /\.(sa|sc|c)ss$/,
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
              publicPath: "/curso-wp/wp-content/themes/laletheme/dist-prod",
            },
          },
        ],
      },
      // Fonts, Images, Video
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/[name].[ext]",
              publicPath: "/curso-wp/wp-content/themes/laletheme/dist-prod",
            },
          },
        ],
      },
      // end Loaders
    ],
  },
  // Plugins
  plugins: [
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/*.php`, { nodir: true }),
    }),
  ],
  // Optimization
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
		  map: {
			  inline: false,
			  annotation: true,
		  },
	  }),
    ],
  },
};
