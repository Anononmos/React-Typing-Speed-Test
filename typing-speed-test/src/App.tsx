import { useState, useEffect } from 'react';
import Paragraph from './components/Paragraph';

import './App.css';

function App() {
	const [text, setText] = useState("Loading...");

	useEffect( () => {
		fetch("sample-texts/Sayri-Tupac.txt")
			.then( res => res.text() )
			.then( data => setText(data) )
			.catch( error => console.error(error) )
	}, []);

	return (
		<div className="App">
			<Paragraph>
				{text}
			</Paragraph>
		</div>
	);
}

export default App;
