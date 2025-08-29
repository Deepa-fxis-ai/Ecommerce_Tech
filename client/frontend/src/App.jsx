import { Routes , Route} from 'react-router-dom'
import Home from './components/Home.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import Product from './components/product.jsx'
import Cart from './components/cart.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './App.css'

const App=()=>{
  return(
     <Routes> 
       <Route exact path="/register" element={<Registration/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route element={<ProtectedRoute/>}>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="/product" element={<Product/>}/>
         <Route exact path="/cart" element={<Cart/>}/>
       </Route>
     </Routes>
  )
}

export default App