var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList');
var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var Redirect = require('react-router-dom').Redirect;
var BugEdit = require('./BugEdit');

var NoMatch = React.createClass({
	render: function(){
		return(
			<h2>No match for the route.</h2>
		);
	}
})



ReactDOM.render(
	(
		<Router>
			<div>
				<Route path="/bugs" component={BugList} />
				<Route path="/bugs/:id" component={BugEdit} />
				<Redirect from="/" to="/bugs" />
				<Route path="*" component={NoMatch} />
			</div>
		</Router>
	),



	document.getElementById('root')
);