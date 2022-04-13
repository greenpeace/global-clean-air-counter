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
}
