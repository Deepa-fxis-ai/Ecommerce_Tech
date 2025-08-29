import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegistrationAndLogin.css'

const Registration=()=>{
    const [username,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const navigate=useNavigate()

    const submitSuccess=()=>{
        navigate("/login")
    }

    const getUserData=async (e)=>{
        e.preventDefault();
        const url="http://127.0.0.1:8000/api/auth/register"
        const userData={username,email,password}
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
            submitSuccess()
        }
        else{
            console.log("Error")
        }
    }  
    
    return(
      <div className='registerOrLoginMainContainer'>
        <h1 className='heading'>Register here!!</h1>
        <form onSubmit={getUserData} className='formContainer'>
            <div className='inputAndLabelContainer'>
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                value={username}
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter Your Name"
                className='input'/>
            </div>
            <div className='inputAndLabelContainer'>
                <label htmlFor="email">Email:</label>
                <input 
                type="text" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className='input'
                />
            </div>
            <div className='inputAndLabelContainer'>
                <label htmlFor="username">Password:</label>
                <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className='input'/>
            </div>
            <p className='paragraph'>Already have an account <a href="/login">login here</a></p>
            <button type="submit" className='button'>Register</button>
        </form>
      </div>
    )
}

export default Registration