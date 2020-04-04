import React from 'react';
import './App.scss';
import Main from './main/Main.js';

function App() {
  return (
    <div className="App">
		<div className="BackgroundImage"/>
		  <header className="App-header">
			<p>
			  Watch Dota in your browser
			</p>
			<Main />
		  </header>
		</div>
  );
}

export default App;
