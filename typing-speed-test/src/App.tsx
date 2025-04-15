import { useState, useEffect } from 'react';
import Paragraph from './components/Paragraph';

import './App.css';

function App() {
	const [didMount, setDidMount] = useState(false);
	const [text, setText] = useState<string>("");

	useEffect( () => {
		fetch("sample-texts/Sayri-Tupac.txt")
			.then( res => res.text() )
			.then( data => { 
				setText(data); 
				setDidMount(true);
			})
			.catch( error => console.error(error) )
	}, []);

	return (
		<div className="App">
			{ (didMount) ? (
				<Paragraph>
					{text}
				</Paragraph>
			) : "" }
		</div>
	);
}

export default App;
