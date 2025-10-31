import { useState } from "react";
import {FaBattleNet,FaBars} from "react-icons/fa6";

import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import ProductManage from "./productManage";
import OrderManage from "./orderManage";

import { MdCancel } from "react-icons/md";
import './dashboard.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#3c3e41ff',
  }),
}));

const Dashboard=()=>{
    const [cancelButton,setCancelButton]=useState(false)
    const [product,setProduct]=useState(false)
    const [order,setOrder]=useState(false)

    const handleCancle=()=>{
         setCancelButton(prev=>!prev)
    }

    const handleOrder=()=>{
        setProduct(false)
        setOrder(true)
        setCancelButton(prev=>!prev)
    }

    const handleProduct=()=>{
        setProduct(true)
        setOrder(false)
        setCancelButton(prev=>!prev)
    }

    return(
        <div className='dashboardContainer'>
            {cancelButton?
                <div className='sidebar'>
                    <div className="logoAndCancel">
                        <div className="logoContainer">
                            <FaBattleNet/>
                            <h1 className='headings'>
                            <span>
                                T
                            </span>
                                ech
                            <span>
                                S
                            </span>
                                hop
                            </h1>
                        </div> 
                        <button className='iconButton' onClick={handleCancle}><MdCancel/></button>
                    </div> 
                    <Box sx={{ width: '15vw',m:'30px'}}>
                        <Stack spacing={2}>
                            <Item onClick={handleProduct} sx={{bgcolor:'black',color:'white',borderWidth:'0px'}}>Product</Item>
                            <Item onClick={handleOrder} sx={{bgcolor:'black',color:'white',borderWidth:'0px'}}>Order</Item>
                        </Stack>
                    </Box>
                </div>:
                <div className='sidebarClose'>
                    <button className='iconButton' onClick={handleCancle}><FaBars/></button>
                </div>
             }
            <div className='displayContainer'>
                <h1>WELCOME TO ADMIN DASHBOARD!!</h1>
                {product&&<ProductManage/>}
                {order && <OrderManage/>}
            </div>
        </div>
    )
}

export default Dashboard