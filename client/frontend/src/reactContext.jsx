import React from 'react'

export const LanguageContext=React.createContext({
    language:"en",
    languageConversion:()=>{},
    themeStatus:'',
    onhandleTheme:()=>{},
    userProfileStatus:"false",
    onhandleUserProfile:()=>{},
    orderCheckStatus:false,
    onhandleOrderCheckStatus:()=>{},
})

