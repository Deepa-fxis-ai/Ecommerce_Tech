import { useState , useEffect} from 'react'
import Cookies from 'js-cookie'
import './topSellingAndArrival.css'

const TopSellingAndArrival=()=>{
    const [productList,setProductList]=useState({user:[]});
    const token=Cookies.get('jwt_token')

    const getProductData=async ()=>{ 
        const url="http://127.0.0.1:8000/product/get/";
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: 'include'
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
     
    return(
        <div>
            <h1 className="newArrival">NEW ARRIVALS</h1>
                {productList.user&&productList.user.length>0?
                <ul>
                  {productList.user.map((each,id)=>(
                    <li key={id}>{each.product_name}</li> 
                  ))}
                </ul>
            :null}
            
           
        </div>
    )
}

export default TopSellingAndArrival