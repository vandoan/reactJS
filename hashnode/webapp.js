const express = require('express');
var MongoClient = require('mongodb').MongoClient;
const app = express();
var db;
var bodyParser = require('body-parser');

const bugData = [
	{"id": "0234", "status": "active", "priority": "moderate", "reporter": "Mahala", "title": "Broken iamge"},
	{"id": "0214", "status": "active", "priority": "low", "reporter": "Pete", "title": "Wonky navbar"}
];

app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/bugs', function(req, res) {
	
	var collection = db.collection('bugs');
	collection.find().toArray(function(err, docs) {
	    	res.json(docs);
	    	console.log(docs);
	      	// db.close();  
	});	
});

app.post("/api/bugs/", function(req, res){
	console.log('Req body:', req.body);
	var newBug = req.body;
	newBug.id = bugData.length + 1;
	bugData.push(newBug);
	res.join(newBug);
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
