import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources={
    en:{
        translation: {
            home:{
                bannerHeading:"FIND CLOTHES THAT MATCHES YOUR STYLE",
                bannerParagraph:"Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.",
                bannerButton:'Shop Now'
            }
        }
    },
    hi:{
        translation: {
            home:{
                bannerHeading:"अपने स्टाइल से मेल खाने वाले कपड़े खोजें",
                bannerParagraph:"अपने व्यक्तित्व को उजागर करने और आपकी शैली के अनुरूप तैयार किए गए, बारीकी से निर्मित परिधानों की हमारी विविध रेंज को ब्राउज़ करें।",
                bannerButton:'अभी खरीदें'
            }
        }
    },
    ta:{
        translation: {
            home:{
                bannerHeading:"உங்கள் ஸ்டைலுக்கு பொருந்தும் உடைகளை கண்டறியுங்கள்",
                bannerParagraph:"உங்கள் தனித்தன்மையை வெளிப்படுத்தும் வகையில் வடிவமைக்கப்பட்ட, நுட்பமாக உருவாக்கப்பட்ட பல்வகை உடைகளை ஆராயுங்கள். உங்கள் ஸ்டைலுக்கு ஏற்றவையாக இவை உருவாக்கப்பட்டுள்ளன",
                bannerButton:'இப்போது வாங்குங்கள்'
            }
        }
    },
    ma:{
        translation: {
            home:{
                bannerHeading:"നിങ്ങളുടെ സ്റ്റൈലിനൊത്ത വസ്ത്രങ്ങൾ കണ്ടെത്തൂ",
                bannerParagraph:"നിങ്ങളുടെ വ്യക്തിത്വം പ്രകടിപ്പിക്കുകയും സ്റ്റൈലിന് അനുയോജ്യമായതും ആകർഷകവുമായ വസ്ത്രങ്ങൾ കണ്ടെത്തുകയും ചെയ്യാൻ, നന്നായി രൂപകൽപ്പന ചെയ്ത വിവിധ വസ്ത്രങ്ങൾ പരിശോധിക്കുക.",
                bannerButton:'ഇപ്പോൾ ഷോപ്പുചെയ്യൂ'
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