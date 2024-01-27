import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import Health from './pages/Health'

function App() {
  return (
    <div className='App'>
      {/* <img src={happyRight} alt='' /> */}
      <Switcher />
      <Character />
      <Health />
    </div>
  )
}

export default App
