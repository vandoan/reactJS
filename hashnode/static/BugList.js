'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');
var Link = require('react-router-dom').Link;
var QueryString = require('query-string');

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
				React.createElement(
					Link,
					{ to: '/bugs/' + this.props.bug._id },
					this.props.bug._id
				)
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
			React.createElement(BugFilter, { submitHandler: this.changeFilter, initFilter: this.props.location.search }),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	},

	componentDidMount: function componentDidMount() {
		console.log("BugList: componentDid");
		this.loadData({});
		// $.ajax('/api/bugs').done((data) => {
		// 	console.log(data);
		// 	console.log('done');
		// 	this.setState({bugs: data});
		// });
	},

	componentDidUpdate: function componentDidUpdate(prevProps) {
		var oldQuery = QueryString.parse(prevProps.location.search);
		var newQuery = QueryString.parse(this.props.location.query);

		if (oldQuery.status === newQuery.status) {
			console.log("BugList: componentDidUpdate, no change in filter, not updating");
			return;
		} else {
			console.log("BugList: compoenentDidUpate, loading with new filter");
			this.loadData();
		}
	},

	changeFilter: function changeFilter(newFilter) {
		this.props.history.push({ search: '?' + $.param(newFilter) });
		this.loadFitler(newFitler);
	},

	loadData: function loadData(filter) {
		var _this = this;

		var query = QueryString.parse(this.props.location.search) || {};
		var filter = { priority: query.priority, status: query.status };

		$.ajax('/api/bugs', { data: filter }).done(function (data) {
			console.log('UPDATED', data);
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
			success: function success(data) {
				var bug = data;
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsModified });
			},
			error: function error(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	}

});

module.exports = BugList;