import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import './forgotPassword.css'

const ForgotPassword=()=>{ 
    const [email,setEmail]=useState('')

    const handleResetPassword=async(e)=>{
       e.preventDefault()
       const url="http://127.0.0.1:8000/password-reset/"
       const options={
         method: 'POST',
         headers: {'Content-Type':'application/json'},
         body: JSON.stringify({email})
       }
       const response=await fetch(url,options)
       if(response.ok){
        alert("Message has been sent on your registered email.Please check it out!!")
       }
       else{
        alert('something went wrong')
       }
    }

    return(
      <div className='registerOrLoginMainContainer'>
        <h1 className='heading'>Reset Password!!</h1>
        <form onSubmit={handleResetPassword} className='formContainer'>
            <div className='inputAndLabelContainer'>
                <label htmlFor="email"><IoMdMail/></label>
                <input 
                type="text" 
                id="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className='input'
                />
            </div>
            <button type="submit" className='button'>Reset Link</button>
        </form>
      </div>
    )
}

export default ForgotPassword