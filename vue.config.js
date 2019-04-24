module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/resources/html/app/mobile/' : '/',
  devServer: {
    disableHostCheck: true
  }
}
