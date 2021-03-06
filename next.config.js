const glob = require('glob');
const path = require('path');

module.exports = {
  webpack: function (config) {
    config.externals = config.externals || {};
    config.externals['styletron-server'] = 'styletron-server';

    config.module.rules.push({
      test: /\.(css|scss)/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]'
      }
    }, {
      test: /\.css$/,
      use: ['babel-loader', 'raw-loader', 'postcss-loader']
    }, {
      test: /\.s(a|c)ss$/,
      use: [
        'babel-loader',
        'raw-loader',
        'postcss-loader', {
          loader: 'sass-loader',
          options: {
            includePaths: ['styles/*']
              .map((d) => path.join(__dirname, d))
              .map((g) => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }
        }
      ]
    });

    return config;
  }
}
