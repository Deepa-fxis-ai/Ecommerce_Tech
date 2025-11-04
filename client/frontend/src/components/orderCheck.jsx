import { useState,useEffect,useContext} from 'react';
import { LanguageContext } from '../reactContext.jsx';
import Cookies from 'js-cookie'
import './orderCheck.css'


const OrderCheck=()=>{
  const {onhandleOrderCheckStatus}=useContext(LanguageContext)
  const [orderData,setOrderData]=useState([])

  const token=Cookies.get('jwt_token')

  const handleOrderData=async()=>{
     const url="http://127.0.0.1:8000/user-order-list/"
     const options={
        method:'GET',
        headers:{
           "Content-Type":'application/json',
           "Authorization": `Bearer ${token}`
        }
     }
     const response=await fetch(url,options)
     const data=await response.json()
     if(response.ok){
        const sortedDataBasedDate=data.sort((a,b)=>new Date(b.order_date)-new Date(a.order_date))
        setOrderData(sortedDataBasedDate)
        console.log(data)
        console.log(sortedDataBasedDate)
     }
     else{
        console.log("Something went wrong")
     }
  } 

  

  useEffect(()=>{
    handleOrderData() 
  },[])


    return(
      <div className='orderContainer'>
        <div className='cancelIcon'>
          <button type='button' onClick={onhandleOrderCheckStatus}>X</button>
        </div>
        {orderData && orderData.length > 0 ? (
         orderData.map(each => (
            <div key={each.id} className={`box ${each.status==='pending'?'pending': each.status==='shipped'?'shipped':'success'}`}>
               <img src={each.order_product.image_url} className='image'/>
               <div className='elementContainer'>
                  <h5 className='element'>{each.order_product.product_name}</h5>
                  <p className='element'>Rs.{each.order_product.price}</p>
                  <p className='element'>{each.status==='pending'?'Pending': each.status==='shipped'?'Shipped':'Order Delivered Successfully'}</p>
               </div>
            </div>
         ))
         ) : (
         <p>No orders found</p>
         )}
    </div>
    )
}

export default OrderCheck