const SentryPlugin = require('webpack-sentry-plugin')

module.exports = {
  baseUrl: './',
  configureWebpack: {
    plugins: [
      new SentryPlugin({
        organization: 'fe-org',
        project: 'popcorn-vue',
        apiKey: '17c7d61a800f495c803196e2c02cadeb1b41454247db4f06a5c54193510da150',
        release: '1.2.4-beta'
		  })
    ]
  }
}
