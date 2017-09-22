var React = require('react');
var ReactDOM = require('react-dom');


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

module.exports = BugAdd;