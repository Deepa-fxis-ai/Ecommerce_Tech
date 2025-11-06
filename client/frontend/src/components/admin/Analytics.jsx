import { useState,useEffect} from "react"
import Cookies from 'js-cookie'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import './Analytics.css'

const Analytics=()=>{
    const [userData,setUserData]=useState([])
    const [orderData,setOrderData]=useState([])
    const [productData,setProductData]=useState([])
    const token=Cookies.get('jwt_token')

    const handleuserData=async()=>{
       const url=`http://127.0.0.1:8000/get-user-list/`
       const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         }
       }
       const response=await fetch(url,options)
       const data=await response.json()
       if(response.ok){
        console.log(data)
        setUserData(data)
       }
    }

    const handleOrderData=async()=>{
       const url=`http://127.0.0.1:8000/order/`
       const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
         }
       }
       const response=await fetch(url,options)
       const data=await response.json()
       if(response.ok){
        console.log(data)
        setOrderData(data)
       }
    }

    const handleProductData=async()=>{
       const url=`http://127.0.0.1:8000/product/get/`
       const options={
        method:'GET',
        headers:{
            'Content-Type':'application/json',
         }
       }
       const response=await fetch(url,options)
       const data=await response.json()
       if(response.ok){
        console.log(data)
        setProductData(data)
       }
    }

    //Calculate Total Sum of products
    let totalSum=0
    const sumArray=productData.user?productData.user.map(each=>each.price*each.stocks):[]
    totalSum=sumArray.reduce((acc,i)=>acc+i,0)
    console.log(totalSum)

    //for order status
    const pendingOrders=orderData.orders?orderData.orders.filter(each=>each.status==='pending'):0
    const shippedOrders=orderData.orders?orderData.orders.filter(each=>each.status==='shipped'):0
    const completedOrders=orderData.orders?orderData.orders.filter(each=>each.status==='success'):0

    //for selling products
    const topProducts=productData.user?productData.user.sort((a,b)=>b.selled_counts-a.selled_counts).slice(0,5):[] 
    const productNames=topProducts?topProducts.map(each=>each.product_name):[]
    const productSellingCounts=topProducts?topProducts.map(each=>each.selled_counts):[]

    //for Category Based product classication
    const categoryArray=productData.user?productData.user.reduce((acc,each)=>{
      switch(each.dressType){
        case "C":
          acc.casual.count+=1
          acc.casual.price+=(Number(each.price)*each.stocks)
          break;
        case "F":
          acc.formal.count+=1
          acc.formal.price+=(Number(each.price)*each.stocks)
          break;
        case "P":
          acc.party.count+=1
          acc.party.price+=(Number(each.price)*each.stocks)
          break;
        case "G":
          acc.gym.count+=1
          acc.gym.price+=(Number(each.price)*each.stocks)
          break;
        default:
          acc.other.count+=1
          acc.other.price+=(Number(each.price)*each.stocks)
          break;
      }
      return acc;
      },{
        casual: { count: 0, price: 0},
        formal: { count: 0, price: 0},
        party: { count: 0, price: 0 },
        gym: { count: 0, price: 0 },
        other:{count: 0, price: 0}  //initial accumulator
     }):{}
    console.log(categoryArray)
    
    useEffect(()=>{
        handleuserData()
        handleOrderData() 
        handleProductData()
    },[])

    return(
        <div>
            <div className="count">
                <div className="countContainer">
                <h2>User:{userData.length}</h2> 
                </div>
                <div className="countContainer">
                    <h2>Order:{orderData.orders ? orderData.orders.length : 0}</h2>
                </div>
                <div className="countContainer">
                    <h2>Total Amount: Rs.{totalSum}</h2>
                </div>
            </div>
            <div className="analyticContainer">
                <div className="orderStatusContainer">
                    <h2 className="orderStatusHeading">Order Status Analysis</h2>
                    <PieChart
                        series={[
                            {
                            data: [ 
                                { id: 0, value: pendingOrders.length, label: 'Pending',color:'red'},
                                { id: 1, value: shippedOrders.length, label: 'Shipped',color:'blue'},
                                { id: 2, value: completedOrders.length, label: 'Completed',color:'green' },
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -105,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                            }
                        ]}
                        width={300}
                        height={300}
                    />
                </div>
                <div className="sellingContainer">
                    <h2 className="orderStatusHeading">Top 5 Selling Products</h2>
                    <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: productNames,
                            scaleType: 'band',
                            label: 'Products',
                            tickLabelStyle: {
                                angle: -45,         
                                textAnchor: 'end',  
                                fontSize: 12,
                                width: 100,         
                                overflow: 'hidden', 
                            },
                            },
                        ]}
                        yAxis={[
                            {
                            min: 0,     // start Y-axis at 0
                            max: 500,  // end Y-axis at 1200
                            tickInterval: 50, 
                            label: 'Selling Counts',
                            },
                        ]}
                        series={[
                            {
                            data: productSellingCounts,
                            },
                        ]}
                        height={300}
                    /> 
                </div>
                <div className="categoryContainer">
                   <h2 className="orderStatusHeading">Classification Based on Category</h2>
                   <PieChart
                        series={[
                            {
                            startAngle: -90,
                            endAngle: 90,
                            data:Object.entries(categoryArray).map(([key,val],i)=>({
                                id:i,
                                value:val.price,
                                label: `${key} - ${val.count}`
                            })),
                            },
                        ]}
                        height={200}
                        width={200}
                    />
                </div>
            </div>
        </div>
    )
}

export default Analytics