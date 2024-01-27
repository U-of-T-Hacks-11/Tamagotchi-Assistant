import './App.css';
import Character from './Character';

function App() {
  return (
    <div className="App">
      <img src="/images/c1.png" alt="" />
      <Character />
      <header className="App-header">
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
