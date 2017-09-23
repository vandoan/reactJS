var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');
var Link = require('react-router-dom').Link;
const QueryString = require('query-string');


var BugRow = React.createClass({
	render() {
		console.log("Rendering BugRow", this.props.bug);
		return (
			<tr>
				<td><Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link></td>
				<td>{this.props.bug.status}</td>
				<td>{this.props.bug.priority}</td>
				<td>{this.props.bug.reporter}</td>
				<td>{this.props.bug.title}</td>
			</tr>
		)
	}
});

var BugTable = React.createClass({
 
	render() {
		console.log("Rendering BugTable, rows: ", this.props.bugs.length);
		console.log(this.props.bugs[0]);
		const bugRows = this.props.bugs.map((bug) => 
			<BugRow key={bug._id} bug={bug} />
		);
 		return (
			<div className="bugTable">
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Status</th>
							<th>Priority</th>
							<th>Reporter</th>
							<th>Title</th>
						</tr>
						{bugRows}
					</thead>
				</table>
			</div>
		);
	}
});


var BugList = React.createClass({
 	getInitialState: function(){
 		return {bugs: []};
 	},

	render: function() {
		console.log("Rendering bug list, num items: ", this.state.bugs.length);
		return (
 			<div>
				<h1>Bug Tracker</h1>
				<BugFilter submitHandler={this.changeFilter} initFilter={this.props.location.search}/>
				<BugTable bugs={this.state.bugs} />
				<BugAdd addBug={this.addBug} />
			</div>
		)
	},

	componentDidMount: function() {
		console.log("BugList: componentDid");	
		this.loadData({});
		// $.ajax('/api/bugs').done((data) => {
		// 	console.log(data);
		// 	console.log('done');
		// 	this.setState({bugs: data});
		// });
	}, 

	componentDidUpdate: function(prevProps) {
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

	changeFilter: function(newFilter) {
		this.props.history.push({search: '?' + $.param(newFilter)});
		this.loadFitler(newFitler);
	},

	loadData: function(filter) {
		var query = QueryString.parse(this.props.location.search) || {};
		var filter = {priority: query.priority, status: query.status};

		$.ajax('/api/bugs', {data: filter}).done(data => {
			console.log('UPDATED', data);
			this.setState({bugs: data});
		});
	},

	testNewBug: function() {
		var nextId = this.state.bugs.length + 1;
		this.addBug({id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console"});
	},

	addBug: function(bug) {
		console.log("Adding bug: ", bug);
		console.log(JSON.stringify(bug));
		$.ajax({
			type: 'POST',
			url: '/api/bugs',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(bug),
			success: function(data) {
				var bug = data;
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({bugs: bugsModified});
			},
			error: function(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	},

});


module.exports = BugList;