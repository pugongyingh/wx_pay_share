const path = require('path') // 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir) // path.join(__dirname)设置绝对路径
}
module.exports = {
  lintOnSave: false, // 是否开启eslint
  outputDir: process.env.outputDir, // build输出目录
  chainWebpack: config => {
    config.resolve.alias
      // set第一个参数：设置的别名，第二个参数：设置的路径
      .set('@', resolve('./src'))
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  css: {
    extract: false
  },
  devServer: {
    host: 'm.imooc.com',
    open: false, // 是否自动弹出浏览器页面
    // host: 'localhost',
    port: '80',
    https: false, // 是否使用https协议
    hotOnly: true, // 是否开启热更新
    proxy: {
      /**
       * changeOrigin:true
       * /api/test
       * http://localhost:5000/test
       * changeOrigin:false
       * /api/test
       * http://localhost:5000/api/test
       */
      '/api': {
        // 设置目标API地址
        target: 'http://localhost:3000',
        // 如果要代理 websockets
        ws: false,
        // 将主机标头的原点改为目标URL
        changeOrigin: false
      }
    }
  }
}
