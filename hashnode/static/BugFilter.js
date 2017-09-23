'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var QueryString = require('query-string');

var BugFilter = React.createClass({
	displayName: 'BugFilter',
	render: function render() {
		console.log("Rendering BugFilter, state=", this.state);
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h3',
				null,
				'Filter'
			),
			'Status:',
			React.createElement(
				'select',
				{ value: this.state.status, onChange: this.onChangeStatus },
				React.createElement(
					'option',
					{ value: '' },
					'Select'
				),
				React.createElement(
					'option',
					{ value: 'New' },
					'New'
				),
				React.createElement(
					'option',
					{ value: 'Open' },
					'Open'
				),
				React.createElement(
					'option',
					{ value: 'Closed' },
					'Close'
				)
			),
			React.createElement('br', null),
			React.createElement(
				'select',
				{
					value: this.state.priority,
					onChange: this.onChangePriority },
				React.createElement(
					'option',
					{ value: '' },
					'Select'
				),
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
				'button',
				{ onClick: this.submit },
				'Apply'
			)
		);
	},


	componentWillReciveProps: function componentWillReciveProps(newProps) {
		if (newProps.initFilter.status === this.state.status && newProps.initFilter.priority === this.state.priority) {
			console.log("BugFilter: componentWillRecieveProps, no change");
			return;
		}
		console.log("BugFilter: componentWillRecieveProps, new filter:", newProps.initFilter);
		this.setState({ status: newProps.initFilter.status, priority: newProps.initFilter.priority });
	},

	getInitialState: function getInitialState() {
		var initFilter = QueryString.parse(this.props.initFilter);
		console.log('initFilter', initFilter);
		return { status: initFilter.status, priority: initFilter.priority };
	},

	onChangeStatus: function onChangeStatus(e) {
		this.setState({ status: e.target.value });
	},

	onChangePriority: function onChangePriority(e) {
		this.setState({ priority: e.target.value });
	},

	submit: function submit(e) {
		var newFilter = {};
		if (this.state.priority) newFilter.priority = this.state.priority;
		if (this.state.status) newFilter.status = this.state.status;
		this.props.submitHandler(newFilter);
	}

});

module.exports = BugFilter;