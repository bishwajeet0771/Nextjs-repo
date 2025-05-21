import React from 'react'
import { BlogsBannerIcon } from '@/app/images/commonSvgs';

function BlogBanner() {
  return (
    <div className='flex justify-center items-center max-h-[150px] md:max-h-[260px] bg-[#FAFCFF] relative mb-[3%] w-full '>
        <BlogsBannerIcon className="max-h-[150px] md:max-h-[260px] w-[96%] md:w-full md:max-w-[1200px]  " />
        <div className='absolute max-w-[190px] lg:max-w-[500px] md:max-w-[300px] '>
            <h2 className='apply text-black text-[16px] md:text-[22px] lg:text-[32px] not-italic font-bold leading-[normal] mb-[10px] lg:mb-[20px] md:mb-[14px]'>Unlocking Doors to Your Dream Home🏠</h2>
            <p className='text-black text-[14px] lg:text-[20px] md:text-[16px] not-italic font-medium leading-[normal]'>Your Ultimate Real Estate Resource</p>
        </div>
    </div>
  )
}

export default BlogBanner;