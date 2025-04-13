import { useState, useEffect } from 'react';
import Paragraph from './components/Paragraph';

import './App.css';

function App() {
	const [cursor, setCursor] = useState(0);
	const [text, setText] = useState("Loading...");

	useEffect( () => {
		fetch("sample-texts/Sayri-Tupac.txt")
			.then( res => res.text() )
			.then( data => setText(data) )
			.catch( error => console.error(error) )
	}, []);

	return (
		<div className="App">
			<Paragraph cursor={cursor}>
				{text}
			</Paragraph>
		</div>
	);
}

export default App;
