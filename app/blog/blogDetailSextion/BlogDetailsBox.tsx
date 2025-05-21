"use client";

import React from 'react';
import BlogDetailLeftSection from './BlogDetailLeftSection';
import BlogDetailRightSection from './BlogDetailRightSection';

function BlogDetailsBox() {
  return (
    <div className='flex flex-col md:flex-row justify-center items-start mb-[3%] w-[94%] md:w-[90%] xl:w-[80%] md:gap-[40px] '>
      <BlogDetailLeftSection />
      <BlogDetailRightSection />
    </div>
  )
}

export default BlogDetailsBox