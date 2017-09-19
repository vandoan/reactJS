import React from 'react';
import ReactDOM from 'react-dom';

// https://www.tutorialspoint.com/reactjs/reactjs_component_api.htm
// class App extends React.Component {  // SET STATE
  
// 	constructor() {
// 		super();

// 		this.state = {
// 			data: []
// 		}

// 		this.setStateHandler = this.setStateHandler.bind(this);	 
// 	}

// 	setStateHandler() {
// 		var item = "setState..."
// 		var myArray = this.state.data;
// 		myArray.push(item)
// 		this.setState({data: myArray})
// 	};

// 	render() {
// 		return (
// 			<div>
// 				<button onClick = {this.setStateHandler}>SET STATE</button>
// 				<h4>State Array: {this.state.data}</h4>
// 			</div>
// 		);
// 	}
// };


// class App extends React.Component { 	// FORCE UPDATE
// 	constructor() {
// 		super();
// 		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
// 	};

// 	forceUpdateHandler() {
// 		this.forceUpdate();
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<button onClick = {this.forceUpdateHandler}>FORCE UPDATE</button>
// 				<h4>Random number: {Math.random()}</h4>	
// 			</div>
// 		);
// 	}
// }


class App extends React.Component {
	constructor() {
		super();
		this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
	};

	findDomNodeHandler() {
		var myDiv = document.getElementById('myDiv');
		ReactDOM.findDOMNode(myDiv).style.color = 'green';
	}

	render() {
		return (
			<div>
				<button onClick = {this.findDomNodeHandler}>Find DOME NODE</button>
				<div id = "myDiv">NODE</div>
			</div>
		);
	}
};













export default App;
