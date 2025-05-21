"use client"
import { subscrbeIcon } from '@/app/images/commonSvgs';
import React, { useState } from 'react'

function SubscribeBlock() {
    const [data, setData] = useState({email:"", response:null});
    const onValueChange = (e:any) => {
        setData((prev)=> ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleChange = () => {
        setData({email:"", response:null})
    }

    return (
        <div className=' w-[94%] md:w-[90%] flex justify-around items-center pb-[3%] max-h-[220px] md:max-h-[100%] py-[30px] md:py-0 '>
            <div>
                <h2 className='text-[color:var(--800,#2D3748)] text-[16px] md:text-[18px] xl:text-[24px] not-italic font-bold leading-[normal] mb-[8px] '>Subscribe To Our Newsletter</h2>
                <p className='text-[#303030] text-[14px] md:text-[16px] xl:text-[20px] italic font-medium leading-[normal] mb-[16px] md:mb-[20px] xl:mb-[30px]'>Get updates to all about the Real Estate through our blogs</p>
                <div className='border rounded-[10px] border-solid border-[#BBC9DD] bg-[#fcfcfc] h-auto md:h-[72px] p-[8px] md:p-[12px] xl:p-[16px] flex justify-between items-center gap-[10px] '>
                    <input
                        onChange={onValueChange}
                        name="email"
                        value={data.email}
                        id="Subscribe"
                        placeholder="Enter your mail for new blog "
                        type="text"
                        className="w-full border-0 bg-transparent text-[#666] text-[14px] md:text-[18px] xl:text-[20px] italic font-medium leading-[normal] outline-none "
                    />

                    <button onClick={handleChange} className='text-white text-[14px] md:text-[16px] xl:text-[20px] not-italic font-semibold leading-[normal] rounded-[4px] md:rounded-[10px] bg-[#227fbc] h-[32px] md:h-[40px] px-[12px] md:px-[14px] xl:px-[16px] '>
                        Submit
                    </button>

                </div>
            </div>
            {subscrbeIcon} 
        </div>
    )
}

export default SubscribeBlock;