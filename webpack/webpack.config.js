const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      'background-helper': path.resolve(__dirname, "..", "src", "background-helper.ts"),
      'config': path.resolve(__dirname, "..", "src", "config.ts"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js"
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         }
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}, {from: 'src/assets', to: 'assets'}]
      }),
      new HtmlWebpackPlugin({
         template: "src/config.html",
         inject : "body"
      })
   ],
};
