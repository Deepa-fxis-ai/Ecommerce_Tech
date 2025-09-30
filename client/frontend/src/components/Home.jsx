import { useContext } from 'react';
import Header from './Header.jsx'
import { Link } from 'react-router-dom';
import TopSellingAndArrival from './topSellingAndArrival.jsx';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../reactContext.jsx';
import './Home.css'

const Home=()=>{
    const { t }=useTranslation();
    const {themeStatus}=useContext(LanguageContext)
    const theme=themeStatus==='light'?'light':'dark'
    return(
    <div className='HomeContainer'>
        <Header />
        <div className='banner'>
            <div className='bannerContent'>
            <h1 className='majorHeading'>{t("home.bannerHeading")}</h1>
            <p className='cardparagraph'>
              {t("home.bannerParagraph")}
            </p><br/>
            <Link to="/product">
               <button className='shopButton'>{t("home.bannerButton")}</button>
            </Link>
            
            <div className="bannerpopularity">
                <div className='bannerBox'>
                   <h1 className='values'>200+</h1>
                   <p className='valueDescription'>{t("home.bannerPopularity.first")}</p>
                </div>
                <div className='bannerBox'>
                   <h1 className='values'>2,000+</h1>
                   <p className='valueDescription'>{t("home.bannerPopularity.second")}</p>
                </div>
                <div className='bannerBox'>
                   <h1 className='values'>30,000+</h1>
                   <p className='valueDescription'>{t("home.bannerPopularity.third")}</p>
                </div>
            </div> 
            <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1757402954/mob_nfebng.png" className='bannerMobileImage'/>
            </div> 
        </div> 
        <div className='brands'>
             <h1 className='versace'>VERSACE</h1>
             <h1 className='zara'>ZARA</h1>
             <h1 className='gucci'>GUCCI</h1>  
             <h1 className='prada'>PRADA</h1> 
             <h1 className='ck'>Calvin Klein</h1>
        </div>
        <TopSellingAndArrival/>
        <div className={`dressType ${theme}`}>
            <h1 className={`dressTypeBasedHeading ${theme}`}>{t("home.dressType")}</h1>
            <div className='dressPictures'>
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

            <div className='dressPicturesMobile'>
                <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1757921739/Frame_105_ps6n57.png" className='dressTypeImage'/>
                <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1757921761/Frame_106_vxpccl.png" className='dressTypeImage'/>
                <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1757921796/Frame_107_qvcfxz.png"
                className='dressTypeImage'/>
                <img src="https://res.cloudinary.com/dlfl0nfin/image/upload/v1757921813/Frame_108_foyohg.png"
                className='dressTypeImage'/>
            </div>
        </div>
    </div>
    )
}

export default Home;