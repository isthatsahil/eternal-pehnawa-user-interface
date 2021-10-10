const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, envConfig);
  return config;
};
