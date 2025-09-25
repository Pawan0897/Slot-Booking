var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const AdminRoute = require("./routes/admin.route")
const UserSlotRoute = require("./routes/userslot.route");
const { db_connection } = require('./db_connection/db');
const cors = require("cors");
// const { log } = require('console');/
var app = express();

app.use(cors())
// ********************* Database Connected !!!
db_connection();

// check data change -----------
// const change = db_connection.collection("slotadmin")

// change.on("change", (change) => {
//   console.log(change);

// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
const PORT = 2000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// ******************************************


app.use("/user", UserSlotRoute)
app.use("/admin", AdminRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');






});
app.listen(PORT, () => {
  console.log(`Port is Running ${PORT}`);

})

module.exports = app;


