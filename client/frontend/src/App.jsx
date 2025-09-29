import { Routes , Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import Product from './components/product.jsx'
import Cart from './components/cart.jsx'
import ProductDetail from './components/productDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import {useTranslation} from "react-i18next";
import {LanguageContext} from "./reactContext.jsx"
import './App.css'

const App=()=>{
  const [lang,setlang]=useState("en")
  const [theme,setTheme]=useState("light")
  const {i18n}=useTranslation()
  const languageSetting=(lng)=>{
    i18n.changeLanguage(lng)
    setlang(lng)
  }
  const handleToggleTheme=()=>{
    setTheme(prev=>prev==='light'?'dark':'light')
  }
  return(
    <LanguageContext.Provider value={{language:lang,languageConversion:languageSetting,themeStatus:theme,onhandleTheme:handleToggleTheme}}>
     <Routes> 
       <Route exact path="/register" element={<Registration/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/product" element={<Product/>}/>
       <Route exact path="/product/:id" element={<ProductDetail />}/>
       <Route element={<ProtectedRoute/>}>
         <Route exact path="/cart" element={<Cart/>}/>
       </Route>
     </Routes>
    </LanguageContext.Provider>
  )
}

export default App