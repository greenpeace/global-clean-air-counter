const fs = require('fs')

module.exports = {
  publicPath: '',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = {
        'vue': 'Vue',
      },
      config.optimization = {
        splitChunks: false
      }
    }
  },
  filenameHashing: false,
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
  // devServer: {
  //   disableHostCheck: true,    
  //   https: true,
  //   port: 80,
  //   host: "greenpeace.org"
  // }
}
