module.exports = {
  devServer: {
    proxy: {
      '': {
        target: 'http://localhost:3100',
        changeOrigin: true
      },
    }
  }
}
