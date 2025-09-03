import { useState ,useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from './Header.jsx'
import './cart.css'

const Cart=()=>{
    const [cartData,getCartData]=useState([])
    const token=Cookies.get('jwt_token')

    useEffect(()=>{
            handleCartData()
            console.log(cartData)
        }, []);
    
    const handleCartData=async ()=>{ 
            const url=`http://127.0.0.1:8000/cart/`;
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
            }
            try{
              const response=await fetch(url,options)
              
            if(response.ok){
                const data=await response.json()
                getCartData(data)
            }
            else{
                console.log(data.detail)
            }
            }
            catch(error){
                console.log(error)
            }    
        }
    
    const handleCartDelete=async (id)=>{
        const url=`http://127.0.0.1:8000/deletecart/${id}`
        const options={
            method:"DELETE",
        }
        const response=await fetch(url,options)
        if(response.ok){
            console.log("Deleted Successfully")
            getCartData(prev=>prev.filter(each=>each.id!==id))
        }
        else{
            console.log("Error Prompt")
        }
    }

    return(
        <div className='cartContainer'>
            <Header/>
              {cartData.map(each=>(
                  <div key={each.id}>
                    <p>Product ID: {each.product}</p>
                    <p>Quantity: {each.quantity}</p>
                    <p>Total Price: ₹{each.total_price}</p>
                    <button onClick={()=>handleCartDelete(each.id)}>Delete</button>
                  </div>
              ))}
        </div>
    )
}

export default Cart