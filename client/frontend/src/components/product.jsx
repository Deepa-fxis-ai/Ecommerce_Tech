import { useState , useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { FaFilter } from "react-icons/fa";
import { PiDressDuotone } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import { IoIosPricetag,IoIosStar } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Slider from '@mui/material/Slider'
import { useTranslation } from 'react-i18next';
import Header from './Header.jsx'
import './product.css'
import { LanguageContext } from '../reactContext.jsx';

const Product=()=>{
    const {t}=useTranslation()
    const {language,themeStatus} =useContext(LanguageContext)
    const [productList,setProductList]=useState([]);
    const [selectedDressType,setSelectedDressType]=useState("")
    const [selectedDressSize,setSelectedDressSize]=useState("")
    const [filteredProducts,setFilteredProducts]=useState([])
    const [filterStatus,setFilterStatus]=useState(false)
    const [priceRange,setPriceRange]=useState([0,5000])
    const [rating,setRating]=useState(0)
    const navigate=useNavigate()
    const theme=themeStatus==='light'?'light':'dark'

    const dressTypes=[
       {code:'C',label:t("product.casual")},
       {code:'F',label:t("product.formal")},
       {code:'P',label:t("product.party")},
       {code:'G',label:t("product.gym")}]

      const dressSize=[
        {code:'1',label:t("product.small")},
        {code:'2',label:t("product.medium")},
        {code:'3',label:t("product.large")},
        {code:'4',label:t("product.xlarge")}
       ]
 
    const getProductData=async ()=>{ 
        const url=`http://127.0.0.1:8000/product/get/`;
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
            console.log(data)
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

    const onHandlePriceRange=((event,newVal)=>setPriceRange(newVal))


    const handleFilter=()=>{
        const [min,max]=priceRange
        let filtered=[...productList]

        if(selectedDressType){
           filtered=filtered.filter(each=>each.dressType === selectedDressType)
        }

        if(selectedDressSize!==""){
           filtered=filtered.filter(each=>each.size.includes(Number(selectedDressSize)))
        }

        filtered=filtered.filter(each=>each.price>=min && each.price<=max)

        if(rating!==0){
            filtered=filtered.filter(each=>each.ratings===rating)
        }
       
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

    const handleFilterStatus=()=>{
        setFilterStatus(prev=>!prev)
    }

    const handleCancelButton=()=>{
        setFilterStatus(prev=>!prev)
    }

     
    return(
        <div className='productContainer'>
            <Header/>
            <div className={`bothFilterAndProductContainer ${theme}`}>
               <div className='filterSection'>
                <input type="search" className='searchContainer' placeholder={t("product.search")} onChange={handleSearchedProducts}/>
                <div className="filterHeading">
                    <h3>{t("product.filters")}</h3>
                    <FaFilter/>
                </div>
                <div>
                    <div className="filterHeading">
                        <h5>{t("product.dressType")}</h5>
                        <PiDressDuotone/>
                    </div>
                    <div className="filterAlignment">
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
                        <h5>{t("product.size")}</h5>
                        <TbRulerMeasure/>
                    </div>
                    <div className="filterAlignment">
                        {dressSize.map(each=>(
                            <label key={each.code}>
                                <input type="radio" name="dressSize" value={each.code} checked={selectedDressSize===each.code} onChange={handleSizeChange}/>
                                {each.label}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="filterHeading">
                        <h5>{t("product.price")}</h5>
                        <IoIosPricetag/>
                    </div>
                    <div className="filterAlignment">
                        <Slider value={priceRange} onChange={onHandlePriceRange} valueLabelDisplay="on" min={0} max={5000} step={100}/>
                    </div>
                </div>

                <div>
                    <div className="filterHeading">
                        <h5>{t("product.ratings")}</h5>
                    </div>
                    <div>
                        {Array.from({length:5}).map((_,i)=>(
                            <button key={i} className={`starContainer ${themeStatus==='light'?'light':'dark'}`} onClick={()=>setRating(i+1)}> 
                                 {Array.from({length:i+1}).map((_,j)=>(
                                   <span key={j}><FaStar/></span> 
                                 ))}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={handleFilter} className={`applyButton ${themeStatus==='light'?'dark':'light'}`}>{t("product.applyButton")}</button>
                
               </div>

               <div className='productSection'>
                    {filteredProducts.length>0?
                    filteredProducts.map((each,index)=>(
                        <div key={index} className='productCard' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>
                                {each.translations.find(t => t.language === language)?.name || each.product_name}
                                </h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                      return <span key={i}><IoIosStar/></span>
                                    })}
                                </div>
                                <p>{each.price}</p>
                            </div>
                        </div> 
                    ))
                    :<p>No Product Available</p>} 
              </div>

            </div>

            <div className={`bothFilterAndProductContainerInMobile ${theme}`}>
               <div className='filterSectionMobile'>
                <input type="search" className='searchContainer' placeholder={t("product.search")} onChange={handleSearchedProducts}/>
                <button onClick={handleFilterStatus} className="filterHeading">
                    <h3>{t("product.filters")}</h3>
                    <FaFilter/>
                </button>
                
               </div>

               {filterStatus?
                    <div className='filterThings'>
                        <div className='cancelAndHeading'>
                            <h5>{t("product.filterHeading")}</h5>
                            <button className='cancel' onClick={handleCancelButton}>
                                <MdCancel/>
                            </button>
                        </div>
                        <div className='eachFilterBorder'>
                            <div className="filterHeading">
                                <h5>{t("product.dressType")}</h5>
                                <PiDressDuotone/>
                            </div>
                            <div className="filterAlignment">
                                {dressTypes.map(each=>(
                                        <label key={each.code}>
                                        <input id={each} type="radio" name="dressType" value={each.code} checked={selectedDressType===each.code} onChange={handleTypeChange}/>
                                        {each.label}
                                        </label>
                                ))}
                            </div>
                        </div>

                        <div className='eachFilterBorder'>
                            <div className="filterHeading">
                                <h5>{t("product.size")}</h5>
                                <TbRulerMeasure/>
                            </div>
                            <div className="filterAlignment">
                                {dressSize.map(each=>(
                                    <label key={each.code}>
                                        <input type="radio" name="dressSize" value={each.code} checked={selectedDressSize===each.code} onChange={handleSizeChange}/>
                                        {each.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="filterHeading">
                                <h5>{t("product.price")}</h5>
                                <IoIosPricetag/>
                            </div>
                            <div className="filterAlignment">
                                <Slider value={priceRange} onChange={onHandlePriceRange} valueLabelDisplay="on" min={0} max={5000} step={100}/>
                            </div>
                        </div>

                        <div>
                    <div className="filterHeading">
                        <h5>{t("product.ratings")}</h5>
                    </div>
                    <div>
                        {Array.from({length:5}).map((_,i)=>(
                            <button key={i} className='starContainer' onClick={()=>setRating(i+1)}> 
                                 {Array.from({length:i+1}).map((_,j)=>(
                                   <span key={j}><FaStar/></span> 
                                 ))}
                            </button>
                        ))}
                    </div>
                        </div>
                    
                    <button onClick={handleFilter} className='applyButton'>{t("product.applyButton")}</button>
                    </div>:
               null
               }

               

               <div className='productSection'>
                    {filteredProducts.length>0?
                    filteredProducts.map((each,index)=>(
                        <div key={index} className='productCard' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>
                                {each.translations.find(t => t.language === language)?.name || each.product_name}
                                </h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                return <span key={i}><IoIosStar/></span>
                                })}
                                </div>
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