import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

 // function tick() {
 //  const element = (
 //    <div>
 //      <h1>Hello, world!</h1>
 //        <h2>It is {new Date().toLocaleTimeString()}.</h2>
 //      </div>
 //    );
// ReactDOM.render(element, document.getElementById('root'));

 // }

// function Welcome(props) {
// 	return <h1>Hello, {props.name}</h1>;
// }

// function Welcome(props) {
// 	return <h1>Hello, {props.name}</h1>;
// }

// function App() {
// 	return (
// 	<div>
// 		<Welcome name="Sara" />
// 		<Welcome name="Cahal" />
// 		<Welcome name="Edite" />
// 	</div>
// 	)
// }

// const element = <Welcome name="Sara" />;

// ReactDOM.render(
// 	<App />, document.getElementById('root')
// );


//setInterval(tick,1000);


//registerServiceWorker();






//STATE AND LIFECYCLE
// https://facebook.github.io/react/docs/state-and-lifecycle.html

// function tick() {
// 	const element = (
// 		<div>
// 			<h1>Hello, world!</h1>
// 			<h2>It is {new Date().toLocaleTimeString()}.</h2>
// 		</div>
// 	);

// 	ReactDOM.render(
// 		element,
// 		document.getElementById('root')
// 	);
// }

// class Clock extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {date: new Date()};
// 	}

// 	componentDidMount() {
// 		this.timerID = setInterval(
// 			() => this.tick(),
// 			1000
// 		);

// 	}

// 	comonentWillMount() {
// 		clearInterval(this.timerID);
// 	}

// 	tick() {
// 		this.setState({
// 			date: new Date()
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello, world!</h1>
// 				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// 			</div>
// 		);
// 	}
// }









// HANDLING EVENTS
// https://facebook.github.io/react/docs/handling-events.html

// class Toggle extends React.Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {isToggleOn: true};

// 		// This binding is necessary to make `this` work in the callback
// 		this.handleClick = this.handleClick.bind(this);		
// 	}

// 	handleClick() {
// 		this.setState(prevState => ({
// 			isToggleOn: !prevState.isToggleOn
// 		}));
// 	}

// 	render() {
// 		return (
// 			<button onClick={this.handleClick}>
// 			{this.state.isToggleOn ? 'ON' : 'OFF'}
// 			</button>
// 		);
// 	}
// }




// CONDITIONAL RENDERING
// https://facebook.github.io/react/docs/conditional-rendering.html

function UserGreeting(props) {
	return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
	return <h1>Please sign up.</h1>;
}
// ELEMENT VARIABLES
function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />
	}
	return <GuestGreeting />;
}



function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			Login
		</button>
	)
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			Logout
		</button>
	);
}

class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = { isLoggedIn: false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn: true});
	}

	handleLogoutClick() {
		this.setState({isLoggedIn: false});
	}

	// render() {
	// 	const isLoggedIn = this.state.isLoggedIn;

	// 	let button = null;
	// 	if (isLoggedIn) {
	// 		button = <LogoutButton onClick={this.handleLogoutClick} />;
	// 	} else {
	// 		button = <LoginButton onClick={this.handleLoginClick} />;
	// 	}

	// 	return (
	// 		<div>
	// 			<Greeting isLoggedIn={isLoggedIn} />
	// 			{button}
	// 		</div>
	// 	)
	// }

	render() {
		const isLoggedIn = this.state.isLoggedIn;
		return (
			<div>
				{isLoggedIn ? (
					<LogoutButton onClick={this.handleLogoutClick} />
				) : (
					<LoginButton onClick={this.handleLoginCLick} />
				)}
			</div>
		);
	}
}

// INLINE IF WITH LOGICAL && OPERATOR
function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Hello!</h1>
			{unreadMessages.length > 0 && 
				<h2>
					You have {unreadMessages.length} unread messages.
				</h2>
			}
		</div>
	);
}
//  in JavaScript, true && expression always evaluates to expression,
// 	and false && expression always evaluates to false
// const messages = ['React', 'Re: React', 'Re:Re: React'];


// INLINE IF-ELSE WITH CONDITIONAL OPERATOR


function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}

	return (
		<div className="warning">
			Warning!
		</div>
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showWarning: true}
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render() {
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}







// LISTS AND KEYS
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
	<li>{number}</li>
);


function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}




// KEYS
// Use keys when there's a list of items, not when there's a single

function ListItem(props) {
	return <li>{props.value}</li>;
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<ListItem key={number.toString()}
			value={number} />
	);
	return (
		<ul>
			{listItems}
		</ul>
	);
}



function Blog(props) {
	const sidebar = (
	<ul>
		{props.posts.map((post) =>
			<li key={post.id}>
				{post.title}
			</li>
		)}
	</ul>
	);
	const content = props.posts.map((post) =>
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return (
		<div>
			{sidebar}
			<hr />
			{content}
		</div>
	);
}


const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];


function NumberList(props) {
	const numbers = props.numbers;
	return (
		<ul>
			{numbers.map((number) =>
				<ListItem key={number.toString()}
					value={number} />
			)}
		</ul>
	);
}



//  FORMS

// CONTROLLED COMPONENTS
// https://facebook.github.io/react/docs/forms.html


class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault;
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}



// THE TEXTAREA TAG 
class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Please write an essay about your favorite DOM element.'
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('An essay was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Essay:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}


// SELECTED TAG
class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('Your favorite flavor is: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite La Croix flavor:
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}



// HANDLING MULTIPLE INPUTS
class Reservation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.cheked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form>
				<label>
					Is going:
					<input 
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					Number of guests:
					<input
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}




// LIFTING STATE UP






ReactDOM.render(
	// <Toggle />,
//	<Greeting isLoggedIn={true} />,
//	<LoginControl />,
// 	<Mailbox unreadMessages={messages} />,
//	<LoginControl />,
//	<Page />,
//	<ul>{listItems}</ul>,
//	<NumberList numbers={numbers} />,
//	<Blog posts={posts} />,
//	<NameForm />,
//	<EssayForm />,
//	<FlavorForm />,
	<Reservation />,

 	document.getElementById('root')
 );



// setInterval(Clock, 1000);
















