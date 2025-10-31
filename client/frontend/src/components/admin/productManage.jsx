import { useState,useEffect } from "react";
import { MdOutlineModeEdit,MdDeleteOutline } from "react-icons/md";
import Cookies from 'js-cookie'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { VscAdd } from "react-icons/vsc";
import './productManage.css'

const ProductManage=()=>{
    const [productList,setProductList]=useState([])
    const [open, setOpen] =useState(false);
    const [appOpen, setAddOpen] =useState(false);
    const [id,setId]=useState(null)
    const [pName,setPName]=useState("")
    const [pdesc,setPdesc]=useState("")
    const [pSize,setPSize]=useState([])
    const [pPrice,setPPrice]=useState(0)
    const [pStock,setPStock]=useState(0)
    const token=Cookies.get('jwt_token')
    const [addPSku,setAddPSku]=useState("")
    const [addPName,setAddPName]=useState("")
    const [addPPrice,setAddPPrice]=useState(0)
    const [addPdesc,setAddPdesc]=useState("")
    const [addPImage,setAddPImage]=useState("")
    const [addPStock,setAddPStock]=useState(0)
    const [addPRatings,setAddPRatings]=useState(0)
    const [AddPSize,setAddPSize]=useState([])
    const [addPType,setAddPType]=useState("")
    const [openDelete, setOpenDelete] =useState(false);
    const [deleteId,setDeleteId]=useState(null)

    const handleClickOpenDelete = (Id) => {
        setOpenDelete(true);
        setDeleteId(Id)
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClickOpen = (rowId,Name,desc,size,price,stock) => {
    setOpen(true);
    setId(rowId)
    setPName(Name)
    setPdesc(desc)
    setPSize(size)
    setPPrice(price)
    setPStock(stock)
    };

    const handleClickAddOpen=()=>{
      setAddOpen(true)
    }

    const handleAddClose = () => {
    setAddOpen(false);
    };

    const handleClose = () => {
    setOpen(false);
    };


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

    const handleUpdate=async ()=>{
        const url=`http://127.0.0.1:8000/product/detail/${id}/`
        const options={
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({product_name:pName,price:pPrice,description:pdesc,stocks:pStock,size:pSize})
        }
        const response=await fetch(url,options)
        if(response.ok){
            alert('Updated Successfully')
            setOpen(false)
            getProductData();
        }
        else{
            alert('Something Went Wrong')
        }
    }

    const handleDelete=async()=>{
        const url=`http://127.0.0.1:8000/product/detail/${deleteId}/`
        const options={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
        }
        const response=await fetch(url,options)
        if(response.ok){
            alert('Deleted Successfully')
            setOpenDelete(false)
            getProductData();
        }
        else{
            alert('Something Went Wrong')
        }
    }

    const handleAdd=async ()=>{
        const payload = {
        sku: addPSku,
        product_name: addPName,
        price: Number(addPPrice),           
        description: addPdesc,
        image_url: addPImage,               
        stocks: Number(addPStock),          
        ratings: Number(addPRatings),       
        size: Array.isArray(AddPSize) 
              ? AddPSize 
              : AddPSize.split(",").map(s => s.trim()),  
        dressType: addPType
    };
        const url=`http://127.0.0.1:8000/product/create/`
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(payload)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if(response.ok){
            alert('Updated Successfully')
            setAddOpen(false)
            getProductData();
        }
        else{
            console.log("DRF validation error:", data);  
            alert('Something Went Wrong')
        }
    }

    useEffect(()=>{getProductData()},[]);
    return(
        <div className="productListContainer"> 
         {productList.length>0?
            <div>
           <div className="feature">
             <button className="button" onClick={handleClickAddOpen}>
                <VscAdd/>
                <span>Add New</span>
            </button>
           </div>
           <TableContainer component={Paper} sx={{width:'90vw',pl:'0px'}}>
            <Table sx={{ minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>SKU</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Stocks</TableCell>
                    <TableCell align="right">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {productList.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 },bgcolor: row.stocks===0?'red':'white'}}
                    >
                    <TableCell component="th" scope="row">
                        {row.sku}
                    </TableCell>
                    <TableCell>{row.product_name}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.dressType}</TableCell>
                    <TableCell align="right">{row.size?.join(", ")}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.stocks}</TableCell>
                    <TableCell align="right">
                         <button className="actionButton" onClick={()=>{handleClickOpen(row.id,row.product_name,row.description,row.size,row.price,row.stocks)}}><MdOutlineModeEdit/></button>
                         <button className="actionButton" onClick={()=>handleClickOpenDelete(row.id)}><MdDeleteOutline/></button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            {/* for update product */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Update Product Data here!!"}
                </DialogTitle>
                <DialogContent>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="Product Name" value={pName} variant="standard" onChange={(e)=>{setPName(e.target.value)}}/>
                    <TextField id="standard-basic" label="Description" variant="standard" value={pdesc} onChange={(e)=>{setPdesc(e.target.value)}}/>
                    <TextField id="standard-basic" label="Size" variant="standard" value={Array.isArray(pSize) ? pSize.join(", ") : pSize} onChange={(e) => setPSize(e.target.value.split(",").map(s => s.trim()))}/>
                    <TextField id="standard-basic" label="Price" variant="standard" value={pPrice} onChange={(e)=>{setPPrice(e.target.value)}}/>
                    <TextField id="standard-basic" label="Stocks" variant="standard" value={pStock} onChange={(e)=>{setPStock(e.target.value)}}/>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleUpdate} autoFocus>
                    Save Changes
                </Button>
                </DialogActions>
            </Dialog> 

            {/* for add product */}
            <Dialog
                open={appOpen}
                onClose={handleAddClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Update Product Data here!!"}
                </DialogTitle>
                <DialogContent>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="Sku" value={addPSku} variant="standard" onChange={(e)=>{setAddPSku(e.target.value)}}/>
                    <TextField id="standard-basic" label="Product Name" value={addPName} variant="standard" onChange={(e)=>{setAddPName(e.target.value)}}/>
                    <TextField id="standard-basic" label="Price" variant="standard" value={addPPrice} onChange={(e)=>{setAddPPrice(e.target.value)}}/>
                    <TextField id="standard-basic" label="Description" variant="standard" value={addPdesc} onChange={(e)=>{setAddPdesc(e.target.value)}}/>
                    <TextField id="standard-basic" label="Stocks" variant="standard" value={addPStock} onChange={(e)=>{setAddPStock(e.target.value)}}/>
                    <TextField id="standard-basic" label="Image Url" variant="standard" value={addPImage} onChange={(e)=>{setAddPImage(e.target.value)}}/>
                    <TextField id="standard-basic" label="Rating" variant="standard" value={addPRatings} onChange={(e)=>{setAddPRatings(e.target.value)}}/>
                    <TextField id="standard-basic" label="Size" variant="standard" value={Array.isArray(AddPSize) ? AddPSize.join(", ") : AddPSize} onChange={(e) => setAddPSize(e.target.value.split(",").map(s => s.trim()))}/>
                    <TextField id="standard-basic" label="Dress Type" variant="standard" value={addPType} onChange={(e)=>{setAddPType(e.target.value)}}/>
                    
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleAddClose}>Cancel</Button>
                <Button onClick={handleAdd} autoFocus>
                    Add
                </Button>
                </DialogActions>
            </Dialog> 

            {/* for delete product */}
             <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                
                <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{color:'red'}}>
                    Are you Sure, Do you want to delete this Item?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDelete}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus sx={{color:'red'}}>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
          </div>
         :
            <div className="productZeroCase">
               No Products Available
            </div>
         }
          
        </div>
    )
}

export default ProductManage