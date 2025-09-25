import {LanguageContext} from '../reactContext'
import { FaBattleNet,FaBars } from "react-icons/fa6";
import { useState,useContext } from "react";
import Cookies from 'js-cookie'
import {useNavigate,Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css'

const Header=()=>{
    const {t}=useTranslation()
    const {languageConversion} = useContext(LanguageContext)
    const [mobileViewBarStatus,setMobileViewBarStatus]=useState(false)
    const [language,setLanguage]=useState("")
    const navigate=useNavigate()
    const token=Cookies.get('jwt_token')

    const changeLanguage=(event)=>{
        setLanguage("")
        languageConversion(event)
    }
    
    const onChangeLogout=()=>{
       Cookies.remove('jwt_token')
       navigate("/login")
    }
    const onChangeLogin=()=>{
      navigate("/login")
    }

    const handleBarStatus=()=>{
      setMobileViewBarStatus(prev=>!prev)
    }

        return(
          <div>
          <div className='headerContainer'>
              <Link to="/">
              <div className="logoContainer">
                  <FaBattleNet className="logo"/>
                <h1 className="headings"><span className="letter">T</span>ech<span className="letter">S</span>hop</h1>
              </div> 
            </Link>
            <div className="optionsContainer">
             <a href="/">{t("header.home")}</a>
             <a href="/product">{t("header.products")}</a>
             <a href="/cart">{t("header.cart")}</a>
             <select onChange={(e) => changeLanguage(e.target.value)} className="select" value={language}>
                <option value="" disabled>{t("header.select")}</option>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="ma">മലയാളം</option>
            </select>
             {token?<button type="button" className="button" onClick={onChangeLogout}>{t("header.logout")}</button>:<button type="button" className="button" onClick={onChangeLogin}>{t("header.login")}</button>}
          </div> 
          </div>
          
           <div className="mobileContainer">
             <Link to="/">
            <div className="logoContainer">
                <FaBattleNet className="logo"/>
              <h1 className="headings"><span className="letter">T</span>ech<span className="letter">S</span>hop</h1>
            </div> 
          </Link>
          <button onClick={handleBarStatus}><FaBars/></button>
          </div>
          {mobileViewBarStatus?<div className="optionContainer">
             <a href="/">{t("header.home")}</a>
             <a href="/product">{t("header.products")}</a>
             <a href="/cart">{t("header.cart")}</a>
             <select onChange={(e) => changeLanguage(e.target.value)} className="select" value={language}>
               <option value="" disabled>{t("header.select")}</option>
               <option value="en">English</option>
               <option value="hi">Hindi</option>
               <option value="ta">Tamil</option>
               <option value="ma">Malayalam</option>
             </select>
             {token===null?<button type="button" className="button" onClick={onChangeLogin}>{t("header.login")}</button>:<button type="button" className="button" onClick={onChangeLogout}>{t("header.logout")}</button>}
          </div> :null}
          
           

           
        </div>
        )


    
}

export default Header