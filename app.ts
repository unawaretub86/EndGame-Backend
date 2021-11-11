var express = require("express");
var cors = require("cors");
var path = require("path");

var app = express();

var UserController = require('./modules/user/user.module')().UserController

app.use(cors());
app.user("/users", UserController);


app.get("/", function (req, res) {
    var pkg = require(path.join(__dirname, "package.json"));
    res.json({
        name: pkg.name,
        version: pkg.version,
        status: "up",
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({
      message: res.locals.message,
      error: res.locals.error,
    });
});
  
  module.exports = app;