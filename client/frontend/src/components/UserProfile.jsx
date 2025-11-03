import { useState,useEffect,useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import { LanguageContext } from '../reactContext.jsx';
import Cookies from 'js-cookie'
import './UserProfile.css'


const UserProfile=()=>{
  const {onhandleUserProfile}=useContext(LanguageContext)
  const [userData,setUserData]=useState([])
  const [updatedData,setUpdatedData]=useState([])
  const [avatarSrc, setAvatarSrc] = useState(undefined);
  const [phone,setPhone]=useState(null)
  const [address,setAddress]=useState(null)

  const token=Cookies.get('jwt_token')

  const handleUserData=async()=>{
     const url="http://127.0.0.1:8000/user-profile/"
     const options={
        method:'GET',
        headers:{
            Authorization: `Bearer ${token}`
        }
     }
     const response=await fetch(url,options)
     const data=await response.json()
     if(response.ok){
        setUserData(data)
        console.log(data)
     }
     else{
        console.log("Something went wrong")
     }
  } 

  useEffect(()=>{
    handleUserData() 
    console.log(token)
  },[])


  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

   const handleSubmit=async(e)=>{
      e.preventDefault()
      const formData = new FormData();

      if (phone) formData.append('phone', phone);
      if (address) formData.append('address', address);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) {
        formData.append('avatar', fileInput.files[0]);
      }
      const url="http://127.0.0.1:8000/user-profile/"
      const options={
        method:'PUT',
        headers:{
          Authorization: `Bearer ${token}`
        },
        body:formData
      }
      const response=await fetch(url,options)
      const data=await response.json()
      if(response.ok){
        console.log(data)
        setUpdatedData(data)
      }
   }

    return(
      <>
        <div className='cancelIcon'>
          <button type='button' onClick={onhandleUserProfile}>X</button>
        </div>
        <ButtonBase
            component="label"
            role={undefined}
            tabIndex={-1}
            aria-label="Avatar image"
            sx={{
                borderRadius: '40px',
                '&:has(:focus-visible)': {
                outline: '2px solid',
                outlineOffset: '2px',
                },
            }}
        >
      <Avatar alt="Upload new avatar" src={avatarSrc || updatedData.avatar || userData.avatar} sx={{ width: 96, height: 96 }}/>
      <input
        type="file"
        accept="image/*"
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '10px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
        onChange={handleAvatarChange}
      />
        </ButtonBase>
        <h3>{userData.username}</h3>
        <p>{userData.email}</p>
        <h3>You can add more details here!!</h3>
        <form onSubmit={handleSubmit} >
           <div className='form'>
             <div className='formdata'>
              <label htmlFor='phone'>Phone Number :</label>
              <input type='text' id='phone' className="inputs" value={userData.phone} onChange={(e)=>setPhone(e.target.value)}/>
             </div>
             <div className='formdata'>
              <label htmlFor='address'>Address :</label>
              <textarea type='text' id='address' className="inputs" value={userData.address} onChange={(e)=>setAddress(e.target.value)}/>
             </div>
             <button type="submit" className='button'>Update Profile</button>
           </div>
        </form>
    </>
    )
}

export default UserProfile