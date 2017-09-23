var React = require('react');
var ReactDOM = require('react-dom');
const QueryString = require('query-string');

var BugFilter = React.createClass ({
	

	render() {
		console.log("Rendering BugFilter, state=", this.state,);
		return (
			<div>
				<h3>Filter</h3>
				Status:
				<select value={this.state.status} onChange={this.onChangeStatus}>
					<option value="">Select</option>
					<option value="New">New</option>
					<option value="Open">Open</option>
					<option value="Closed">Close</option>
				</select>
				<br/>
				<select
				  value={this.state.priority}
				  onChange={this.onChangePriority}>
				  <option value="">Select</option>
				  <option value="P1">P1</option>
				  <option value="P2">P2</option>
				  <option value="P3">P3</option>
				</select>
				<br/>

				<button onClick={this.submit}>Apply</button>
			</div>
		)
	},

	componentWillReciveProps: function(newProps) {
		if(newProps.initFilter.status === this.state.status && newProps.initFilter.priority === this.state.priority){
			console.log("BugFilter: componentWillRecieveProps, no change");
			return;
		}
		console.log("BugFilter: componentWillRecieveProps, new filter:", newProps.initFilter);
		this.setState({status: newProps.initFilter.status, priority: newProps.initFilter.priority});
	},

	getInitialState: function() {
		var initFilter = QueryString.parse(this.props.initFilter);
		console.log('initFilter', initFilter);
		return {status: initFilter.status, priority: initFilter.priority};
	},

	onChangeStatus: function(e) {
		this.setState({status: e.target.value});
	},

	onChangePriority: function(e) {
		this.setState({priority: e.target.value});
	},

	submit: function (e) {
		var newFilter = {};
		if (this.state.priority) newFilter.priority = this.state.priority;
		if (this.state.status) newFilter.status = this.state.status;
		this.props.submitHandler(newFilter);
	}

});



module.exports = BugFilter;