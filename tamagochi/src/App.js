import './App.css'
import Switcher from './components/Switcher'
import Character from './pages/Character'
import happyRight from './pages/images/c10.png'
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
