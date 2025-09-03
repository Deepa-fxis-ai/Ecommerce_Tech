import { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from './Header.jsx'
import './product.css'

const Product=()=>{
    const [productList,setProductList]=useState({user:[]});
    const navigate=useNavigate()

    const getProductData=async ()=>{ 
        const url="http://127.0.0.1:8000/product/get/";
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
        }
        try{
          const response=await fetch(url,options)
          
        if(response.ok){
            const data=await response.json()
            setProductList(data)
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
        getProductData();
    },[]);

    const handleNavigation=(id)=>{
        navigate(`/product/${id}`)
    }
     
    return(
        <div className='productContainer'>
            <Header/>
            <div className='productSection'>
                {productList.user&&productList.user.length>0?
                productList.user.map((each,index)=>(
                      <div key={index} className='productCard' onClick={()=>handleNavigation(each.id)}>
                        <img src={each.image_url} className='productImage'/>
                        <div>
                            <h4>{each.product_name}</h4>
                            <p>{each.ratings}</p>
                            <p>{each.price}</p>
                        </div>
                      </div> 
                ))
                :<p>No Product Available</p>} 
           </div>
        </div>
    )
}

export default Product