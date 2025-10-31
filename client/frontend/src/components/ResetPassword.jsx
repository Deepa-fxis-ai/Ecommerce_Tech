import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import './forgotPassword'

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/password-reset-confirm/', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ uid, token, new_password: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.detail);
        setTimeout(()=> navigate('/login'), 2000);
      } else {
        setMessage(data.detail || 'Failed to reset password.');
      }
    } catch (err) {
      setMessage('Network error');
    }
  };

  return (
    <div className='registerOrLoginMainContainer'>
      <h2 className="heading">Set a new password</h2>
      <form onSubmit={handleSubmit} className='formContainer'>
        <div className='inputAndLabelContainer'>
            <label htmlFor="password"><RiLockPasswordLine/></label>
           <input type="password" id="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='input'  placeholder="New password" required minLength={8} />
        </div> 
        <button type="submit" className="button">Save</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;