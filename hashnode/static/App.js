"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var BugFilter = React.createClass({
	displayName: "BugFilter",
	render: function render() {
		console.log("Bug filtering");
		return React.createElement(
			"div",
			null,
			"Filter stuff comin' soon."
		);
	}
});

var BugRow = React.createClass({
	displayName: "BugRow",
	render: function render() {
		console.log("Rendering BugRow", this.props.bug);
		return React.createElement(
			"tr",
			null,
			React.createElement(
				"td",
				null,
				this.props.bug.id
			),
			React.createElement(
				"td",
				null,
				this.props.bug.status
			),
			React.createElement(
				"td",
				null,
				this.props.bug.priority
			),
			React.createElement(
				"td",
				null,
				this.props.bug.reporter
			),
			React.createElement(
				"td",
				null,
				this.props.bug.title
			)
		);
	}
});

var BugTable = React.createClass({
	displayName: "BugTable",
	render: function render() {
		console.log("Rendering BugTable, rows: ", this.props.bugs.length);
		console.log(this.props.bugs[0]);
		var bugRows = this.props.bugs.map(function (bug) {
			return React.createElement(BugRow, { key: bug.id, bug: bug });
		});
		return React.createElement(
			"div",
			{ className: "bugTable" },
			React.createElement(
				"table",
				null,
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"Id"
						),
						React.createElement(
							"th",
							null,
							"Status"
						),
						React.createElement(
							"th",
							null,
							"Priority"
						),
						React.createElement(
							"th",
							null,
							"Reporter"
						),
						React.createElement(
							"th",
							null,
							"Title"
						)
					),
					bugRows
				)
			)
		);
	}
});

var BugAdd = React.createClass({
	displayName: "BugAdd",
	render: function render() {
		console.log("Rendering BugAdd");
		return React.createElement(
			"form",
			{ name: "bugForm" },
			React.createElement(
				"tr",
				null,
				React.createElement(
					"th",
					null,
					"Reporter"
				),
				React.createElement(
					"th",
					null,
					"Title"
				)
			),
			React.createElement(
				"tr",
				null,
				React.createElement(
					"td",
					null,
					React.createElement("input", { name: "reporter" })
				),
				React.createElement(
					"td",
					null,
					React.createElement("input", { name: "title" })
				)
			),
			React.createElement(
				"button",
				{ onClick: this.bugSubmit },
				"Submit bug"
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

var BugList = React.createClass({
	displayName: "BugList",

	getInitialState: function getInitialState() {
		return { bugs: [] };
	},

	render: function render() {
		console.log("Rendering bug list, num items: ", this.state.bugs.length);
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h1",
				null,
				"Bug Tracker"
			),
			React.createElement(BugFilter, null),
			React.createElement(BugTable, { bugs: this.state.bugs }),
			React.createElement(
				"button",
				{ onClick: this.testNewBug },
				"Add Bug"
			),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	},

	componentDidMount: function componentDidMount() {
		console.log('mounting');
		$.ajax('/api/bugs').done(function (data) {
			console.log('type ' + (typeof data === "undefined" ? "undefined" : _typeof(data)));
			console.log('done');
			this.setState({ bugs: JSON.parse(data) });
		}.bind(this));
	},

	testNewBug: function testNewBug() {
		var nextId = this.state.bugs.length + 1;
		this.addBug({ id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console" });
	},

	addBug: function addBug(bug) {
		console.log("Adding bug: ", bug);
		bug.id = this.state.bugs.length + 1;

		var bugsModified = this.state.bugs.slice();
		bugsModified.push(bug);
		this.setState({ bugs: bugsModified });
	}

});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('root'));