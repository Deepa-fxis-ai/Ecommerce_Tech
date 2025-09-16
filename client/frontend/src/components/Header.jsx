import { FaBattleNet,FaBars } from "react-icons/fa6";
import { useState } from "react";
import Cookies from 'js-cookie'
import {useNavigate,Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css'

const Header=()=>{
    const {i18n}=useTranslation()
    const [mobileViewBarStatus,setMobileViewBarStatus]=useState(false)
    const navigate=useNavigate()
    const token=Cookies.get('jwt_token')
    const changeLanguage=(lng)=>{
      i18n.changeLanguage(lng)
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
             <a href="/">Home</a>
             <a href="/product">Products</a>
             <a href="/cart">Cart</a>
             <select onChange={(e) => changeLanguage(e.target.value)}>
               <option value="en">English</option>
               <option value="hi">Hindi</option>
               <option value="ta">Tamil</option>
               <option value="ma">Malayalam</option>
             </select>
             {token?<button type="button" className="button" onClick={onChangeLogout}>Logout</button>:<button type="button" className="button" onClick={onChangeLogin}>Login/Register</button>}
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
             <a href="/">Home</a>
             <a href="/product">Products</a>
             <a href="/cart">Cart</a>
             {token===null?<button type="button" className="button" onClick={onChangeLogin}>Login</button>:<button type="button" className="button" onClick={onChangeLogout}>Logout</button>}
          </div> :null}
          
           

           
        </div>

        
    )
}

export default Header