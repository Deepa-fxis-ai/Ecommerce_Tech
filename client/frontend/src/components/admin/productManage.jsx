import { useState,useEffect } from "react";
import { MdOutlineModeEdit,MdDeleteOutline } from "react-icons/md";

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './productManage.css'

const ProductManage=()=>{
    const [productList,setProductList]=useState([])

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
            setLoadingStatus(LoadingStatus.failure)
        }    
    }

    useEffect(()=>{getProductData()},[]);
    return(
        <>
           <TableContainer component={Paper}>
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
                         <button className="actionButton"><MdOutlineModeEdit/></button>
                         <button className="actionButton"><MdDeleteOutline/></button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default ProductManage