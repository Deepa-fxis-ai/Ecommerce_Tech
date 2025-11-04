import {LanguageContext} from '../reactContext'
import { FaBattleNet,FaBars } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useState,useContext } from "react";
import Cookies from 'js-cookie'
import {useNavigate,Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { IoBagHandleSharp } from "react-icons/io5";
import './Header.css'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 24,
  padding: 5,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 20,
    height: 20,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

const Header=()=>{
    const {t}=useTranslation()
    const {languageConversion,onhandleTheme,themeStatus,onhandleUserProfile,onhandleOrderCheckStatus} = useContext(LanguageContext)
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
          <div className={`headerContainer ${themeStatus === 'light' ? 'light' : 'dark'}`}>
              <Link to="/">
              <div className="logoContainer">
                  <FaBattleNet className={themeStatus === 'light' ? 'light' : 'dark'}/>
                <h1 className={themeStatus === 'light' ? 'headingslight' : 'headingsdark'}>
                  <span className={themeStatus === 'light' ? 'light' : 'dark'}>
                    T
                  </span>
                    ech
                  <span className={themeStatus === 'light' ? 'light' : 'dark'}>
                    S
                  </span>
                    hop
                  </h1>
              </div> 
            </Link>
            <div className='optionsContainer'>
             <a href="/" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.home")}</a>
             <a href="/product" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.products")}</a>
             <a href="/cart" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.cart")}</a>
             <select onChange={(e) => changeLanguage(e.target.value)} className={`select ${themeStatus === 'light' ? 'light' : 'dark'}`} value={language}>
                <option value="" disabled>{t("header.select")}</option>
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="ml">മലയാളം</option>
            </select>
            <FormGroup>
              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked  onChange={onhandleTheme}/>}
              />
            </FormGroup>
            <div className='buttonUserOrder'>
             {token?<button type="button" className={`select ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={onChangeLogout}>{t("header.logout")}</button>:<button type="button" className={`select ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={onChangeLogin}>{t("header.login")}</button>}
              <button type="button" className="userButton" onClick={onhandleUserProfile}><FaUserCircle size={30} className={`${themeStatus === 'light' ? 'light' : 'dark'}`}/></button>
               <button type="button" className="orderButton" onClick={onhandleOrderCheckStatus}><IoBagHandleSharp size={30} className={`${themeStatus === 'light' ? 'light' : 'dark'}`}/></button>
            </div>
          </div> 
          </div>
          
           <div className={`mobileContainer ${themeStatus === 'light' ? 'light' : 'dark'}`}>
             <Link to="/">
                <div className="logoContainer">
                    <FaBattleNet className={themeStatus === 'light' ? 'light' : 'dark'}/>
                    <h1 className={themeStatus === 'light' ? 'headingslight' : 'headingsdark'}>
                      <span className={themeStatus === 'light' ? 'light' : 'dark'}>
                        T
                      </span>
                        ech
                      <span className={themeStatus === 'light' ? 'light' : 'dark'}>
                        S
                      </span>
                        hop
                      </h1>
                </div> 
            </Link>
            <div className='barAndProfileIcon'>
                <button onClick={handleBarStatus} className={`userButton ${themeStatus === 'light' ? 'light' : 'dark'}`}><FaBars/></button>
                <button type="button" className={`userButton ${themeStatus === 'light' ? 'light' : 'dark'}`} onClick={onhandleUserProfile}><FaUserCircle size={20}/></button> 
                <button type="button" className="userButton" onClick={onhandleOrderCheckStatus}><IoBagHandleSharp size={20} className={`${themeStatus === 'light' ? 'light' : 'dark'}`}/></button>
             </div>
          </div>
          {mobileViewBarStatus?<div className={`optionContainer ${themeStatus === 'light' ? 'light' : 'dark'}`}>
             <a href="/" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.home")}</a>
             <a href="/product" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.products")}</a>
             <a href="/cart" className={themeStatus === 'light' ? 'light' : 'dark'}>{t("header.cart")}</a>
             <select onChange={(e) => changeLanguage(e.target.value)} className={`select ${themeStatus === 'light' ? 'light' : 'dark'}`} value={language}>
               <option value="" disabled>{t("header.select")}</option>
               <option value="en">English</option>
               <option value="hi">Hindi</option>
               <option value="ta">Tamil</option>
               <option value="ml">Malayalam</option>
             </select>
             <FormGroup>
                  <FormControlLabel
                      control={<MaterialUISwitch sx={{ m: 1}} defaultChecked onChange={onhandleTheme}/>}
                    />
                  </FormGroup>
             {token===null?<button type="button" className={`button ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={onChangeLogin}>{t("header.login")}</button>:<button type="button" className={`button ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={onChangeLogout}>{t("header.logout")}</button>}
          </div> :null}
          
          
        </div>
        )


    
}

export default Header