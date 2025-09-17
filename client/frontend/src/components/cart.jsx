import { useState ,useEffect} from 'react'
import Cookies from 'js-cookie'
import Header from './Header.jsx'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import './cart.css'

const Cart=()=>{
    const {t}=useTranslation()
    const [cartData,getCartData]=useState([])
    const [sumOfTotalPrice,setSumOfTotalPrice]=useState(0)
    const [sumOfQuantity,setSumOfQuantity]=useState(0)
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

    const calculate=data=>{
       const sum=data.reduce((acc,each)=>acc+each.total_price,0)
       const quantity=data.reduce((acc,each)=>acc+each.quantity,0)
       setSumOfTotalPrice(sum)
       setSumOfQuantity(quantity)
    }
    
    useEffect(()=>{
        calculate(cartData)
    },[cartData])

    return(
        <div className='cartContainer'>
            <Header/>
            <table>
                <thead>
                <tr className='cartList'>
                    <th>{t("cart.productId")}</th>
                    <th>{t("cart.quantity")}</th>
                    <th>{t("cart.totalPrice")}</th>
                    <th>{t("cart.cancel")}</th>
                </tr>
                </thead>
                <tbody>
                     {cartData.map(each=>(
                    
                        <tr key={each.id} className='cartList'>
                            <td>{each.product}</td>
                            <td>{each.quantity}</td>
                            <td>₹{each.total_price}</td>
                            <td>
                              <button onClick={()=>handleCartDelete(each.id)}><MdOutlineDeleteOutline/></button>
                            </td>
                        </tr>                    
                    ))}
                </tbody>
            </table> 
            <div className='total'>
                <p>{t("cart.totalQuantity")}: {sumOfQuantity}</p>
                <p>{t("cart.totalAmount")}: {sumOfTotalPrice}</p> 
                <button className='button'>{t("cart.order")}</button>
                <button></button>
            </div>          
        </div>
    )
}

export default Cart