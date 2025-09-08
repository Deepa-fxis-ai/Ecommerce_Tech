import { useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import { PiDressDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import Header from './Header.jsx'
import './product.css'

const Product=()=>{
    const [productList,setProductList]=useState([]);
    const [selectedDressType,setSelectedDressType]=useState("Casual")
    const [selectedDressSize,setSelectedDressSize]=useState("")
    const [filteredProducts,setFilteredProducts]=useState([])
    const navigate=useNavigate()

    const dressTypes=[
       {code:'C',label:'Casual'},
       {code:'F',label:'Formal'},
       {code:'P',label:'Party'},
       {code:'G',label:'Gym'}]

      const dressSize=[
        {code:'1',label:'Small'},
        {code:'2',label:'Medium'},
        {code:'3',label:'Large'},
        {code:'4',label:'Extra Large'}
       ]
 
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
            setProductList(data.user)
            setFilteredProducts(data.user)
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
        
    }

    const handleSizeChange=(e)=>{
        setSelectedDressSize(e.target.value)
        
    }

    const handleFilter=()=>{
       const filtered=productList.filter(each=>each.dressType === selectedDressType || each.size===selectedDressSize)
       setFilteredProducts(filtered)   
    }

    const handleSearchedProducts=(e)=>{
        const loweredcase=e.target.value.toLowerCase()
        const search=productList.filter(each=>{
            const lowerProductName=each.product_name.toLowerCase()
            return(
              lowerProductName.includes(loweredcase)
            )
            })
        setFilteredProducts(search)
    }
     
    return(
        <div className='productContainer'>
            <Header/>
            <div className='bothFilterAndProductContainer'>
               <div className='filterSection'>
                <input type="search" className='searchContainer' placeholder='Search Products' onChange={handleSearchedProducts}/>
                <div className="filterHeading">
                    <h3>Filters</h3>
                    <FaFilter/>
                </div>
                <div>
                    <div className="filterHeading">
                        <h5>Dress Type</h5>
                        <PiDressDuotone/>
                    </div>
                    <div class="filterAlignment">
                        {dressTypes.map(each=>(
                                <label key={each.code}>
                                <input id={each} type="radio" name="dressType" value={each.code} checked={selectedDressType===each.code} onChange={handleTypeChange}/>
                                {each.label}
                                </label>
                        ))}
                    </div>
                </div>
                
                <div>
                    <div className="filterHeading">
                        <h5>Size</h5>
                        <TbRulerMeasure/>
                    </div>
                    <div class="filterAlignment">
                        {dressSize.map(each=>(
                            <label key={each.code}>
                                <input type="radio" name="dressSize" value={each.code} checked={selectedDressSize===each.code} onChange={handleSizeChange}/>
                                {each.label}
                            </label>
                        ))}
                    </div>
                </div>
                <button onClick={handleFilter}>Apply Filter</button>
                
               </div>

               <div className='productSection'>
                    {filteredProducts.length>0?
                    filteredProducts.map((each,index)=>(
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