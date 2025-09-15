import {useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import Header from './Header.jsx'
import Cookies from 'js-cookie'
import './productDetails.css'

const ProductDetail=()=>{
    const [productDetail,setProductDetail]=useState(null)
    const [cartQuantity,setCartQuantity]=useState(1)
    const {id}=useParams()
    const navigate=useNavigate()
    const token=Cookies.get('jwt_token')

    const getProductData=async ()=>{ 
        const url=`http://127.0.0.1:8000/product/detail/${id}`;
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        }
        try{
          const response=await fetch(url,options)
          
        if(response.ok){
            const data=await response.json()
            setProductDetail(data)
        }
        else{
            console.log(data.detail)
        }
        }
        catch(error){
            console.log(error)
        }    
    }

     const handleCartData=async (productId)=>{ 
        if(!token){
            alert("Please logged in to add to cart")
            navigate("/login")
        }
        const url=`http://127.0.0.1:8000/cart/`;
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            "body": JSON.stringify({product: productId,quantity: cartQuantity,}),
        }
        try{
          const response=await fetch(url,options)
          
        if(response.ok){
            const data=await response.json()
            navigate("/cart")
        }
        else{
            console.log(data.detail)
        }
        }
        catch(error){
            console.log(error)
        }    
    }

    const handleDecrement=()=>{
        setCartQuantity(prev=>{
            if(prev>0){
               return prev-1
            }
            else{
                return 0
            }
        })
    }
    const handleIncrement=()=>{
        setCartQuantity(prev=>prev+1)
    }

    useEffect(()=>{
        getProductData()
    },[id]);

    return(
       <div className='mainContainer'>
            <Header/>
            {!productDetail ? (
            <p>Loading...</p>
            ) : (
                <div className='SingleProductDetail'>
                  <img src={productDetail.image_url} className='productSingleImage'/>
                  <div>
                    <h3>{productDetail.product_name}</h3>
                    <div>
                    {Array.from({length: productDetail.ratings}).map((_, i)=>{
                    return <span key={i}><IoIosStar/></span>
                    })}
                    </div>
                    <p>Rs.{productDetail.price}</p>
                    <p>{productDetail.description}</p>
                    <div className='size'>
                        <p className='para'>Small</p>
                        <p className='para'>Medium</p>
                        <p className='para'>Large</p>
                        <p className='para'>Extra Large</p>
                    </div>
                    <div className='quantity'>
                        <button onClick={handleDecrement} className='faButton'><FaMinus /></button>
                        {cartQuantity}
                        <button onClick={handleIncrement} className='faButton'><FaPlus /></button>
                    </div>
                    <button className='button' onClick={()=>{handleCartData(productDetail.id)}}>Add to Cart</button>
                  </div>
                </div>
            )}
     </div>
        )
}


export default ProductDetail