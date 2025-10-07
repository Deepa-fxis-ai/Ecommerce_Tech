import {useState,useEffect,useContext} from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import Header from './Header.jsx'
import Cookies from 'js-cookie'
import './productDetails.css'
import { LanguageContext } from '../reactContext.jsx';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingStatus={
    pending:'PENDING',
    success:'SUCCESS',
    failure:'FAILURE'
}

const ProductDetail=()=>{
    const {language,themeStatus}=useContext(LanguageContext)
    const[loadingStatus,setLoadingStatus]=useState(LoadingStatus.pending)
    const [productDetail,setProductDetail]=useState(null)
    const [cartQuantity,setCartQuantity]=useState(1)
    const [cartSize,setCartSize]=useState("M")
    const {id}=useParams()
    const navigate=useNavigate()
    const token=Cookies.get('jwt_token')
    const theme=themeStatus==='light'?'light':'dark'
    const [quanLimit,setQuanLimit]=useState(false)

    const getProductData=async ()=>{ 
        setLoadingStatus(LoadingStatus.pending)
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
            console.log(data)
            setLoadingStatus(LoadingStatus.success)
        }
        else{
            console.log(data.detail)
            setLoadingStatus(LoadingStatus.failure)
        }
        }
        catch(error){
            console.log(error)
            setLoadingStatus(LoadingStatus.failure)
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
            "body": JSON.stringify({product: productId,quantity: cartQuantity,carted_size: cartSize}),
        }
        try{
          const response=await fetch(url,options)
          const data=await response.json()
            if(response.ok){   
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
        setQuanLimit(false)
    }
    const handleIncrement=()=>{
        if(productDetail.stocks>=cartQuantity){
             setCartQuantity(prev=>prev+1)
        }
        else{
            setQuanLimit(true)
        }
        
    }

    useEffect(()=>{
        getProductData()
    },[id]);

    const successCase=()=>(
             <div className={`mainContainer ${theme}`}>
                {!productDetail ? (
                <p>Loading...</p>
                ) : (
                    <div className='SingleProductDetail'>
                    <img src={productDetail.image_url} className='productSingleImage'/>
                    <div>
                        <h3>{productDetail.translations.find(t=>t.language===language)?.name||productDetail.product_name}</h3>
                        <p>{productDetail.translations.find(t=>t.language===language)?.description||productDetail.description}</p>
                        <p>Rs.{productDetail.price}</p>
                        <div>
                        {Array.from({length: productDetail.ratings}).map((_, i)=>{
                        return <span key={i}><IoIosStar/></span>
                        })}
                        </div>
                        <div className='size'>
                            <button className='para' onClick={()=>setCartSize('S')}>Small</button>
                            <button className='para' onClick={()=>setCartSize('M')}>Medium</button>
                            <button className='para' onClick={()=>setCartSize('L')}>Large</button>
                            <button className='para' onClick={()=>setCartSize('XL')}>Extra Large</button>
                        </div>
                        <div className='cartAndQuantity'>
                            <div className='quantity'>
                                <button onClick={handleDecrement} className='faButton'><FaMinus /></button>
                                {cartQuantity}
                                <button onClick={handleIncrement} className='faButton'><FaPlus /></button>
                            </div>
                            <button className={`button ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={()=>{handleCartData(productDetail.id)}}>Add to Cart</button>
                        </div>
                        {productDetail.stocks===0&&<p className='availbility'>Not Available</p>}
                        {quanLimit&&<p className='availbility'>Your product quantity was too higher than avaliable stocks.Please reduce your quantity</p>}
                    </div>
                    
                    </div>
                )}
            </div>  
            )
        
        const failureCase=()=>(
            <div className={`failureContainer ${theme}`}>
                <h5>Something went wrong </h5>
                <button className={`button ${theme}`} onClick={getProductData}>Retry</button>
            </div>
        )
    
        const loadingCase=()=>(
            <div className={`failureContainer ${theme}`}>
                    <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                    <CircularProgress color="inherit" />
                </Stack>
            </div>
        )
    
        const returnElements=()=>{
            switch(loadingStatus){
                case LoadingStatus.pending:
                    return loadingCase();
                case LoadingStatus.failure:
                    return failureCase();
                case LoadingStatus.success:
                    return successCase();
                default:
                    null
            }
        }
    

    return(
       <div>
            <Header/>
            {returnElements()}
     </div>
        )
}


export default ProductDetail