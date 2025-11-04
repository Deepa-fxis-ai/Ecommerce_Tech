import { Routes , Route} from 'react-router-dom'
import { useState } from 'react'
import Home from './components/Home.jsx'
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import Product from './components/product.jsx'
import Cart from './components/cart.jsx'
import NotFound from './components/notFound.jsx'
import PaymentSuccess from './components/paymentSuccess.jsx'
import PaymentCancel from './components/paymentCancel.jsx'
import ProductDetail from './components/productDetails.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashBoard from './components/admin/dashboard.jsx'
import ForgotPassword from './components/forgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import UserProfile from './components/UserProfile.jsx'
import OrderCheck from './components/orderCheck.jsx'
import {useTranslation} from "react-i18next";
import {LanguageContext} from "./reactContext.jsx"
import './App.css'

const App=()=>{
  const [lang,setlang]=useState("en")
  const [theme,setTheme]=useState("light")
  const [userProfile,setUserProfileStatus]=useState(false)
  const [orderCheck,setOrderCheck]=useState(false)
  const {i18n}=useTranslation()
  const languageSetting=(lng)=>{
    i18n.changeLanguage(lng)
    setlang(lng)
  }
  const handleToggleTheme=()=>{
    setTheme(prev=>prev==='light'?'dark':'light')
  }
  const handleProfileStatus=()=>{
    setUserProfileStatus(prev=>!prev)
  }
  const handleOrderCheck=()=>{
    setOrderCheck(prev=>!prev)
  }
  return(
    <LanguageContext.Provider value={{language:lang,languageConversion:languageSetting,themeStatus:theme,onhandleTheme:handleToggleTheme,userProfileStatus:userProfile,onhandleUserProfile:handleProfileStatus,orderCheckStatus:orderCheck,onhandleOrderCheckStatus:handleOrderCheck}}>
     <Routes> 
       <Route exact path="/register" element={<Registration/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/product" element={<Product/>}/>
       <Route exact path="/product/:id" element={<ProductDetail />}/>
       <Route exact path="/forgot-password" element={<ForgotPassword />}/>
       <Route exact path="/reset-password/:uid/:token" element={<ResetPassword />}/>
       <Route exact path="/user-profile" element={<UserProfile/>}/>
       <Route exact path="/order-check" element={<OrderCheck/>}/>
       <Route element={<ProtectedRoute/>}>
         <Route exact path="/cart" element={<Cart/>}/>
         <Route exact path='/success' element={<PaymentSuccess/>}/>
         <Route exact path='/cancel' element={<PaymentCancel/>}/>
       </Route>
       <Route path="*" element={<NotFound />}/>
       
       <Route exact path="/admin/dashboard" element={<AdminDashBoard/>}/>
       
     </Routes>
    </LanguageContext.Provider>
  )
}

export default App