import { useState ,useEffect,useContext} from 'react'
import Cookies from 'js-cookie'
import Header from './Header.jsx'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../reactContext.jsx';
import './cart.css'

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingStatus={
    pending:'PENDING',
    success:'SUCCESS',
    failure:'FAILURE'
}

const paymentMethods=[
    {code:'COD',label:'Cash On Delivery'},
    {code:'OP',label:'Paypal'}]

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart=()=>{
    const {t}=useTranslation()
    const[loadingStatus,setLoadingStatus]=useState(LoadingStatus.pending)
    const {themeStatus}=useContext(LanguageContext)
    const [cartData,getCartData]=useState([])
    const [sumOfTotalPrice,setSumOfTotalPrice]=useState(0)
    const [sumOfQuantity,setSumOfQuantity]=useState(0)
    const [payment,setPayment]=useState('COD')
    const [codMode,setCodMode]=useState(true)
    const token=Cookies.get('jwt_token')
    const theme=themeStatus==='light'?'light':'dark'
    const [open, setOpen] = useState(false);
    const [paymentOpen,setPaymentOpen]=useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async() => {
       setOpen(false);
       setPaymentOpen(true)
    };

    const handlegetOrder=async ()=>{
         const url="http://127.0.0.1:8000/create-order/"
        const options={
           method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            "body": JSON.stringify({payment_mode:payment}),
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok){
           console.log(data)
           getCartData([]);  
           alert('Product has been succesfully ordered')
        }
    }

    const handlePaymentClose=()=>{
        setPaymentOpen(false)
    }

    const handlePaymentMethods=(e)=>{
       setPayment(e.target.value)
       setCodMode(e.target.value === "COD");
       console.log(e.target.value)
    }

    useEffect(()=>{
            handleCartData()
            console.log(cartData)
        }, []);
    
    const handleCartData=async ()=>{ 
            setLoadingStatus(LoadingStatus.pending)
            const url=`http://127.0.0.1:8000/cart/`;
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
            }
            try{
              const response=await fetch(url,options)
              const data=await response.json()
            if(response.ok){
                
                getCartData(data) 
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
    
    const handleCartDelete=async (id)=>{
        const url=`http://127.0.0.1:8000/deletecart/${id}`
        const options={
            method:"DELETE",
        }
        const response=await fetch(url,options)
        if(response.ok){
            console.log("Deleted Successfully")
            getCartData(prev=>prev.filter(each=>each.id!==id))
        }
        else{
            console.log("Error Prompt")
        }
    }

    const calculate=data=>{
       const sum=data.reduce((acc,each)=>acc+each.total_price,0)
       const quantity=data.reduce((acc,each)=>acc+each.quantity,0)
       setSumOfTotalPrice(sum)
       setSumOfQuantity(quantity)
    }
    
    useEffect(()=>{
        calculate(cartData)
        console.log(cartData)
    },[cartData])

    const successCase=()=>(
           <>
             <table className={themeStatus==='light'?'darkborder':'lightborder'}>
                <thead>
                <tr className='cartList'>
                    <th>{t("cart.productId")}</th>
                    <th>{t("cart.size")}</th>
                    <th>{t("cart.quantity")}</th>
                    <th>{t("cart.totalPrice")}</th>
                    <th>{t("cart.cancel")}</th>
                </tr>
                </thead>
                <tbody>
                     {cartData.map(each=>(
                    
                        <tr key={each.id} className='cartList'>
                            <td>{each.product}</td>
                            <td>{each.carted_size}</td>
                            <td>{each.quantity}</td>
                            <td>₹{each.total_price}</td>
                            <td>
                              <button onClick={()=>handleCartDelete(each.id)}><MdOutlineDeleteOutline/></button>
                            </td>
                        </tr>                    
                    ))}
                </tbody>
            </table> 
            <div className='total'>
                <p>{t("cart.totalQuantity")}: {sumOfQuantity}</p>
                <p>{t("cart.totalAmount")}: {sumOfTotalPrice}</p> 
                <button className={`button ${themeStatus === 'light' ? 'dark' : 'light'}`} onClick={handleClickOpen}>{t("cart.order")}</button>
                
            </div> 
            <Dialog
                open={open}
                slots={{
                transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{t("cart.orderConfirmation")}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {t("cart.orderConfirm")}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>{t("cart.cancel")}</Button>
                <Button onClick={handleConfirm}>{t("cart.confirm")}</Button>
                </DialogActions>
            </Dialog> 

            <Dialog
                open={paymentOpen}
                slots={{
                transition: Transition,
                }}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Payment'}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                       <span>You can choose any one of the payment options given below</span><br/>
                    {
                        paymentMethods.map(each=>(
                            <label key={each.code} htmlFor='paymentMethod'>
                               <input type="radio" name="paymentMethod" value={each.code} checked={payment === each.code} onChange={handlePaymentMethods}/>
                               {each.label}
                            </label>
                        ))
                    } 
                    
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlePaymentClose}>cancel</Button>
                {codMode===false?
                <PayPalScriptProvider options={{ "client-id": "Aa_YDPt_61B4koqe93BhUSXOyM3YB8FW4wqZiBKPAkWZNgz9Skv-BVIn9sACOUhPYPClaTk0nvwxswTs" }}>
                  <PayPalButtons style={{ layout: "vertical" }} onClick={handlegetOrder}/>
                </PayPalScriptProvider>:
                <Button onClick={handlegetOrder}>Order</Button>
                }
                
                </DialogActions>
            </Dialog>  
           </>
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
        <div className={`cartContainer ${theme}`}>
            <Header/>
            {returnElements()}        
        </div>
    )
}


export default Cart