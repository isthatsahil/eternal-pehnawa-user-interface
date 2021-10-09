module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: false,
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
};
