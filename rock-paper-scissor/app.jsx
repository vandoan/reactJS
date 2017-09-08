

var Application = React.createClass({
	getInitialState: function(){
		return{
			rpsIcon: "fist",
			announcment: "",
		}
	},

	render: function(props){
		return (
			<div className="mainBox">
				<div>Rock Paper Scissor</div>
				<div className="leftPlayer fist">{this.state.rpsIcon}</div>
				<div className="rps-choices">
					<button onClick={this.onRock}>rock</button>
					<button onClick={this.onPaper}>paper</button>
					<button onClick={this.onScissor}>scissor</button>
				</div>
				<button onClick={this.onNewMatch}>rock!...</button>
				<div className="rightPlayer fist">fist</div>
				<div className="announcment">{this.state.announcment}</div>
			</div>
		)
	},

	onNewMatch: function(props){
		this.setState({
			rpsIcon: "fist",
			announcment: "rock, paper, scissor...",
		})
	},

	onRock: function(props){
		this.setState({
			rpsIcon: "rock",
		})
	},

	onPaper: function(props){
		this.setState({
			rpsIcon: "paper",
		})
	},

	onScissor: function(props){
		this.setState({
			rpsIcon: "scissor",
		})
	}
})

// random generator for playerTwo



ReactDOM.render(<Application />, document.getElementById('container'));