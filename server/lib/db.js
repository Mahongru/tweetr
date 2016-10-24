"use strict";

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/tweeter';

module.exports = {
  //this function takes a 'onConnect' callback
  connect: function(onConnect){
    //Standard protocol for conneting to mongoDB
    MongoClient.connect(MONGODB_URI, (err, rawDbConnection) => {
      //error handling in case the database returns an error
      if (err) {
        console.log("OH MY GOD, DB couldn't connect");
        throw err;
      } else {
      // if connects, here's what i want you to do mongo!
        const dbMethods = {
          saveTweet: (data) => {
            rawDbConnection.collection('tweets').save(data);
          },
          getTweets: (callback) => {
            console.log("in DB.getTweets");
            rawDbConnection.collection('tweets').find().toArray(callback);
          }
        }

        onConnect(dbMethods);
      }
    })
  }
}






// console.log('Connecting to Mongo DB running at: ${MONGODB_URI}');

// MongoClient.connect(MONGODB_URI, (err, db) => {

//   if(err) {
//     console.log('Could not connect! Unexpected error. Details below.');
//   }

//   console.log('Connected to the database!');
//   let collection = db.collection('tweets');

//   console.log('Retrieving documents for the "tweets" collection...');
//   collection.find().toArray((err, results) => {
//     console.log('results: ', results);

//     console.log('Disconnecting from Mongo!');
//     db.close();
//   });
// });
