"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bugData = [{ id: "0234", status: "active", priority: "moderate", reporter: "Mahala", title: "Broken iamge" }, { id: "0214", status: "active", priority: "low", reporter: "Pete", title: "Wonky navbar" }];

var BugFilter = function (_React$Component) {
	_inherits(BugFilter, _React$Component);

	function BugFilter() {
		_classCallCheck(this, BugFilter);

		return _possibleConstructorReturn(this, (BugFilter.__proto__ || Object.getPrototypeOf(BugFilter)).apply(this, arguments));
	}

	_createClass(BugFilter, [{
		key: "render",
		value: function render() {
			console.log("Bug filtering");
			return React.createElement(
				"div",
				null,
				"Filter stuff comin' soon."
			);
		}
	}]);

	return BugFilter;
}(React.Component);

var BugRow = function (_React$Component2) {
	_inherits(BugRow, _React$Component2);

	function BugRow() {
		_classCallCheck(this, BugRow);

		return _possibleConstructorReturn(this, (BugRow.__proto__ || Object.getPrototypeOf(BugRow)).apply(this, arguments));
	}

	_createClass(BugRow, [{
		key: "render",
		value: function render() {
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
	}]);

	return BugRow;
}(React.Component);

var BugTable = function (_React$Component3) {
	_inherits(BugTable, _React$Component3);

	function BugTable() {
		_classCallCheck(this, BugTable);

		return _possibleConstructorReturn(this, (BugTable.__proto__ || Object.getPrototypeOf(BugTable)).apply(this, arguments));
	}

	_createClass(BugTable, [{
		key: "render",
		value: function render() {
			console.log("Rendering BugTable, rows: ", this.props.bugs.length);
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
	}]);

	return BugTable;
}(React.Component);

var BugAdd = function (_React$Component4) {
	_inherits(BugAdd, _React$Component4);

	function BugAdd() {
		_classCallCheck(this, BugAdd);

		return _possibleConstructorReturn(this, (BugAdd.__proto__ || Object.getPrototypeOf(BugAdd)).apply(this, arguments));
	}

	_createClass(BugAdd, [{
		key: "render",
		value: function render() {
			console.log("Rendering BugAdd");
			return React.createElement(
				"div",
				{ className: "bugForm" },
				"bug form"
			);
		}
	}]);

	return BugAdd;
}(React.Component);

var BugTracker = function (_React$Component5) {
	_inherits(BugTracker, _React$Component5);

	function BugTracker() {
		_classCallCheck(this, BugTracker);

		var _this5 = _possibleConstructorReturn(this, (BugTracker.__proto__ || Object.getPrototypeOf(BugTracker)).call(this));

		_this5.state = {
			bugs: bugData
		};
		return _this5;
	}

	_createClass(BugTracker, [{
		key: "render",
		value: function render() {
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
				React.createElement(BugTable, { bugs: bugData }),
				React.createElement(
					"button",
					{ onClick: this.testNewBug },
					"Add Bug"
				),
				React.createElement(BugAdd, null)
			);
		}
	}]);

	return BugTracker;
}(React.Component);

function TestNewBug() {
	// var nextId = this.state.bug.length + 1;
	this.addBug({ id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console" });
}

function AddBug() {
	console.log("Adding bug: ", bug);

	var bugsModified = this.state.bugs.slice();
	bugsModified.push(bug);
	this.setState({ bugs: bugsModified });
}

ReactDOM.render(React.createElement(BugTracker, null), document.getElementById('root'));