import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './orderManage.css'

const OrderManage=()=>{
    const [orderList,setOrderList]=useState([])
    const [orderId,setOrderId]=useState(0)


    const getOrderData=async ()=>{ 
        const url=`http://127.0.0.1:8000/order/`;
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
            const updatedOrder=data.orders.map(each=>({
                ...each,
                isShipped:false,
                isSuccess:false
            }))
            setOrderList(updatedOrder)
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
    
    const handleShipSuccessButtons=(Id)=>{
        setOrderList((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === Id) {
          if (!order.isShipped) {
            return { ...order, isShipped: true };
          } else if (!order.isSuccess) {
            return { ...order, isSuccess: true };
          }
        }
        return order;
      })
    );
    }

    useEffect(()=>{getOrderData()
        console.log(orderList)
    },[]);

    return(
        <div> 
         
            <div>
           <TableContainer component={Paper} sx={{width:'90vw',pl:'0px'}}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Payment Mode</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {orderList.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },bgcolor: row.stocks===0?'red':'white'}}
                    >
                    <TableCell component="th" scope="row">
                        {row.order_user?.id || "-"}
                    </TableCell>
                    <TableCell>{row.order_user?.username||"-"}</TableCell>
                    <TableCell>{row.order_product?.product_name||"-"}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.payment_mode}</TableCell>
                    <TableCell align="right">{row.total_price}</TableCell>
                     <TableCell align="right">
                     {!row.isShipped ? (
                            <button
                            className="shipButton"
                            onClick={() => handleShipSuccessButtons(row.id)}
                            >
                            Shipped
                            </button>
                        ) : !row.isSuccess ? (
                            <button
                            className="successButton"
                            onClick={() => handleShipSuccessButtons(row.id)}
                            >
                            Success
                            </button>
                        ) : (
                            <span className="completedText">Completed</span>
                        )}
                      
                     </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
          </div>
         
          
        </div>
    )
}

export default OrderManage