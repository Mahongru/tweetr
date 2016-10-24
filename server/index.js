"use strict";

const PORT        = 8080;
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

//The server needs these two files
const requireTweetsAPI   = require('./api/tweets');
const db          = require('./lib/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Here we are calling dbLib export (which in this case is an object that has a
// property called 'connect' that holds a function inside of it)
// a callback is passed inside our function, it is waiting for 'dbInstance'
// which is fetched form db. then uses the results and passes it to tweets API.
// so connect > callback > wait for dbInstance > gets dbInstance >
// the function runs > calls tweetsAPI > passes dbInstance > 
db.connect((dbInstance) => {
  app.use('/tweets', requireTweetsAPI(dbInstance));

  // Jeremy moved this out of perfectionism
  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});






//
// // "use strict";
//
// const PORT        = 8080;
// const express     = require("express");
// const bodyParser  = require("body-parser");
// const app         = express();
//
// const tweetsApi  = require('./api/tweets');
// const db         = require('./lib/db');
//
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));
//
// db.connect((dbInstance) => {
//   app.use('/tweets', tweetsApi(dbInstance));
// });
//
//
// app.listen(PORT, () => {
//   console.log("Example app listening on port " + PORT);
// });
