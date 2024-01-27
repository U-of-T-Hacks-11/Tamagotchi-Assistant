import './App.css';
import Character from './pages/Character';
import happyRight from './pages/images/c10.png';
function App() {
  return (
    <div className="App">
      <img src={happyRight} alt="" />
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
