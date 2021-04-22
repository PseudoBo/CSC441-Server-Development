const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

function createWebpackMiddleware(compiler, publicPath) {
  console.log('createWebpackMiddleware:publicPath: ', publicPath)
  stats = {
    // lets you precisely control what bundle information gets displayed
    preset: "errors-only",
    // A stats preset

    /* Advanced global settings (click to show) */

    env: true,
    // include value of --env in the output
    outputPath: true,
    // include absolute output path in the output
    publicPath: true,
    // include public path in the output

    assets: true,
    // show list of assets iin output
    /* Advanced assets settings (click to show) */

    entrypoints: true,
    // show entrypoints list
    // chunkGroups: true,
    // show named chung group list
    /* Advanced chunk group settings (click to show) */

    chunks: true,
    // show list of chunks in output
    /* Advanced chunk group settings (click to show) */

    // modules: true,
    // show list of modules in output
    /* Advanced module settings (click to show) */
    /* Expert module settings (click to show) */

    /* Advanced optimization settings (click to show) */

    // children: true,
    // show stats for child compilations

    // logging: true,
    // show logging in output
    // loggingDebug: /webpack/,
    // show debug type logging for some loggers
    // loggingTrace: true,
    // show stack traces for warnings and errors in logging output

    warnings: true,
    // show warnings
    
    errors: true,
    // show errors
    // errorDetails: true,
    // show details for errors
    // errorStack: true,
    // show internal stack trace for errors
    // moduleTrace: true,
    // show module trace for errors
    // (why was causing module referenced)

    // builtAt: true,
    // show timestamp in summary
    //errorsCount: true,
    // show warnings count in summary
    // timings: true,
    // show build timing in summary
    // version: true,
    // show webpack version in summary
    // hash: true,
    // show build hash in summary
  }
  return webpackDevMiddleware(compiler, {
    // logLevel: 'warn',
  publicPath,
// silent: true,
stats/*: 'errors-only',*/
  });
}

module.exports = function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath,
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  // const fs = middleware.fileSystem;
  let fs = middleware.context.outputFileSystem;
  return fs;
  // app.get('*', (req, res) => {
  //   fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
  //     if (err) {
  //       res.sendStatus(404);
  //     } else {
  //       res.send(file.toString());
  //     }
  //   });
  // });
};
