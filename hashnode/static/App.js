'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList');
var Router = require('react-router-dom').HashRouter;
var Route = require('react-router-dom').Route;
var Redirect = require('react-router-dom').Redirect;
var BugEdit = require('./BugEdit');

var NoMatch = React.createClass({
	displayName: 'NoMatch',

	render: function render() {
		return React.createElement(
			'h2',
			null,
			'No match for the route.'
		);
	}
});

ReactDOM.render(React.createElement(
	Router,
	null,
	React.createElement(
		'div',
		null,
		React.createElement(Route, { path: '/bugs', component: BugList }),
		React.createElement(Route, { path: '/bugs/:id', component: BugEdit }),
		React.createElement(Redirect, { from: '/', to: '/bugs' }),
		React.createElement(Route, { path: '*', component: NoMatch })
	)
), document.getElementById('root'));