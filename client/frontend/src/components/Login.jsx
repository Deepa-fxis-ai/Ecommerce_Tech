import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegistrationAndLogin.css'
import Cookies from 'js-cookie'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";



const Login=()=>{
    const [username,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const [showError,setShowError]=useState(false)
    

    const navigate=useNavigate()

    const submitSuccess=(jwtToken,adminCheck)=>{
        Cookies.set('jwt_token',jwtToken,{expires:30})
        console.log(adminCheck)
        if(adminCheck===true){
           navigate(`/admin/dashboard`)
        }
        else{
            navigate(`/`)
        }
    }

    const getUserData=async (e)=>{
        e.preventDefault();
        const url="http://127.0.0.1:8000/api/auth/login"
        const userData={username,password}
        const options={
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(userData)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok){
            submitSuccess(data.access,data.user.is_staff)
            console.log(data)
        }
        else{
            setError(data.detail)
            setShowError(true)
            console.log(data.detail)
        }
    }  
    
    return(
      <div className='registerOrLoginMainContainer'>
        <h1 className='heading'>Login here!!</h1>
        <form onSubmit={getUserData} className='formContainer'>
            <div className='inputAndLabelContainer'>
                <label htmlFor="username"><FaUser/></label>
                <input 
                type="text" 
                id="username" 
                value={username}
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter Your Name"
                className='input'/>
            </div>
            <div className='inputAndLabelContainer'>
                <label htmlFor="password"><RiLockPasswordLine/> </label>
                <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className='input'/>
            </div>
            <p className='paragraph'>Don't have an account <a href="/register">Register here</a></p>
            <button type="submit" className='button'>Login</button>
            {showError?<p className='error'>{error}</p>:null}
        </form>
      </div>
    )
}

export default Login