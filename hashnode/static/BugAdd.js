'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var BugAdd = React.createClass({
	displayName: 'BugAdd',
	render: function render() {
		console.log("Rendering BugAdd");
		return React.createElement(
			'form',
			{ name: 'bugForm' },
			React.createElement(
				'tr',
				null,
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
			React.createElement(
				'tr',
				null,
				React.createElement(
					'td',
					null,
					React.createElement('input', { name: 'reporter' })
				),
				React.createElement(
					'td',
					null,
					React.createElement('input', { name: 'title' })
				)
			),
			React.createElement(
				'button',
				{ onClick: this.bugSubmit },
				'Submit bug'
			)
		);
	},


	bugSubmit: function bugSubmit(e) {
		console.log("Submit bug");
		e.preventDefault();
		var form = document.forms.bugForm;

		this.props.addBug({
			status: "new",
			priority: "new",
			reporter: form.reporter.value,
			title: form.title.value
		});

		// Clear form
		form.reporter.value = "";
		form.title.value = "";
	}

});

Module.export = BugAdd;