"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export const staticData = [
    {
        name: "Locality Insights",
        value: "",
        icon: <svg width="22px" height="22px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" fill="#F2F2F2" d="M75 87.425L50 100 25 87.425 0 100V12.576L25 0l25 12.576L75 0l25 12.576V100L75 87.425z"/><path clipRule="evenodd" stroke="#6BC9F2" strokeWidth="4" strokeMiterlimit="10" d="M15 60V32l9.988-5.006L50 41l25-12 12 4" fill="none"/><path clipRule="evenodd" stroke="#E64C3C" strokeWidth="4" strokeMiterlimit="10" d="M15 61v-8l10-5 25 13 25-11 12-5V32" fill="none"/><path clipRule="evenodd" stroke="#F29C1F" strokeWidth="4" strokeMiterlimit="10" d="M15 61l35 18 17-8V43l20-10" fill="none"/><path fillRule="evenodd" clipRule="evenodd" fill="#ffffff" d="M87 36.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/><path fill="#2980BA" d="M87 31c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0-3a5 5 0 1 0 .001 10.001A5 5 0 0 0 87 28z"/><path fillRule="evenodd" clipRule="evenodd" fill="#ffffff" d="M15 64.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/><path fill="#2980BA" d="M15 59c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2m0-3a5 5 0 1 0 .001 10.001A5 5 0 0 0 15 56z"/><path opacity=".15" fillRule="evenodd" clipRule="evenodd" fill="#2C3E50" d="M0 100l25-12.576V0L0 12.576V100zm50-87.424V100l25-12.576V0L50 12.576z"/></svg>,
        href:"/market-trends/locality-insights"  
    },{
        name: "News",
        value: "",
        icon:<svg width="22px" height="22px" viewBox="0 0 1024 1024"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M682.666667 320v597.333333H213.333333c-46.933333 0-85.333333-38.4-85.333333-85.333333V320h554.666667z" fill="#FF5722" /><path d="M298.666667 106.666667v725.333333c0 46.933333-38.4 85.333333-85.333334 85.333333h618.666667c46.933333 0 85.333333-38.4 85.333333-85.333333V106.666667H298.666667z" fill="#FFCCBC" /><path d="M426.666667 213.333333h384v85.333334H426.666667zM426.666667 362.666667h170.666666v42.666666h-170.666666zM640 362.666667h170.666667v42.666666h-170.666667zM426.666667 448h170.666666v42.666667h-170.666666zM640 448h170.666667v42.666667h-170.666667zM426.666667 533.333333h170.666666v42.666667h-170.666666zM640 533.333333h170.666667v42.666667h-170.666667zM426.666667 618.666667h170.666666v42.666666h-170.666666zM640 618.666667h170.666667v42.666666h-170.666667zM426.666667 704h170.666666v42.666667h-170.666666zM640 704h170.666667v42.666667h-170.666667zM426.666667 789.333333h170.666666v42.666667h-170.666666zM640 789.333333h170.666667v42.666667h-170.666667z" fill="#FF5722" /></svg>,
        href:"/market-trends/news"  
    },{
        name: "Guides",
        value: "",
        icon: <svg width="22px" height="22px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M640 608h-64V416h64v192zm0 160v160a32 32 0 01-32 32H416a32 32 0 01-32-32V768h64v128h128V768h64zM384 608V416h64v192h-64zm256-352h-64V128H448v128h-64V96a32 32 0 0132-32h192a32 32 0 0132 32v160z"/><path fill="#ffffff" d="M220.8 256l-71.232 80 71.168 80H768V256H220.8zm-14.4-64H800a32 32 0 0132 32v224a32 32 0 01-32 32H206.4a32 32 0 01-23.936-10.752l-99.584-112a32 32 0 010-42.496l99.584-112A32 32 0 01206.4 192zm678.784 496l-71.104 80H266.816V608h547.2l71.168 80zm-56.768-144H234.88a32 32 0 00-32 32v224a32 32 0 0032 32h593.6a32 32 0 0023.936-10.752l99.584-112a32 32 0 000-42.496l-99.584-112A32 32 0 00828.48 544z"/></svg>,
        href:"/buying-guide"  
    },{
        name: "Selling Tips",
        value: "",
        icon: <svg width="22px" height="22px" viewBox="0 -32 1088 1088" fill="#ffffff"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M992 64H768c-52.8 0-126.546 30.546-163.882 67.882L227.882 508.118c-37.334 37.334-37.334 98.428 0 135.764l280.236 280.232c37.334 37.336 98.428 37.336 135.764 0l376.232-376.232C1057.454 510.546 1088 436.8 1088 384V160c0-52.8-43.2-96-96-96z m-128 320c-53.02 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM86.626 598.624l342.378 342.378c-36.264 19.16-82.462 13.54-112.886-16.888L35.882 643.882c-37.334-37.336-37.334-98.43 0-135.764L412.118 131.882C449.454 94.546 523.2 64 576 64L86.626 553.372c-12.444 12.446-12.444 32.808 0 45.252z" /></svg>,
        href:"/selling-tips"  
    },  


    
    
    // {
    //     name: "Transaction Prices",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 -32 1088 1088" fill="#ffffff"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M992 64H768c-52.8 0-126.546 30.546-163.882 67.882L227.882 508.118c-37.334 37.334-37.334 98.428 0 135.764l280.236 280.232c37.334 37.336 98.428 37.336 135.764 0l376.232-376.232C1057.454 510.546 1088 436.8 1088 384V160c0-52.8-43.2-96-96-96z m-128 320c-53.02 0-96-42.98-96-96s42.98-96 96-96 96 42.98 96 96-42.98 96-96 96zM86.626 598.624l342.378 342.378c-36.264 19.16-82.462 13.54-112.886-16.888L35.882 643.882c-37.334-37.336-37.334-98.43 0-135.764L412.118 131.882C449.454 94.546 523.2 64 576 64L86.626 553.372c-12.444 12.446-12.444 32.808 0 45.252z" /></svg>,
    //     href:"/market-trends/transaction-prices"
    // },{
    //     name: "Price Trends",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg">
    //     <title>trend</title>
    //     <desc>Created with Sketch.</desc>
    //         <g id="trend" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //             <g id="编组">
    //                 <rect id="矩形" fillOpacity="0.01" fill="#FFFFFF" x="0" y="0" width="48" height="48"/>
    //                 <rect id="Rectangle" stroke="#000000" strokeWidth="4" fill="#2F88FF" fillRule="nonzero" stroke-linejoin="round" x="6" y="6" width="36" height="36" rx="3"/>
    //                 <g id="Group" transform="translate(13.000000, 13.000000)" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" strokeWidth="4">
    //                     <polyline id="Line-2" transform="translate(10.729923, 10.927306) rotate(-135.000000) translate(-10.729923, -10.927306) " points="13.8290808 -0.525973264 13.8290808 7.47402674 7.63076535 7.48132266 7.6591204 22.3805856"/>
    //                     <polyline id="Path-6" points="13 5 21 5 21 13"/>
    //                 </g>
    //             </g>
    //         </g>
    //     </svg>,
    //     href:"/market-trends/price-trends"  
    // },{
    //     name: "Rating & Reviews",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    //                 <g id="chat" transform="translate(-248 -124)">
    //                 <path id="Path_66" data-name="Path 66" d="M275,146h4V125H253v4" fill="none" stroke="#f1d17c" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"/>
    //                 <path id="Path_67" data-name="Path 67" d="M270,150h5V129H249v21h14" fill="none" stroke="#498efc" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"/>
    //                 <path id="Path_68" data-name="Path 68" d="M270,150v5l-7-5" fill="none" stroke="#498efc" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2"/>
    //                 <line id="Line_36" data-name="Line 36" x2="8" transform="translate(258 137)" fill="none" stroke="#f1d17c" stroke-linecap="square" strokeMiterlimit="10" strokeWidth="2"/>
    //                 <line id="Line_37" data-name="Line 37" x2="8" transform="translate(258 142)" fill="none" stroke="#f1d17c" stroke-linecap="square" strokeMiterlimit="10" strokeWidth="2"/>
    //                 </g>
    //             </svg>,
    //     href:"/market-trends/ratings-and-reviews"  
    // },
    // {
    //     name: "Insights",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 24 24" id="_24x24_On_Light_Insights" data-name="24x24/On Light/Insights" xmlns="http://www.w3.org/2000/svg">
    //             <rect id="view-box" width="24" height="24" fill="none"/>
    //             <path id="Shape" d="M10.75,1.5A2.25,2.25,0,0,1,13,3.75v9.028h1.5V3.75A3.75,3.75,0,0,0,10.75,0H.75a.75.75,0,0,0,0,1.5C1.669,1.5,2,1.831,2,2.75v11A3.75,3.75,0,0,0,5.75,17.5h8V16h-8A2.25,2.25,0,0,1,3.5,13.75v-11A3.392,3.392,0,0,0,3.285,1.5Z" transform="translate(4.25 3.25)" fill="#FFFFFF"/>
    //             <path id="Shape-2" data-name="Shape" d="M7.765,17.5A3.294,3.294,0,0,0,10.738,16H7.754C9.307,16,10,15,10,12.749a.751.751,0,0,1,.751-.75h8a.751.751,0,0,1,.75.75v1a3.755,3.755,0,0,1-3.75,3.75ZM10.738,16H15.75A2.253,2.253,0,0,0,18,13.749V13.5H11.472A5.4,5.4,0,0,1,10.738,16ZM7,16.75A.72.72,0,0,1,7.749,16h0v1.5A.719.719,0,0,1,7,16.75ZM.75,5.5A.751.751,0,0,1,0,4.75v-2a2.75,2.75,0,1,1,5.5,0v2a.751.751,0,0,1-.75.75ZM1.5,2.75V4H4V2.75a1.25,1.25,0,1,0-2.5,0Z" transform="translate(2.25 3.25)" fill="#FFFFFF"/>
    //         </svg>,
    //     href:"property-insights"  
    // },,{
    //     name: "My Property Insights",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 48 48">
    //         <polygon fill="#E8EAF6" points="42,39 6,39 6,23 24,6 42,23"/>
    //         <g fill="#C5CAE9">
    //             <polygon points="39,21 34,16 34,9 39,9"/>
    //             <rect x="6" y="39" width="36" height="5"/>
    //         </g>
    //         <polygon fill="#B71C1C" points="24,4.3 4,22.9 6,25.1 24,8.4 42,25.1 44,22.9"/>
    //         <rect x="18" y="28" fill="#D84315" width="12" height="16"/>
    //         <rect x="21" y="17" fill="#01579B" width="6" height="6"/>
    //         <path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z"/>
    //     </svg>,
    //     href:"property-insights"  

    // },{
    //     name: "Articles",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#FFFFFF" strokeWidth="1" stroke-linecap="round" stroke-linejoin="miter">
    //         <rect x="2" y="2" width="20" height="20" rx="0"/>
    //         <rect x="2" y="2" width="20" height="20" rx="0" fill="#FFFFFF" opacity="0.1"/>
    //         <line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="17" y2="12"/>
    //         <line x1="7" y1="16" x2="12" y2="16"/>
    //     </svg>,
    //     href:"property-insights"  

    // },{
    //     name: "Budget Calculator",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V11H2V6Z" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M18.5 16.5L15.5 16.5" stroke="#ffffff" strokeWidth="2" stroke-linecap="round"/>
    //     <path d="M12 11H22V18C22 20.2091 20.2091 22 18 22H12V11Z" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M12 11H2V18C2 20.2091 3.79086 22 6 22H12V11Z" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M5.5 18L7 16.5M7 16.5L8.49999 15M7 16.5L8.5 18M7 16.5L5.50001 15" stroke="#ffffff" strokeWidth="2" stroke-linecap="round"/>
    //     </svg>,
    // },{
    //     name: "EMI Calculator",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 -0.5 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg">
    //     <title>890</title>
    //     <defs/>
    //     <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    //         <path d="M13.58,0 L4.322,0 C3.592,0 3,0.598 3,1.334 L3,14.667 C3,15.404 3.592,16 4.322,16 L13.58,16 C14.309,16 15,15.404 15,14.667 L15,1.334 C15,0.598 14.31,0 13.58,0 L13.58,0 Z M7.021,14 L4.987,14 L4.987,13 L7.021,13 L7.021,14 L7.021,14 Z M7.021,8.021 L4.987,8.021 L4.987,7 L7.021,7 L7.021,8.021 L7.021,8.021 Z M10,14 L7.986,14 L7.986,13 L10,13 L10,14 L10,14 Z M7.021,11 L4.987,11 L4.987,10 L7.021,10 L7.021,11 L7.021,11 Z M10,11 L7.986,11 L7.986,10 L10,10 L10,11 L10,11 Z M10,8 L7.986,8 L7.986,7 L10,7 L10,8 L10,8 Z M13,14 L11,14 L11,9.979 L13,9.979 L13,14 L13,14 Z M13,8.02 L10.986,8.02 L10.986,7 L13,7 L13,8.02 L13,8.02 Z M14.014,6 L4,6 L4,2 L14.014,2 L14.014,6 L14.014,6 Z" fill="#000000" stroke='#ffffff' />
    //     </g>
    // </svg>,
    // },{
    //     name: "Home Loan Eligibility Calculator",
    //     value: "",
    //     icon: <svg width="22px" height="22px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M10 17V44H38V17" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M5 22L10 17L24 4L38 17L43 22" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M19 19L24 25L29 19" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M18 31H30" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M18 25H30" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     <path d="M24 25V37" stroke="#ffffff" strokeWidth="4" stroke-linecap="round" stroke-linejoin="round"/>
    //     </svg>,
    // },{
    //     name: "Area Convertor Tool",
    //     value: "",
    //     icon:<svg width="22px" height="22px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
    //     <path fill="#ffffff" d="M1 15v-15h-1v16h16v-1h-15z"/>
    //     <path fill="#ffffff" d="M10 7c-2 0-2.080-1-4-1-2.34 0-4 3-4 3v5h14v-12c-2 0-3.86 5-6 5z"/>
    //     </svg>,
    // },
];



