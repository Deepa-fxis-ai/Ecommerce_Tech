import { useState,useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './orderManage.css'
//for date picker
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField'

import TablePagination from '@mui/material/TablePagination';


const OrderManage=()=>{
    const [orderList,setOrderList]=useState([])
    const [orderId,setOrderId]=useState(null)
    const [status,setStatus]=useState("pending")
    const [value, setValue] = useState(dayjs());
    const [allOrders,setAllOrders]=useState([])
    const [dropDownValue,setDropDownValue]=useState("")
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                isShipped:each.status==="shipped",
                isSuccess:each.status==='success'
            })) 
            setOrderList(updatedOrder)
            setAllOrders(updatedOrder) //this is a copy of updateOrder because orderlist might be changed on another functionalities
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

    const getOrderUpdate=async(orderId,newStatus)=>{
      const url=`http://127.0.0.1:8000/order/update-delete/${orderId}`
      const options={
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({status:newStatus})
      }
      const response=await fetch(url,options)
      if(response.ok){
        alert("Updated Successfully")
        console.log(status)
        getOrderData()
      }
      else{
        alert("Something Went Wrong")
      }
    }
   
    const handleShipSuccessButtons = async (Id) => {
        let newStatus = "";

        setOrderList((prevOrders) =>
            prevOrders.map((order) => {
            if (order.id === Id) {
                if (order.status === "pending") {
                newStatus = "shipped";
                return { ...order, status: "shipped" };
                } else if (order.status === "shipped") {
                newStatus = "success";
                return { ...order, status: "success" };
                }
            }
            return order;
            })
        );

        if (newStatus) {
            await getOrderUpdate(Id, newStatus);
        }
    };

    const filterBasedOnDate=(newValue)=>{
      setValue(newValue)
      if (!newValue) {
      getOrderData();
      setPage(0);
      return;
      }
      const formattedDate = newValue.format("YYYY-MM-DD");
      const filterDataBasedDate=allOrders.filter(each=>{
        const orderDate = dayjs(each.order_date).format("YYYY-MM-DD");
        return orderDate === formattedDate;
        
      })
  
      setOrderList(filterDataBasedDate)
      setPage(0);
    }

    const resetDate=()=>{
        setValue(dayjs())
        setOrderList(allOrders)
        setPage(0);
    }

    const fetchPending=()=>{
       const filter=allOrders.filter(each=>each.status==='pending')
       console.log("Pending Orders:", filter);
       setOrderList(filter)
       setPage(0);
    }

    const fetchShipped=()=>{
       const filter=allOrders.filter(each=>each.status==='shipped')
       console.log("Shipped Orders:", filter);
       setOrderList(filter)
       setPage(0);
    }

    const fetchCompleted=()=>{
       const filter=allOrders.filter(each=>each.status==='success')
       setOrderList(filter)
       setPage(0);
    }

    useEffect(()=>{getOrderData()},[]);

    const startIndex=page*rowsPerPage
    const lastIndex=Math.min(startIndex+rowsPerPage,orderList.length)
    const paginatedOrder=orderList.slice(startIndex,lastIndex)

    console.log("Order List:", orderList); 
    console.log("Paginated Order:", paginatedOrder); 

    const handleDropDownChange=(e)=>{
       const selectedValue=e.target.value
       setDropDownValue(selectedValue)

       switch(selectedValue){
        case "pending":
            fetchPending();
            break;
        case "shipped":
            fetchShipped();
            break;
        case "completed":
            fetchCompleted();
            break;
        case "reset":
            resetDate()
            break;
        default:
            break;
       }
    }

    return(
        <div> 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Filter by date"
                value={value}
                onChange={(newValue) => filterBasedOnDate(newValue)}
                format="DD-MM-YYYY"
                renderInput={(params) => <TextField {...params} />}
                />
                <select value={dropDownValue} className="button" onChange={handleDropDownChange}>
                    <option value="" disabled>Select filters</option>
                    <option value="pending">Pending Orders</option>
                    <option value="shipped">Shipped Orders</option>
                    <option value="completed">Completed Orders</option>
                    <option value="reset">All Orders</option>
                </select>
            </LocalizationProvider>
            <div>
            <TableContainer component={Paper} sx={{width:'90vw',pl:'0px'}}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>Date</TableCell>
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
                {paginatedOrder.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },bgcolor: row.stocks===0?'red':'white'}}
                    >
                    <TableCell >{row.order_date}</TableCell>
                    <TableCell component="th" scope="row">
                        {row.order_user?.id || "-"}
                    </TableCell>
                    <TableCell>{row.order_user?.username||"-"}</TableCell>
                    <TableCell>{row.order_product?.product_name||"-"}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.payment_mode}</TableCell>
                    <TableCell align="right">{row.total_price}</TableCell>
                     <TableCell align="right">
                     {row.status==="pending" ? (
                            <button
                            className="shipButton"
                            onClick={() => handleShipSuccessButtons(row.id)}
                            >
                            Shipped
                            </button>
                        ) : row.status==="shipped" ? (
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
            <TablePagination
                component="div"
                count={orderList.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ml:'60%',width:'50vw'}}
            />
          </div>
         
          
        </div>
    )
}

export default OrderManage