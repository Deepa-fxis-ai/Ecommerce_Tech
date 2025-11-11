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
import { FaRegCalendarAlt } from "react-icons/fa";
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from "dayjs";
import Box from '@mui/material/Box';
import { useLegend } from '@mui/x-charts/hooks';
import { ChartDataProvider } from '@mui/x-charts/ChartDataProvider';
import { ChartsSurface } from '@mui/x-charts/ChartsSurface';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { useMediaQuery } from '@mui/material';

const Analytics=()=>{
    const [userData,setUserData]=useState([])
    const [orderData,setOrderData]=useState([])
    const [productData,setProductData]=useState([])
    const [selectionRange,setSelectionRange]=useState({
       startDate: new Date(),
       endDate: new Date(),
       key: 'selection',
    })
    const [month,setMonth]=useState(dayjs())
    const [year,setYear]=useState(dayjs())
    const [monthStatus,setMonthStatus]=useState(false)
    const [yearStatus,setYearStatus]=useState(false)
    const token=Cookies.get('jwt_token')
    const isMobile = useMediaQuery('(max-width:767px)');

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
     const displayCheck=orderDataBasedOnDateRange.filter(each=>each!==0)

     //month based filtering
     const handleMonth=(newValue)=>{
        if(newValue){
            setMonth(newValue)
            setMonthStatus(false)//eg:11 for nov
        }
     }
     const handleMonthStatus=()=>{
         setMonthStatus(prev=>!prev)
     }
     
     const orderDataBasedOnMonth=orderData.orders?orderData.orders.filter(each=>{
        const orderMonth=dayjs(each.order_date).format("MM")
        return orderMonth===month.format("MM")
     }):[]
     // Group orders by date within the selected month
    const orderCountByDate = {};

    orderDataBasedOnMonth.forEach(order => {
    const date = order.order_date;
    orderCountByDate[date] = (orderCountByDate[date] || 0) + 1;
    });

    // Prepare dataset for month LineChart
    const monthChartData = Object.entries(orderCountByDate).map(([date, count]) => ({
    date,
    count,
    }));

     //year based filtering
     const handleYear=(newValue)=>{
        if(newValue){
            setYear(newValue)
            console.log(newValue.format("YYYY"))
            setYearStatus(false)
        }
     }


     const handleYearStatus=()=>{
         setYearStatus(prev=>!prev)
     }

     const orderDataBasedOnYear=orderData.orders?orderData.orders.filter(each=>{
        const orderYear=dayjs(each.order_date).format("YYYY")
        return orderYear===year.format("YYYY")
     }):[]

     const orderCountByMonth={}
        
    orderDataBasedOnYear.forEach(order => {
    const monthKey = dayjs(order.order_date).format("MMM"); 
    orderCountByMonth[monthKey] = (orderCountByMonth[monthKey] || 0) + 1;
    });

    const allMonths = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const yearChartData = allMonths.map(month => ({
    month,
    count: orderCountByMonth[month] || 0,
    }));

    //product profit and loss 
    //product names are available
    const profitCalculation=productData.user?productData.user.map(each=>each.selled_counts*each.price):[]
    console.log(profitCalculation)
    const lossCalculation=productData.user?productData.user.map(each=>each.stocks*each.price):[]
    console.log(lossCalculation)

    const maxProfit=profitCalculation.length>0? Math.max(...profitCalculation):0
    console.log(maxProfit)
    const maxloss=lossCalculation.length>0? Math.max(...lossCalculation):0
    console.log(maxloss)
    const maxProfitOrLoss=Math.max(maxProfit,maxloss)
    console.log(maxProfitOrLoss)

         
    useEffect(()=>{
        handleuserData()
        handleOrderData() 
        handleProductData()
    },[])

    return(
        <div className="analytic">
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
                            outerRadius: isMobile?80:100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -105,
                            endAngle: 225,
                            cx: isMobile?90:150,
                            cy: isMobile?90:150,
                            }
                        ]}
                        width={isMobile?200:300}
                        height={isMobile?200:300}
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
                        width={isMobile?200:300}
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
                                label: `${key}`
                            })),
                            },
                        ]}
                        height={200}
                        width={isMobile?200:300}
                    />
                </div>
                <div className="dateToDateRangeContainer">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                        className="dateRangePicker"
                    />
                    <div className="dateRangeBar">
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
                        width={isMobile?300:400}
                    /> 
                     ):<p>No data available based on this date range</p>
                     }
                    
                    </div>
                </div>
                <div className="monthBasedAnalytics">
                    <h2 className="orderStatusHeading">Monthly Basis of order</h2>
                    <div>
                         <div className="calendarIcon">
                           <span>{month.format("MM")}</span>
                           <button type="button" onClick={handleMonthStatus}><FaRegCalendarAlt/></button>
                         </div>
                          <div className={`monthCalendar ${monthStatus ? 'show' : 'hide'}`}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['YearCalendar', 'MonthCalendar']}>
                                    <DemoItem>
                                    <MonthCalendar value={month} onChange={handleMonth}/>
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                          </div>
                           <LineChart
                                dataset={monthChartData}
                                xAxis={[
                                    {
                                    dataKey: 'date',
                                    label: 'Date',
                                    scaleType: 'band',
                                    tickLabelStyle: { fontSize: 10, angle: -90, textAnchor: 'end' },
                                    },
                                ]}
                                series={[
                                    {
                                    dataKey: 'count',
                                    },
                                ]}
                                yAxis={[
                                    {
                                    label: 'Number of Orders',
                                    min: 0,
                                    tickCount: 6,
                                    },
                                ]}
                                width={isMobile?300:400}
                                height={300}
                                grid={{ vertical: true, horizontal: true }}
                            />
                    </div>
                </div>
                <div className="yearBasedAnalytics">
                    <h2 className="orderStatusHeading">Yearly Basis of order</h2>
                    <div>
                        <div className="calendarIcon">
                            <span>{year.format("YYYY")}</span>
                            <button type="button" onClick={handleYearStatus}><FaRegCalendarAlt/></button>
                        </div>
                        <div className={`yearCalendar ${yearStatus ? 'show' : 'hide'}`}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['YearCalendar', 'MonthCalendar']}>
                                    <DemoItem>
                                    <YearCalendar value={year} onChange={handleYear}/>
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                         <LineChart
                            dataset={yearChartData}
                            xAxis={[
                                {
                                dataKey: 'month',
                                label: 'Date',
                                scaleType: 'band',
                                tickLabelStyle: { fontSize: 10, angle: -90, textAnchor: 'end' },
                                },
                            ]}
                            series={[
                                {
                                dataKey: 'count',
                                },
                            ]}
                            yAxis={[
                                {
                                label: 'Number of Orders',
                                min: 0,
                                tickCount: 6,
                                },
                            ]}
                            width={isMobile?300:400}
                            height={300}
                            grid={{ vertical: true, horizontal: true }}
                        />
                   </div>
                </div>
                <div className="profitAndLoss">
                   <h2 className="orderStatusHeading">Profit And Loss Analysis</h2>
                   <Box sx={{ height: 400,width: isMobile?300:400, display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <div className="markings">
                              <div className="profitMarking"></div>
                              <span>Profit</span>
                            </div>
                            <div className="markings">
                              <div className="lossMarking"></div>
                              <span>Loss</span>
                            </div>
                        </div>
                        <ChartDataProvider
                            series={[
                            { label: 'First Series', type: 'bar', data: profitCalculation },
                            { label: "second series", type: 'bar', data: lossCalculation },
                            ]}
                            width={isMobile?300:400}
                            xAxis={[{ data: productNames, scaleType: 'band', id: 'x-axis',tickLabelStyle: { fontSize: 10, angle: -90, textAnchor: 'end' }, }]}
                            yAxis={[
                            {
                            min: 0,     // start Y-axis at 0
                            max: maxProfitOrLoss,  // end Y-axis at 1200
                            //tickInterval: 20, 
                            label: 'Price of Products',
                            },
                        ]}
                        >
                            <ChartsSurface>
                            <BarPlot />
                            <ChartsXAxis axisId="x-axis" />
                            <ChartsYAxis />
                            </ChartsSurface>
                        </ChartDataProvider>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Analytics