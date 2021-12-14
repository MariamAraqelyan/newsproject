const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const config = require('./config.json');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ['en']
    }),
    new webpack.DefinePlugin({
      __CONFIG__: JSON.stringify(config)
    })
  ]
};
