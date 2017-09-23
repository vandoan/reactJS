'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var BugEdit = React.createClass({
	displayName: 'BugEdit',

	render: function render() {
		return React.createElement(
			'div',
			null,
			'Edit bug: ',
			this.props.params.id,
			React.createElement('br', null),
			React.createElement(
				'form',
				{ onSubmit: this.submit },
				'Priortity:',
				React.createElement(
					'select',
					{ name: 'priority', value: this.state.priority,
						onChange: this.onChangePriority },
					React.createElement(
						'option',
						{ value: 'P1' },
						'P1'
					),
					React.createElement(
						'option',
						{ value: 'P2' },
						'P2'
					),
					React.createElement(
						'option',
						{ value: 'P3' },
						'P3'
					)
				),
				React.createElement('br', null),
				React.createElement(
					'select',
					{ value: this.state.status,
						onChange: this.onChangeStatus },
					React.createElement(
						'option',
						null,
						'New'
					),
					React.createElement(
						'option',
						null,
						'Open'
					),
					React.createElement(
						'option',
						null,
						'Fixed'
					),
					React.createElement(
						'option',
						null,
						'Closed'
					)
				),
				React.createElement('br', null),
				'Reporter:',
				React.createElement('input', { type: 'text',
					value: this.state.owner,
					onChange: this.onChangeReporter }),
				'Title: ',
				React.createElement('input', { type: 'text',
					value: this.state.title,
					onChange: this.onChangeTitle }),
				React.createElement('br', null),
				React.createElement(
					'button',
					{ type: 'submit' },
					'Submit'
				),
				React.createElement(
					Link,
					{ to: '/bugs' },
					'Back to bug list'
				)
			)
		);
	},

	getInitialState: function getInitialState() {
		return {};
	},

	componentDidMount: function componentDidMount() {
		this.loadData();
	},

	componentDidUpdate: function componentDidUpdate(prevProps) {
		console.log("BugEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
		if (this.props.params.id != prevProps.params.id) {
			this.loadData();
		}
	},

	loadData: function loadData() {
		$.ajax('/api/bugs/' + this.props.params.id).done(function (bug) {
			console.log("BugEdit, loadData for", bug);
			this.setState(bug);
		});
	},

	onChangePriority: function onChangePriority(e) {
		this.setState({ priority: e.target.value });
	},

	onChangeStatus: function onChangeStatus(e) {
		this.setState({ status: e.target.value });
	},

	onChangeReporter: function onChangeReporter(e) {
		this.setState({ reporter: e.target.value });
	},

	onChangeTitle: function onChangeTitle(e) {
		this.setState({ title: e.target.value });
	},

	submit: function submit(e) {
		e.preventDefault();
		var bug = {
			status: this.state.status,
			priority: this.state.priority,
			reporter: this.state.reporter,
			title: this.state.title
		};

		$.ajax({
			url: '/api/bugs/' + this.props.params.id,
			type: 'PUT',
			contentType: 'application/json',
			dataType: 'json',
			success: function success(bug) {
				this.setState(bug);
			}
		});
	}
});

module.exports = BugEdit;