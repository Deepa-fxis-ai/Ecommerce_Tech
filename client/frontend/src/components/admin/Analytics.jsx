import { useState,useEffect} from "react"
import Cookies from 'js-cookie'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import './Analytics.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';

const Analytics=()=>{
    const [userData,setUserData]=useState([])
    const [orderData,setOrderData]=useState([])
    const [productData,setProductData]=useState([])
    const [selectionRange,setSelectionRange]=useState({
       startDate: new Date(),
       endDate: new Date(),
       key: 'selection',
    })
    const [monthCalendar,setMonthCalendar]=useState(false)
    const [yearCalendar,setYearCalendar]=useState(false)
    const token=Cookies.get('jwt_token')

    const handleSelect=(ranges)=>{
    console.log(ranges);
    setSelectionRange(ranges.selection)
    console.log(selectionRange)
  }

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
    
    const handleMonthCalender=()=>{
        setMonthCalendar(prev=>!prev)
    }
    const handleYearCalender=()=>{
        setYearCalendar(prev=>!prev)
    }
    //Calculate Total Sum of products
    let totalSum=0
    const sumArray=productData.user?productData.user.map(each=>each.price*each.stocks):[]
    totalSum=sumArray.reduce((acc,i)=>acc+i,0)

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
    
     //for Date Range analysis
     const dateArray=[]
     const startRange=new Date(selectionRange.startDate)
     const endRange=new Date(selectionRange.endDate) 
     let currentDate=new Date(startRange)
     currentDate.setDate(currentDate.getDate()+1) //set start value 
     endRange.setDate(endRange.getDate()+1) //set add value
     while(currentDate<=endRange){
        dateArray.push(currentDate.toISOString().split("T")[0])
        currentDate.setDate(currentDate.getDate()+1)
     }
     
     const orderDataBasedOnDateRange=dateArray.map(k=>{
        if(!orderData.orders){
            return "date required to view analytics"
        }
        const count=orderData.orders.reduce((acc,val)=>{
            return acc+(val.order_date===k?1:0)
        },0)
        return count
     })

     console.log(orderDataBasedOnDateRange)
     
     const displayCheck=orderDataBasedOnDateRange.filter(each=>each!==0)
    //line view representation of date range
     console.log(displayCheck)
       
    
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
                        width={400}
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
                                display:'none',
                                angle: -15,         
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
                        width={300}
                    />
                </div>
                <div className="dateToDateRangeContainer">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        className="dateRangePicker"
                    />
                    <div>
                     <h2 className="orderStatusHeading">Date range representation for order</h2>
                     {displayCheck.length>0?
                     (
                        <BarChart
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: dateArray,
                            scaleType: 'band',
                            label: 'Date Range',
                            tickLabelStyle: {
                                display:'none',
                                angle: -15,         
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
                            max: 100,  // end Y-axis at 1200
                            tickInterval: 20, 
                            label: 'orders',
                            },
                        ]}
                        series={[
                            {
                            data: orderDataBasedOnDateRange,
                            },
                        ]}
                        height={400}
                        width={400}
                    /> 
                     ):<p>No data available based on this date range</p>
                     }
                    
                    </div>
                </div>
                <div className="monthBasedAnalytics">
                    <h2 className="orderStatusHeading">Yearly and Monthly Basis of order</h2>
                    <div>
                        <button type='button' onClick={handleMonthCalender}>Month</button>
                        <button type='button' onClick={handleYearCalender}>Year</button>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['YearCalendar', 'MonthCalendar']}>
                            <DemoItem label="YearCalendar">
                            <YearCalendar />
                            </DemoItem>
                            <DemoItem label="MonthCalendar">
                            <MonthCalendar />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}

export default Analytics