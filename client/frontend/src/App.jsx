import { Routes , Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import './App.css'

const App=()=>{
  return(
     <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/register" element={<Registration/>}/>
       <Route exact path="/login" element={<Login/>}/>
     </Routes>
  )
}

export default App