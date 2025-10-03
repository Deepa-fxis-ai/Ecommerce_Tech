import { useNavigate } from 'react-router-dom'
import './notFound.css'

const NotFound=()=>{
    const navigate=useNavigate()

    const onBackHome=()=>{
        navigate("/")
    }
    
    return(
    <div className='notfoundContainer'>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/002/006/374/small_2x/modern-flat-design-illustration-of-404-error-page-free-vector.jpg"/>
        <button className='button' onClick={onBackHome}>Go Home</button>
    </div>
)
}

export default NotFound