"use client"

import { useAtom } from 'jotai';
import React from 'react';
import { trendsFilterData } from '../data.ts/marketBlogalData';
// import { usePathname } from 'next/navigation';

type Props = {}

function SearchField({}: Props) {
  const [, setFilterData] = useAtom(trendsFilterData);
  
  const onSearch = (e:any) => {
    setFilterData(prev => ({ ...prev, inputSearch: e.target.value }));
  };

  // const path = usePathname();

  return (
      <div className='flex justify-between border-t-[1px] border-solid shadow-md rounded-[4px] max-w-[600px] w-[90%] p-[4px] md:p-[6px] pl-[10px] gap-[6px] mb-[20px] mt-[0px] md:mb-[30px] md:mt-[20px] '>
          <input 
              type='search'
              placeholder='Enter a city, locality or society'
              className=' text-gray-700 font-medium border-0 focus:outline-none w-full  bg-transparent text-[12px] md:text-[14px] ' 
              onChange={onSearch}
          />
          <button className=' bg-gray-400 p-[4px] font-medium text-white border-0 text-nowrap text-[12px] md:text-[14px] rounded-[4px] px-[6px] '>
              Search
          </button>
      </div>
  )
}

export default SearchField