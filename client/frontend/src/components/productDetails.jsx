import {useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

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

    useEffect(()=>{
        getProductData()
    },[id]);

    return(
       <div>
            {!productDetail ? (
            <p>Loading...</p>
            ) : (
                <div>
                  <p>{productDetail.product_name}</p>
                  <input type="number" min="1" value={cartQuantity} onChange={(e)=>setCartQuantity(parseInt(e.target.value))}/>
                  <button onClick={()=>{handleCartData(productDetail.id)}}>Add to Cart</button>
                </div>
            )}
     </div>
        )
}

export default ProductDetail