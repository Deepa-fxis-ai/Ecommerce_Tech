import { useState ,useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from './Header.jsx'
import { MdOutlineDeleteOutline } from "react-icons/md";
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
            <table>
                <tr className='cartList'>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Cancel Cart</th>
                </tr>
                     {cartData.map(each=>(
                        <tr key={each.id} className='cartList'>
                            <td>{each.product}</td>
                            <td>{each.quantity}</td>
                            <td>₹{each.total_price}</td>
                            <button onClick={()=>handleCartDelete(each.id)}><MdOutlineDeleteOutline/></button>
                        </tr>
              ))}
                
            </table>



             
        </div>
    )
}

export default Cart