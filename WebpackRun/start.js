"use strict";
//"start": "webpack-dev-server --config webpackConfig/webpack.dev.config.js --color --progress --hot",
require("./check-versions")();

const path = require("path");
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const utils = require("../webpackConfig/utils");
const config = require("../webpackConfig/index");
console.log("process.env:", process.env);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const HOST = process.env.HOST || config.dev.host;
const PORT = Number(process.env.PORT) || config.dev.port;

const ora = require("ora");
const devWebpackConfig = require("../webpackConfig/webpack.dev.config");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// Add FriendlyErrorsPlugin
devWebpackConfig.plugins.push(
  new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [`Your application is running here: http://${HOST}:${PORT}`],
    },
    onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined,
  })
);

const compiler = Webpack(devWebpackConfig);
const devServerConfig = Object.assign({}, devWebpackConfig.devServer, {
  // open: true,
  hot: true,
  // lazy: true,

  /** inline模式：向网页中注入代理客户端代码，通过客户端发起刷新。向每个chunk中都注入客户端代码，当要输出很多chunk，会导致构建变慢。
   * 关闭inline模式减少构建时间。
   **/
  inline: true,
  // config:
  progress: true,
  stats: {
    // timings: true,
    // version: true,
    // warnings: true,
    colors: true,
    entrypoints: false,
    children: false,
  },
});

const devServer = new WebpackDevServer(compiler, devServerConfig);
// const portfinder = require('portfinder')

const spinner = ora("starting for development...");
spinner.start();
// Launch WebpackDevServer.
devServer.listen(PORT, HOST, (err) => {
  if (err) throw err;
  console.log("devWebpackConfig:", devWebpackConfig);
  spinner.stop();
});

["SIGINT", "SIGTERM"].forEach(function (sig) {
  process.on(sig, function () {
    devServer.close();
    process.exit();
  });
});
