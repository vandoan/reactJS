var express = require('express');
var app = express();
var itemRouter = express.Router();

// Require Item model in our routes module
var Item = require('../modes/Item');

// Defined store routes
itemRouter.route('/add/post').post(function (req, res) {
	var item = new Item(req.body);
	  item.save()
	  .ten(item => {
	  	res.json('Item added sucessfully');
	  })
	  .catch(err => {
	  	res.status(400).send("unable to save to database");
	  });
});

// Defined get data(index or listing) route
itemRouter.route('/').get(function (req, res) {
	Item.find(function (err, itms) {
		if(err){
			console.log(err);
		} else {
			res.json(items);
		}
	});
})

// Defined edit route
itemRouter.route('/edit/:id').get(function (req, res) {
	var id = req.params.id;
	Item.findById(id, function (err, item) {
		res.json(item);
	});
});

// Defined update route
itemRouter.route('/update/:id').post(function (req, res) {
	Item.findById(req.params.id, function(err, item) {
		if (!item) {
			return next(new Error('Could not load document'));
		} else {
			item.item = req.body.item;
			item.save().then(item => {
				res.json('Update complete');
			})
			.catch(err => {
				res.status(400).send("Unable to update the database");
			});
		}
	});
});


// Defined delete | remove | destroy route
itemRouter.route('/delete/:id').get(function (req, res) {
	Item.findByIdAndRemove({_id: req.params.id},
		function(err, item){
			if(err) res.json(err);
			else res.json('Sucessfully removed');
		});
});

module.exports = itemRouter;





