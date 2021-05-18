require('dotenv').config()
var withSass = require('@zeit/next-sass')
var withCss = require('@zeit/next-css')
var path = require('path')
var Dotenv = require('dotenv-webpack')

const bundleAnalyzer = require('@next/bundle-analyzer')({
  analyzerMode: 'static',
  enabled: process.env.ANALYZE === 'true',
  generateStatsFile: true,
  statsOptions: { source: false }
});

const customConfig = bundleAnalyzer(withSass(
  withCss({
    webpack: function (config) {
      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            publicPath: '/_next/static/',
            outputPath: 'static/',
            name: '[name].[ext]'
          }
        }
      })

      config.plugins = config.plugins || []
      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ]

      Object.assign(config.resolve.alias, {
        components: path.resolve(__dirname, 'components/'),
        assets: path.resolve(__dirname, 'assets/'),
        '~': path.resolve(__dirname)
      })

      return config
    }
  })
));

module.exports = Object.assign({}, customConfig);
