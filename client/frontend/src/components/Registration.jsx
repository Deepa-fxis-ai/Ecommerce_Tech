import {useState} from 'react'

const Registration=()=>{
    const [username,setUserName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const getUserData=async (e)=>{
        const userData={username,email,password}
        const url="http://127.0.0.1:8000/api/auth/register"
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
            console.log(data.password)
        }
        else{
            console.log("Error")
        }
    }  
    
    return(
      <div>
        <form onSubmit={getUserData}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                type="text" 
                id="username" 
                value={username}
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter Your Name"/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                type="text" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"/>
            </div>
            <div>
                <label htmlFor="username">Password:</label>
                <input 
                type="password" 
                id="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"/>
            </div>
            <button type="submit">Register</button>
        </form>
      </div>
    )
}

export default Registration