let sessionId
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
  // 打包名
  outputDir: 'dist',
  // 压缩图片
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      if (isNeedCdn) {
        config.plugin('html')
        .tap(args => {
            args[0].cdn = cdn;
          return args;
        })
      }
  },
  baseUrl: '',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin false为 自动更新css样式 用于开发
    extract: process.env.NODE_ENV === 'development' ? false : true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  runtimeCompiler: true,
  configureWebpack: config => {
      const optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "js/vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100,
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "js/common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true,
            },
            runtimeChunk: {
              name: 'js/manifest'
            }
          }
        }
      }
      config.optimization = optimization
  },
  /*
  *  开发环境代理配置
  * */
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.221.159.100:80/falcon-controller',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        },
        cookieDomainRewrite: 'localhost',
        onProxyReq: function (proxyReq, req, res) {
          if (sessionId) {
            proxyReq.setHeader('Cookie', sessionId)
          }
        },
        onProxyRes: function (proxyRes, req, res) {
          let existingCookies = proxyRes.headers['set-cookie'],
            rewrittenCookies = []
          if (existingCookies !== undefined) {
            if (!Array.isArray(existingCookies)) {
              existingCookies = [existingCookies]
            }
            for (let i = 0; i < existingCookies.length; i++) {
              if (existingCookies[i].indexOf('Path=/falcon-controller') !== -1) {
                sessionId = existingCookies[i]
              }
              rewrittenCookies.push(existingCookies[i].replace(/;\s*?(Secure)/i, ''))
            }
            proxyRes.headers['set-cookie'] = rewrittenCookies
          }
        }
      }
    },
  },

  pluginOptions: {}
}
