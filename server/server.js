const express = require("express");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const passport = require("passport");
const config = require("../config/config");
const webpackConfig = require("../webpack.config");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// API routes
require("./routes")(app);
// require("./routes/Passport/Passport")(passport);

// var store = new MongoDBStore({
//   uri: isDev ? config.db_dev : config.db,
//   collection: "mySessions",
// });

// Catch errors
// store.on("error", function (error) {
//   console.log(error);
// });

// app.use(
//   session({
//     secret: "IAS/IPS",
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
//       // maxAge: 1000 * 60,
//     },
//     store: store,
//     // Boilerplate options, see:
//     // * https://www.npmjs.com/package/express-session#resave
//     // * https://www.npmjs.com/package/express-session#saveuninitialized
//     resave: true,
//     saveUninitialized: true,
//   })
// );

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false,
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }
  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});

module.exports = app;
