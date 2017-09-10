const rpss = ['rock', 'paper', 'scissor', 'shoot'];
var i = 0;


var Player2 = React.createClass({
	getInitialState: function(){
		return {
			rpsIcon: "fist",
		}
	},

	render: function(){
		return (
			<div className="player2">
				<div className="fist">{this.state.rpsIcon}</div>
				<div className="rps-choices">
					<div value="0" onClick={this.onRPS}><img src="./images/0.png"/></div>
					<div value="1" onClick={this.onRPS}><img src="./images/1.png"/></div>
					<div value="2" onClick={this.onRPS}><img src="./images/2.png"/></div>
				</div>
			</div>
		)
	}
})

var Application = React.createClass({
	getInitialState: function(){
		return{
			rpsIcon: "fist",
			opponent: "fist",
			announcment: "",
			running: false,
		}
	},

	onNewMatch: function(props){
		this.setState({
			rpsIcon: "fist",
			announcment: "rock, paper, scissor...",
		});
	},

	componentWillUnmount: function(){
		clearInterval(this.interval);
	},

	onCountdown: function(){

		this.setState({
			announcment: rpss[i],
		});
		if(i >= rpss.length){
			clearInterval(this.interval);
			i = 0;
			this.setState({
				running: false,
			});
			console.log('end');
		}
		i++;
	},
 	
 	onResult: function(weapon, opponentWeapon){
		var winner = "";
		if (weapon == opponentWeapon) {
			winner = "3"
		} else if (weapon == 0) {
			if (opponentWeapon == 1){
				winner = 2;
			} else {
				winner = 1;
			}

		} else if (weapon == 1 ){
			if (opponentWeapon == 0){
				winner = 1;
			} else {
				winner = 2;
			}

		} else if ( weapon == 2 ) {
			if (opponentWeapon == 0){
				winner = 2;
			} else {
				winner = 1;
			}
		} else {
			winner = 4;
		}

		console.log(winner);
	},

	onRPS: function(e){
		var opponentWeapon = Math.floor(Math.random() * rpss.length - 1);
		var weapon = e.target.value;

		if(!this.state.running) {
			this.setState({
				running: true,
				rpsIcon: rpss[weapon],
				opponent: rpss[opponentWeapon],
			});
			this.onResult(weapon, opponentWeapon);
			this.interval = setInterval(this.onCountdown, 1000);
			// go through the array
		}
	},

	render: function(props){
		return (
			<div className="mainBox">
				<div>Rock Paper Scissor</div>
				<div className="leftPlayer fist">{this.state.rpsIcon}</div>
				<div className="rps-choices">
					<div value="0" onClick={this.onRPS}><img src="./images/0.png"/></div>
					<div value="1" onClick={this.onRPS}><img src="./images/1.png"/></div>
					<div value="2" onClick={this.onRPS}><img src="./images/2.png"/></div>
				</div>
				<button onClick={this.onNewMatch}>rock!...</button>
				<div className="opponent fist">{this.state.opponent}</div>
				<div className="announcment">{this.state.announcment}</div>
			
				<Player2 />
			</div>

		)
	},

	
})

// random generator for playerTwo



ReactDOM.render(<Application />, document.getElementById('container'));