import { useState , useEffect} from 'react'
import { IoIosStar } from "react-icons/io";
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';
import './topSellingAndArrival.css'

const TopSellingAndArrival=()=>{
    const {t}=useTranslation()
    const [productList,setProductList]=useState({user:[]});
    const [viewMore,setViewMore]=useState(true)
    const [view,setView]=useState(t("topSellingAndArrival.viewMore"))
    const [viewMoreSelling,setViewMoreSelling]=useState(true)
    const [viewSelling,setViewSelling]=useState(t("topSellingAndArrival.viewMore"))
    const token=Cookies.get('jwt_token')


    const getProductData=async ()=>{ 
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

    const handleView=()=>{
        setViewMore(prev=>!prev)
        setView(viewMore===false?t("topSellingAndArrival.viewMore"):t("topSellingAndArrival.viewLess"))
    }
    const handleSellingView=()=>{
        setViewMoreSelling(prev=>!prev)
        setViewSelling(viewMoreSelling===false?t("topSellingAndArrival.viewMore"):t("topSellingAndArrival.viewLess"))
    }

     
    return(
        <div className='topContainer'>
            <div className='desktop'>
                <h1 className="newArrival">{t("topSellingAndArrival.newArrival")}</h1>
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
                    <button onClick={handleView} className='viewButton'>{view}</button>
                </div>
                <h1 className="newArrival">{t("topSellingAndArrival.topSelling")}</h1>
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
                <button onClick={handleSellingView} className='viewButton'>{viewSelling}</button>
            </div>
             <div className='mobile'>
                <h1 className="newArrival">{t("topSellingAndArrival.newArrival")}</h1>
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
                    <button onClick={handleView} className='viewButton'>{view}</button>
                </div>
                <h1 className="newArrival">{t("topSellingAndArrival.topSelling")}</h1>
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
                <button onClick={handleSellingView} className='viewButton'>{viewSelling}</button>
            </div>
        </div>
    )
}

export default TopSellingAndArrival