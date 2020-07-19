// 1. start the dev server using production config
// e2e的运用场景就是：上线久、业务稳、体量大的项目（千万不要在刚启动或迭代很快的项目上e2e）
process.env.NODE_ENV = 'testing'

const webpack = require('webpack')
const DevServer = require('webpack-dev-server')

const webpackConfig = require('../../WebpackConfig/webpack.prod.config')
const devConfigPromise = require('../../WebpackConfig/webpack.dev.config')

let server

devConfigPromise.then(devConfig => {
  const devServerOptions = devConfig.devServer
  const compiler = webpack(webpackConfig)
  server = new DevServer(compiler, devServerOptions)
  const port = devServerOptions.port
  const host = devServerOptions.host
  return server.listen(port, host)
})
.then(() => {
  // 2. run the nightwatch test suite against it
  // to run in additional browsers:
  //    1. add an entry in test/e2e/nightwatch.conf.js under "test_settings"
  //    2. add it to the --env flag below
  // or override the environment flag, for example: `npm run e2e -- --env chrome,firefox`
  // For more information on Nightwatch's config file, see
  // http://nightwatchjs.org/guide#settings-file
  let opts = process.argv.slice(2)
  if (opts.indexOf('--config') === -1) {
    opts = opts.concat(['--config', 'test/e2e/nightmare.conf.js'])
  }
  if (opts.indexOf('--env') === -1) {
    opts = opts.concat(['--env', 'chrome'])
  }

  const spawn = require('cross-spawn')
  const runner = spawn('nightmare', opts, { stdio: 'inherit' })

  runner.on('exit', function (code) {
    server.close()
    process.exit(code)
  })

  runner.on('error', function (err) {
    server.close()
    throw err
  })
})
