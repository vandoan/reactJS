'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
	displayName: 'BugFilter',
	render: function render() {
		console.log("Bug filtering");
		return React.createElement(
			'div',
			null,
			'Filter stuff comin\' soon.'
		);
	}
});

module.export = BugFilter;