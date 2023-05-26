const HTMLWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const configUtil = require('./configUtil');
const { federationConfig } = require("./federation.config");

console.log("Federation config", federationConfig);

const config = {
  mode: configUtil.buildStage === "prod" ? 'production' : 'development',
  output: {
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      }
    ]
  },
  
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'async'
        }
      }
    }
  },

  plugins: [
    new LodashModuleReplacementPlugin,
    new MiniCssExtractPlugin(),
    new ModuleFederationPlugin({
      ...federationConfig
    }),
    new HTMLWebpackPlugin({
      template: './public/index.html'
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: configUtil.devPort,
    host: configUtil.devHost,
    allowedHosts: "all",
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  },
  performance: {
    hints: false
  }
};

module.exports = config;