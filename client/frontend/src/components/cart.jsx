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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart=()=>{
    const {t}=useTranslation()
    const {themeStatus}=useContext(LanguageContext)
    const [cartData,getCartData]=useState([])
    const [sumOfTotalPrice,setSumOfTotalPrice]=useState(0)
    const [sumOfQuantity,setSumOfQuantity]=useState(0)
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

    const handleConfirm = () => {
        setOpen(false);
        setPaymentOpen(true)
    };

    const handlePaymentClose=()=>{
        setPaymentOpen(false)
    }

    useEffect(()=>{
            handleCartData()
            console.log(cartData)
        }, []);
    
    const handleCartData=async ()=>{ 
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
              
            if(response.ok){
                const data=await response.json()
                getCartData(data)
            }
            else{
                console.log(data.detail)
            }
            }
            catch(error){
                console.log(error)
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
    },[cartData])

    return(
        <div className={`cartContainer ${theme}`}>
            <Header/>
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
                <DialogTitle>{'payment'}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    payment
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handlePaymentClose}>cancel</Button>
                <Button onClick={handlePaymentClose}>pay</Button>
                </DialogActions>
            </Dialog>         
        </div>
    )
}


export default Cart