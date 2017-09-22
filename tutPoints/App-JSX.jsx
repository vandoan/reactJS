import React from 'react';

class App extends React.Component {
	render() {

		var i = 1;
		var myStyle = {
			fontSize: 40,
			color: '#FF0000'
		}

		return (
         <div>
             <h1 style = {myStyle}>Header</h1>
            <h2>Content</h2>
            <p data-myattribute = "somevalue">This is the content!!!</p>
         	<div>
				<h1>{1+1}
					{// this is a comment...}
					{/*Multi line coment...}
				</h1>
			</div>

			<div>
				<h1>{i == 1 ? 'Truth' : 'False'}</h1>
			</div>

         </div>
		);
	}
}

export default App;