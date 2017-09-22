'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = React.createClass({
	displayName: 'BugRow',
	render: function render() {
		console.log("Rendering BugRow", this.props.bug);
		return React.createElement(
			'tr',
			null,
			React.createElement(
				'td',
				null,
				this.props.bug._id
			),
			React.createElement(
				'td',
				null,
				this.props.bug.status
			),
			React.createElement(
				'td',
				null,
				this.props.bug.priority
			),
			React.createElement(
				'td',
				null,
				this.props.bug.reporter
			),
			React.createElement(
				'td',
				null,
				this.props.bug.title
			)
		);
	}
});

var BugTable = React.createClass({
	displayName: 'BugTable',
	render: function render() {
		console.log("Rendering BugTable, rows: ", this.props.bugs.length);
		console.log(this.props.bugs[0]);
		var bugRows = this.props.bugs.map(function (bug) {
			return React.createElement(BugRow, { key: bug._id, bug: bug });
		});
		return React.createElement(
			'div',
			{ className: 'bugTable' },
			React.createElement(
				'table',
				null,
				React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'th',
							null,
							'Id'
						),
						React.createElement(
							'th',
							null,
							'Status'
						),
						React.createElement(
							'th',
							null,
							'Priority'
						),
						React.createElement(
							'th',
							null,
							'Reporter'
						),
						React.createElement(
							'th',
							null,
							'Title'
						)
					),
					bugRows
				)
			)
		);
	}
});

var BugList = React.createClass({
	displayName: 'BugList',

	getInitialState: function getInitialState() {
		return { bugs: [] };
	},

	render: function render() {
		console.log("Rendering bug list, num items: ", this.state.bugs.length);
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'Bug Tracker'
			),
			React.createElement(BugFilter),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	},

	componentDidMount: function componentDidMount() {
		var _this = this;

		console.log('mounting');
		$.ajax('/api/bugs').done(function (data) {
			console.log(data);
			console.log('done');
			_this.setState({ bugs: data });
		});
	},

	testNewBug: function testNewBug() {
		var nextId = this.state.bugs.length + 1;
		this.addBug({ id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console" });
	},

	addBug: function addBug(bug) {
		console.log("Adding bug: ", bug);
		console.log(JSON.stringify(bug));
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

module.exports = BugList;