const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require('morgan');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

// DATABASE
mongoose.Promise = global.Promise;
//var basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const dbConfig    = require('./config/database.config.json')[env];

mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    console.log(dbConfig);
    process.exit();
});
// END DATABASE

// Logger and BodyParser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
// ALSO SERVE THE CLIENT
// BUT WHY?
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
*/

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });
// END CORS

// ROUTES

var escuelaRouter = require('./routes/escuelaRoutes');
app.use('/escuela', escuelaRouter);

// END ROUTES

// ROUTES ERROR HANDLER

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    //console.log(req);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.json({ message: err.message });
  });

// END ROUTES ERROR HANDLER

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});