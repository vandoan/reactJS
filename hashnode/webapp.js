const express = require('express');
var MongoClient = require('mongodb').MongoClient;

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
const app = express();
var db;
var bodyParser = require('body-parser');

// const bugData = [
// 	{"id": "0234", "status": "active", "priority": "moderate", "reporter": "Mahala", "title": "Broken iamge"},
// 	{"id": "0214", "status": "active", "priority": "low", "reporter": "Pete", "title": "Wonky navbar"}
// ];

app.use(express.static('static'));
app.use(bodyParser.json());

app.post("/api/bugs/", function(req, res){
	console.log(req.body);
	console.log(req.params);
	var collection = db.collection('bugs');
	// console.log('Req: ', req);
	// console.log('Params: ', req.params);
	// console.log('Req body:', req.body);
	var newBug = req.body;

	collection.insertOne(newBug, (err, result) => {
		console.log(newBug);
		let newId = result.insertedId;
		collection.find({_id: newId}).next((err,doc) => {
			res.json(doc);
		})
	});	

});

app.get('/api/bugs', function(req, res) {
	console.log(req.params);
	var collection = db.collection('bugs');
	collection.find().toArray(function(err, docs) {
	    	bugs = res.json(docs);
	    	// console.log(docs);
	      	// db.close();  
	});
});



var URL = 'mongodb://localhost:27017/bugsdb'
MongoClient.connect(URL, 
	function(err, dbConnection) {
 		db = dbConnection;
 		var collection = db.collection('foods')
 		// console.log(db.bugs);
 		var server = app.listen(3000, function() {
			var port = server.address().port;		
			  console.log("Started server at port", port);
	});
});		 
