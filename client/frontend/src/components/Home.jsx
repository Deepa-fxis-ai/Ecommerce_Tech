import Header from './Header.jsx'
import TopSellingAndArrival from './topSellingAndArrival.jsx';
import './Home.css'

const Home=()=>{
    return(
    <div className='HomeContainer'>
        <Header />
        <div className='banner'>
            <div className='bannerContent'>
            <h1 className='majorHeading'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
            <p className='cardparagraph'>
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>
            <button className='shopButton'>Shop Now</button>
            <div className="bannerpopularity">
                <div className='bannerBox'>
                   <h1 className='values'>200+</h1>
                   <p className='valueDescription'>International Brands</p>
                </div>
                <div className='bannerBox'>
                   <h1 className='values'>2,000+</h1>
                   <p className='valueDescription'>High Quality Products</p>
                </div>
                <div className='bannerBox'>
                   <h1 className='values'>30,000+</h1>
                   <p className='valueDescription'>Happy Customers</p>
                </div>
            </div> 
            </div> 
        </div> 
        <div className='brands'>
             <h1 className='versace'>VERSACE</h1>
             <h1 className='zara'>ZARA</h1>
             <h1 className='gucci'>GUCCI</h1>  
             <h1 className='prada'>PRADA</h1> 
             <h1 className='ck'>Calvin Klein</h1>
        </div>
        
        <div className='dressType'>
            <h1 className='dressTypeBasedHeading'>BROWSE BY DRESS STYLE</h1>
            <div className='casual'>
                <p className='dressTypeParagraph'>
                    CASUAL
                </p>
            </div>
            <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1756732322/Frame_62_yv5yko.png" className='formal'/>
            <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1756732545/Frame_64_fcxmmw.png"
            className='party'/>
            <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1756732705/Frame_63_hdilyk.png"
            className='gym'/>
        </div>
    </div>
    )
}

export default Home;