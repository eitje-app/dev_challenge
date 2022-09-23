import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {

    useEffect(() => {
        let request = 
        fetch("http://localhost:4000/workresults?date=23&userId=40285", {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
