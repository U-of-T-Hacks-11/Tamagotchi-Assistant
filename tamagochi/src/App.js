import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'

function App() {
  return (
    <div className='App'>
      {/* <img src={happyRight} alt='' /> */}
      <Switcher />
      <Character />
    </div>
  )
}

export default App
