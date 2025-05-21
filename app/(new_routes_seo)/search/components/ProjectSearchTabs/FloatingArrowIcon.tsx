"use client";
// import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

type Props = {}

function FloatingArrowIcon({}: Props) {
    // const isMobile = useMediaQuery("(max-width: 601px)");
    const [isScrolling, setIsScrolling] = useState(false);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setIsScrolling(false);
          } else {
            setIsScrolling(true);
          }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // if(!isMobile) return;

    return (
        <button
            onClick={()=> window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex justify-center items-center p-[10px] bg-[#0073C6] rounded-full hover:bg-[#0073C6]/90 fixed bottom-[20px] right-[30px] md:right-[62%] xl:right-[52%] z-100 shadow-lg transition-opacity duration-500 ${
                isScrolling ? 'opacity-100' : 'opacity-0'
              }`}
              title='Click to go Top'
           >
            <MdKeyboardArrowDown className="w-[20px] h-[20px] rotate-180 stroke-white fill-white " />
        </button>
    )
}

export default FloatingArrowIcon;