type Props = {}


function MarketNavigator({}: Props) {
  const [section, setSection] = useState("");
  const path = usePathname();

  useEffect(()=>{
    const currentPath = staticData.filter(eachOne=> path.includes(eachOne.href))[0];
    setSection(currentPath?.name);
  }, [path]);

  return (
    <div className=' flex justify-start items-center max-w-[94%] md:max-w-[100%] overflow-x-auto relative top-[-17px] '>
        <div className='flex justify-start items-center gap-[8px] md:gap-[16px] '>
            {staticData.map((each)=>{
                return(
                    <Link prefetch={false} rel="noopener noreferrer" key={each.name} href={each.href}>
                        <button 
                            title={`Click to Select ${each.name}`} className={`group border-[2px] border-solid border-white bg-transparent text-nowrap rounded-[34px] `}
                            // onClick={()=>onSelectSection(each.name)}
                        >
                            <div className={`w-[28px] h-[28px] md:w-[34px] md:h-[34px] min-w-[28px] md:min-w-[34px] rounded-full bg-gray-600 flex justify-center items-center gap-[10px] overflow-hidden transition-all duration-500 ease-in-out group-hover:w-auto group-hover:min-w-[100px] group-hover:px-[10px] ${each.name === section ? "!w-auto !min-w-[100px] !px-[10px]" : ""} `}> 
                                <span className='w-[16px] h-[16px] md:w-[22px] md:h-[22px] flex justify-center items-center ' >{each.icon}</span>
                                {each.name === section ?
                                <span className={` font-bold text-[12px] md:text-[14px] text-white`}>{each.name}</span>
                                :
                                <span className={`hidden group-hover:block font-bold text-[12px] md:text-[14px] text-white `}>{each.name}</span>
                                }
                            </div>
                        </button>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default MarketNavigator