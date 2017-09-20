var MongoClient = require('mongodb').MongoClient

// var URL = 'mongodb://localhost:27017/mydatabase'
var URL = 'mongodb://localhost:27017/bugsdb'

MongoClient.connect(URL, function(err, db) {
  if (err) return
  	var list = [];
  var collection = db.collection('bugs')
//console.log(db.collection('bugs').find())

	collection.find().toArray(function(err, docs) {
	    	console.log(docs)
	      	db.close();  
	});
	
  // collection.insert({name: 'taco', tasty: true}, function(err, result) {
  //   collection.find({name: 'taco'}).toArray(function(err, docs) {
  //     console.log(docs[0])
  //     db.close()
  //   })
  // })
})