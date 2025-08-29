import { FaBattleNet } from "react-icons/fa6";
import Cookies from 'js-cookie'
import {useNavigate,Link} from 'react-router-dom'
import './Header.css'

const Header=()=>{
    const navigate=useNavigate()
    const onChangeLogout=()=>{
       Cookies.remove('jwt_token')
       navigate("/login")
    }
    return(
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
             <button type="button" className="button" onClick={onChangeLogout}>Logout</button>
          </div>  
        </div>
    )
}

export default Header