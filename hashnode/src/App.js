	
var BugFilter = React.createClass ({
	render() {
		console.log("Bug filtering");
		return (
			<div>
				Filter stuff comin' soon.
			</div>
		)
	}
});


var BugRow = React.createClass({
	render() {
		console.log("Rendering BugRow", this.props.bug);
		return (
			<tr>
				<td>{this.props.bug.id}</td>
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
			<BugRow key={bug.id} bug={bug} />
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

var BugAdd = React.createClass({	

	render() {
		console.log("Rendering BugAdd");
		return (
			<form name="bugForm">
				<tr>
					<th>Reporter</th>
					<th>Title</th>
				</tr>
				<tr>
					<td><input name="reporter" /></td>
					<td><input name="title" /></td>
 				</tr>	
				<button onClick={this.bugSubmit}>Submit bug</button>
			</form>
		)
	},

	bugSubmit: function(e) {
		console.log("Submit bug");
		e.preventDefault();
		let form = document.forms.bugForm;
		
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
 	getInitialState: function(){
 		return {bugs: []};
 	},

	render: function() {
		console.log("Rendering bug list, num items: ", this.state.bugs.length);
		return (
 			<div>
				<h1>Bug Tracker</h1>
				<BugFilter />
				<BugTable bugs={this.state.bugs} />
				<button onClick={this.testNewBug}>Add Bug</button>
				<BugAdd addBug={this.addBug} />
			</div>
		)
	},

	componentDidMount: function() {
		console.log('mounting');
		$.ajax('/api/bugs').done(function(data) {
			console.log('type ' + typeof data);
			console.log('done');
			this.setState({bugs: JSON.parse(data)});
		}.bind(this));
	},  

	testNewBug: function() {
		var nextId = this.state.bugs.length + 1;
		this.addBug({id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console"});
	},

	addBug: function(bug) {
		console.log("Adding bug: ", bug);
		bug.id = this.state.bugs.length + 1;

		var bugsModified = this.state.bugs.slice();
		bugsModified.push(bug);
		this.setState({bugs: bugsModified});
	}

});


ReactDOM.render(
	<BugList />,
	document.getElementById('root')
);