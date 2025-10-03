import { useState , useEffect,useContext} from 'react'
import { IoIosStar } from "react-icons/io";
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';
import './topSellingAndArrival.css';
import { LanguageContext } from '../reactContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoadingStatus={
    pending:'PENDING',
    success:'SUCCESS',
    failure:'FAILURE'
}

const TopSellingAndArrival=()=>{
    const {t}=useTranslation()
    const[loadingStatus,setLoadingStatus]=useState(LoadingStatus.pending)
    const {language,themeStatus} =useContext(LanguageContext)
    const [productList,setProductList]=useState({user:[]});
    const [viewMore,setViewMore]=useState(true)
    const [view,setView]=useState(t("topSellingAndArrival.viewMore"))
    const [viewMoreSelling,setViewMoreSelling]=useState(true)
    const [viewSelling,setViewSelling]=useState(t("topSellingAndArrival.viewMore"))
    const token=Cookies.get('jwt_token')
    const theme=themeStatus!=='light'?'dark':'light'
    const navigate=useNavigate()

    const getProductData=async ()=>{ 
        setLoadingStatus(LoadingStatus.pending)
        const url="http://127.0.0.1:8000/product/get/";
        const options={
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            credentials: 'include'
        }
        try{
          const response=await fetch(url,options)
          
        if(response.ok){
            const data=await response.json()
            setProductList(data)
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

    useEffect(()=>{
        getProductData();
    },[]);

    const handleView=()=>{
        setViewMore(prev=>!prev)
        setView(viewMore===false?t("topSellingAndArrival.viewMore"):t("topSellingAndArrival.viewLess"))
    }
    const handleSellingView=()=>{
        setViewMoreSelling(prev=>!prev)
        setViewSelling(viewMoreSelling===false?t("topSellingAndArrival.viewMore"):t("topSellingAndArrival.viewLess"))
    }

    const handleNavigation=(id)=>{
        navigate(`/product/${id}`)
    }

    const successCase=()=>(
        <div className='topContainer'>
            <div className={`desktop ${theme}`}>
                <h1 className={`newArrival ${theme}`} >{t("topSellingAndArrival.newArrival")}</h1>
                <div className='newArivalOrSellingProducts'>
                    <div className="rowSection">
                    {viewMore?
                    
                        productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                    if(index<4){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
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
                    )
                    }})
                    
                    
                    :<p>No Product Available</p>:
                    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
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
                    :<p>No Product Available</p>
                    }
                    
                    </div>
                    <button onClick={handleView} className={`viewButton ${themeStatus!=='light'?'light':'dark'}`}>{view}</button>
                </div>
                <h1 className={`newArrival ${theme}`}>{t("topSellingAndArrival.topSelling")}</h1>
                <div className='newArivalOrSellinProducts'>
                    <div className="rowSection">
                    {viewMoreSelling?
    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                    if((index<6) && (each.ratings>3)){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
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
                    )
                }})
                    :<p>No Product Available</p>:
                    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                        if(each.ratings>3){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
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
                    )}})
                    :<p>No Product Available</p>
                    }
                </div>
                </div>
                <button onClick={handleSellingView} className={`viewButton ${themeStatus!=='light'?'light':'dark'}`}>{viewSelling}</button>
            </div>
            <div className={`mobile ${theme}`}>
                <h1 className={`newArrival ${theme}`}>{t("topSellingAndArrival.newArrival")}</h1>
                <div className='newArivalOrSellingProducts'>
                    <div className="rowSection">
                    {viewMore?
                    
                        productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                    if(index<2){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>{each.product_name}</h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                return <span key={i}><IoIosStar/></span>
                                })}
                                </div>
                                <p>{each.price}</p>
                            </div>
                        </div> 
                    )
                    }})
                    
                    
                    :<p>No Product Available</p>:
                    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>{each.product_name}</h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                return <span key={i}><IoIosStar/></span>
                                })}
                                </div>
                                <p>{each.price}</p>
                            </div>
                        </div> 
                    ))
                    :<p>No Product Available</p>
                    }
                    
                    </div>
                    <button onClick={handleView} className={`viewButton ${themeStatus!=='light'?'light':'dark'}`}>{view}</button>
                </div>
                <h1 className={`newArrival ${theme}`}>{t("topSellingAndArrival.topSelling")}</h1>
                <div className='newArivalOrSellinProducts'>
                    <div className="rowSection">
                    {viewMoreSelling?
    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                    if((index<5) && (each.ratings>3)){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>{each.product_name}</h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                return <span key={i}><IoIosStar/></span>
                                })}
                                </div>
                                <p>{each.price}</p>
                            </div>
                        </div> 
                    )
                }})
                    :<p>No Product Available</p>:
                    
                    productList.user&&productList.user.length>0?
                    productList.user.map((each,index)=>{
                        if(each.ratings>3){
                        return(
                        <div key={index} className='productArrival' onClick={()=>handleNavigation(each.id)}>
                            <img src={each.image_url} className='productImage'/>
                            <div>
                                <h4>{each.product_name}</h4>
                                <div>
                                    {Array.from({length: each.ratings}).map((_, i)=>{
                                return <span key={i}><IoIosStar/></span>
                                })}
                                </div>
                                <p>{each.price}</p>
                            </div>
                        </div> 
                    )}})
                    :<p>No Product Available</p>
                    }
                </div>
                </div>
                <button onClick={handleSellingView} className={`viewButton ${themeStatus!=='light'?'light':'dark'}`}>{viewSelling}</button>
            </div>
        </div>
    )

    const failureCase=()=>(
        <div className='topContainer'>
            Something went wrong
        </div>
    )

    const loadingCase=()=>(
        <div className='topContainer'>
            Loading...
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
       <>
        {returnElements()}
       </>
    )
}

export default TopSellingAndArrival