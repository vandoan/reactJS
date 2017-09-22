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
			React.createElement(
				'select',
				{ name: 'status' },
				React.createElement(
					'option',
					{ value: '' },
					'Select'
				),
				React.createElement(
					'option',
					{ value: 'open' },
					'Open'
				),
				React.createElement(
					'option',
					{ value: 'close' },
					'Close'
				)
			),
			React.createElement(
				'button',
				{ onClick: this.filterBug },
				'Apply'
			)
		);
	},


	filterBug: function filterBug(filters) {
		console.log("filter");
		console.log(select.status.value);
		$.ajax({
			type: 'POST',
			url: '/api/bugs',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(bug),
			success: function (data) {
				var bug = data;
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsModified });
			}.bind(this),
			error: function error(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	}

});

module.exports = BugFilter;