import { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import { PiDressDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import Header from './Header.jsx'
import './product.css'

const Product=()=>{
    const [productList,setProductList]=useState({user:[]});
    const [selectedDressType,setSelectedDressType]=useState("Casual")
    const [selectedDressSize,setSelectedDressSize]=useState("")
    const navigate=useNavigate()

    const dressTypes=["Casual","Formal","Party","Gym"]
    const dressSize=["Small","Medium","Large","Extra Large"]

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
    },[selectedDressType]);

    const handleNavigation=(id)=>{
        navigate(`/product/${id}`)
    }

    const handleTypeChange=(e)=>{
        setSelectedDressType(e.target.value)
        console.log(selectedDressType)
    }

    const handleSizeChange=(e)=>{
        setSelectedDressSize(e.target.value)
        console.log(selectedDressSize)
    }

    const handleFilter=()=>{
        
    }
     
    return(
        <div className='productContainer'>
            <Header/>
            <div className='bothFilterAndProductContainer'>
               <div className='filterSection'>
                <div className="filterHeading">
                    <h3>Filters</h3>
                    <FaFilter/>
                </div>
                <div>
                    <div className="filterHeading">
                        <h5>Dress Type</h5>
                        <PiDressDuotone/>
                    </div>
                    {dressTypes.map(each=>(
                        <div key={each}>
                            <label htmlFor={each}>
                            <input id={each} type="radio" name="dressType" value={each} checked={selectedDressType===each} onChange={handleTypeChange}/>
                            {each}
                            </label>
                        </div>
                    ))}
                </div>
                
                <div>
                    <div className="filterHeading">
                        <h5>Size</h5>
                        <TbRulerMeasure/>
                    </div>
                    {dressSize.map(each=>(
                        <div key={each}>
                            <input id={each} type="radio" name="dressSize" value={each} checked={selectedDressSize===each} onChange={handleSizeChange}/>
                            <label htmlFor={each}>{each}</label>
                        </div>
                    ))}
                </div>
                <button onClick={handleFilter}>Apply Filter</button>
                
               </div>

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
            
        </div>
    )
}

export default Product