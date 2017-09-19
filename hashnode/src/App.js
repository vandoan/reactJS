
const bugData = [
	{id: "0234", status: "active", priority: "moderate", reporter: "Mahala", title: "Broken iamge"},
	{id: "0214", status: "active", priority: "low", reporter: "Pete", title: "Wonky navbar"}
]
	
class BugFilter extends React.Component {
	render() {
		console.log("Bug filtering");
		return (
			<div>
				Filter stuff comin' soon.
			</div>
		)
	}
}

class BugRow extends React.Component {
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
}

class BugTable extends React.Component {
	render() {
		console.log("Rendering BugTable, rows: ", this.props.bugs.length);
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
}

class BugAdd extends React.Component {
	render() {
		console.log("Rendering BugAdd");
		return (
			<div className="bugForm">
				bug form 
			</div>
		)
	}
}

class BugTracker extends React.Component {
	constructor() {
		super();
		this.state = {
			bugs: bugData
		}
	}

	render() {
		console.log("Rendering bug list, num items: ", this.state.bugs.length);
		return (
 			<div>
				<h1>Bug Tracker</h1>
				<BugFilter />
				<BugTable bugs={bugData} />
				<button onClick={this.testNewBug}>Add Bug</button>
				<BugAdd />
			</div>
		)
	}
}


function TestNewBug() {
	// var nextId = this.state.bug.length + 1;
	this.addBug({id: nextId, priority: "P2", status: "New", reporter: "Mick", title: "Warning in console"});
}

function AddBug() {
	console.log("Adding bug: ", bug);

	var bugsModified = this.state.bugs.slice();
	bugsModified.push(bug);
	this.setState({bugs: bugsModified});
}


ReactDOM.render(
	<BugTracker />,
	document.getElementById('root')
);