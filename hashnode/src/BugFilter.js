var React = require('react');
var ReactDOM = require('react-dom');


var BugFilter = React.createClass ({
	

	render() {
		console.log("Bug filtering");
		return (
			<div>
				<select name="status">
					<option value="">Select</option>
					<option value="open">Open</option>
					<option value="close">Close</option>
				</select>
				<button onClick={this.filterBug}>Apply</button>
			</div>
		)
	},

	filterBug: function filterBug(filters) {
		console.log("filter");
		console.log(select.status.value);		
		$.ajax({
			type: 'POST',
			url: '/api/bugs',
			dataType: "json",
			contentType: 'application/json',
			data: JSON.stringify(bug),
			success: function (data) {
				var bug = data;
				var bugsModified = this.state.bugs.concat(bug);
				this.setState({ bugs: bugsModified });
			}.bind(this),
			error: function error(xhr, status, err) {
				console.log("Error adding bug:", err);
			}
		});
	}

});



module.exports = BugFilter;