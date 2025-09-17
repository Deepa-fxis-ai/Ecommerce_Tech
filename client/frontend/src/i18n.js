import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources={
    en:{
        translation: {
            home:{
                bannerHeading:"FIND CLOTHES THAT MATCHES YOUR STYLE",
                bannerParagraph:"Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
                bannerButton:'Shop Now',
                bannerPopularity:{
                    first:'International Brands',
                    second:'High Quality Products',
                    third:'Happy Customers'
                },
                dressType:'BROWSE BY DRESS STYLE',
            },
            topSellingAndArrival:{
               newArrival:"NEW ARRIVALS",
               topSelling:"TOP SELLINGS",
               viewMore:"View More",
               viewLess:"View Less"
            },
            product:{
               search:"Search Products",
               filters:"Filters",
               dressType:"Dress Type",
               size:"Size",
               price:"Price",
               applyButton:"Apply Filter",
               filterHeading:"Apply Filter Here!!",
               ratings:"Rating"
            },
            header:{
              home:"Home",
              products:"Products",
              cart:"Cart",
              login:"Login/Register",
              logout:"Logout",
              select: "Language"
            },
            cart:{
                productId:"Product ID",
                quantity:"Quantity",
                totalPrice:"Total Price",
                cancel:"Cancel Cart",
                totalQuantity:"Total Quantity",
                totalAmount:"Total Amount",
                order:"Order Now"
            }
        }
    },
    hi:{
        translation: {
            home:{
                bannerHeading:"अपने स्टाइल से मेल खाने वाले कपड़े खोजें",
                bannerParagraph:"अपने व्यक्तित्व को उजागर करने और आपकी शैली के अनुरूप तैयार किए गए, बारीकी से निर्मित परिधानों की हमारी विविध रेंज को ब्राउज़ करें।",
                bannerButton:'अभी खरीदें',
                bannerPopularity:{
                    first:'अंतरराष्ट्रीय ब्रांड्स',
                    second:'उच्च गुणवत्ता वाले उत्पाद',
                    third:'खुश ग्राहक'
                },
                dressType:'पोशाक शैली के अनुसार ब्राउज़ करें',
            },
            topSellingAndArrival:{
               newArrival:"नई आगमन",
               topSelling:"सबसे अधिक बिकने वाले",
               viewMore:"और देखें",
               viewLess:"कम देखें"
            },
            product: {
                search: "उत्पाद खोजें",
                filters: "फ़िल्टर",
                dressType: "पोशाक प्रकार",
                size: "आकार",
                price: "कीमत",
                applyButton: "फ़िल्टर लागू करें",
                filterHeading: "यहाँ फ़िल्टर लागू करें!!",
                ratings:"रेटिंग"
            },
            header: {
                home: "होम",
                products: "उत्पाद",
                cart: "कार्ट",
                login: "लॉगिन/रजिस्टर",
                logout: "लॉगआउट",
                select: "भाषा"
            },
            cart: {
                productId: "उत्पाद आईडी",
                quantity: "मात्रा",
                totalPrice: "कुल कीमत",
                cancel: "कार्ट रद्द करें",
                totalQuantity:"कुल मात्रा",
                totalAmount:"कुल राशि",
                order:"ऑर्डर करें"
            }

        }
    },
    ta:{
        translation: {
            home:{
                bannerHeading:"உங்கள் ஸ்டைலுக்கு பொருந்தும் உடைகளை கண்டறியுங்கள்",
                bannerParagraph:"உங்கள் தனித்தன்மையை வெளிப்படுத்தும் வகையில் வடிவமைக்கப்பட்ட, நுட்பமாக உருவாக்கப்பட்ட பல்வகை உடைகளை ஆராயுங்கள். உங்கள் ஸ்டைலுக்கு ஏற்றவையாக இவை உருவாக்கப்பட்டுள்ளன",
                bannerButton:'இப்போது வாங்குங்கள்',
                bannerPopularity:{
                    first:'சர்வதேச பிராண்டுகள்',
                    second:'உயர்தர தயாரிப்புகள்',
                    third:'மகிழ்ச்சியான வாடிக்கையாளர்கள்'
                },
                dressType:'உடையின் பாணி அடிப்படையில் தேடுங்கள்',
            },
            topSellingAndArrival:{
               newArrival:"புதிய வரவுகள்",
               topSelling:"அதிகமாக விற்கப்படும் பொருட்கள்",
               viewMore:"மேலும் பார்க்க",
               viewLess:"குறைவாக பார்க்க"
            },
            product: {
                search: "தயாரிப்புகளை தேடுங்கள்",
                filters: "வடிகட்டிகள்",
                dressType: "உடை வகை",
                size: "அளவு",
                price: "விலை",
                applyButton: "வடிகட்டியை பயன்படுத்தவும்",
                filterHeading: "இங்கே வடிகட்டியை பயன்படுத்துங்கள்!!",
                ratings:"மதிப்பீடு"
            },
            header: {
                home: "முகப்பு",
                products: "தயாரிப்புகள்",
                cart: "வண்டி",
                login: "உள்நுழை/பதிவுசெய்",
                logout: "வெளியேறு",
                select:"மொழி"
            },
            cart: {
                productId: "தயாரிப்பு ஐடி",
                quantity: "அளவு",
                totalPrice: "மொத்த விலை",
                cancel: "ரத்து செய்யவும்",
                totalQuantity:"மொத்த அளவு",
                totalAmount:"மொத்த தொகை",
                order:"ஆர்டர் செய்யுங்கள்"
            }

        }
    },
    ma:{
        translation: {
            home:{
                bannerHeading:"നിങ്ങളുടെ സ്റ്റൈലിനൊത്ത വസ്ത്രങ്ങൾ കണ്ടെത്തൂ",
                bannerParagraph:"നിങ്ങളുടെ വ്യക്തിത്വം പ്രകടിപ്പിക്കുകയും സ്റ്റൈലിന് അനുയോജ്യമായതും ആകർഷകവുമായ വസ്ത്രങ്ങൾ കണ്ടെത്തുകയും ചെയ്യാൻ, നന്നായി രൂപകൽപ്പന ചെയ്ത വിവിധ വസ്ത്രങ്ങൾ പരിശോധിക്കുക.",
                bannerButton:'ഇപ്പോൾ ഷോപ്പുചെയ്യൂ',
                bannerPopularity:{
                    first:'അന്താരാഷ്ട്ര ബ്രാൻഡുകൾ',
                    second:'ഉയർന്ന നിലവാരമുള്ള ഉൽപ്പന്നങ്ങൾ',
                    third:'സന്തോഷമുള്ള ഉപഭോക്താക്കൾ'
                },
                dressType:'ഉടയുടെ ശൈലി പ്രകാരം തിരയുക',
            },
            topSellingAndArrival:{
               newArrival:"പുതിയ വരവുകൾ",
               topSelling:"ഏറ്റവും കൂടുതൽ വിൽക്കുന്നവ",
               viewMore:"കൂടുതൽ കാണുക",
               viewLess:"കുറച്ച് കാണുക"
            },
            product: {
                search: "ഉൽപ്പന്നങ്ങൾ തിരയുക",
                filters: "ഫിൽട്ടറുകൾ",
                dressType: "ഉടയുടെ തരം",
                size: "വലിപ്പം",
                price: "വില",
                applyButton: "ഫിൽട്ടർ പ്രയോഗിക്കുക",
                filterHeading: "ഇവിടെ ഫിൽട്ടർ പ്രയോഗിക്കുക!!",
                ratings:"റേറ്റിംഗ്"
             },
             header: {
                home: "ഹോം",
                products: "ഉൽപ്പന്നങ്ങൾ",
                cart: "കാർട്ട്",
                login: "ലോഗിൻ/രജിസ്റ്റർ",
                logout: "ലോഗ്ഔട്ട്",
                select:"ഭാഷ"
             },
             cart: {
                productId: "ഉൽപ്പന്ന ഐഡി",
                quantity: "അളവ്",
                totalPrice: "മൊത്തം വില",
                cancel: "കാർട്ട് റദ്ദാക്കുക",
                totalQuantity:"മൊത്തം അളവ്",
                totalAmount:"മൊത്തം തുക",
                order:"ഓർഡർ ചെയ്യുക"
            }
        }
    }
};

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources,
    fallbacking: "en",
    interpolation: {escapeValue: false}
});

export default i18n;