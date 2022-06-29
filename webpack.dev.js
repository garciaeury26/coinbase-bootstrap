const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");

const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`;
};

module.exports = merge(common, {
  mode: "development",
  stats: "errors-warnings",
  infrastructureLogging: {
    level: "warn",
  },
  devServer: {
    host: "local-ip",
    port: portFinderSync.getPort(8080),
    open: true,
    https: false,
    allowedHosts: "all",
    hot: true,
    watchFiles: ["src/**/*"],
    client: {
      logging: "none",
      overlay: true,
      progress: false,
    },
    setupMiddlewares: function (middlewares, devServer) {
      console.log("--------------------");
      const port = devServer.options.port;
      const https = devServer.options.https ? "s" : "";
      const domain1 = `http${https}://${devServer.options.host}:${port}`;
      const domain2 = `http${https}://localhost:${port}`;
      console.log(
        `Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(
          domain2
        )}`
      );
      return middlewares;
    },
  },
});
