const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // webpack代理功能
  devServer: {
    proxy: {
      // 当地址中有/api时会触发代理
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true // 是否跨域
      }
    }
  },
  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
