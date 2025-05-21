"use client"

import React, {useEffect, useRef, useState} from 'react';
import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';

type props = {
  dataLength?: number;
  allCards?: any;
  containerClass?: string;
};

function CustomCarousalCards({dataLength, allCards, containerClass}: props) {
    // const isMobile = useMediaQuery(`(max-width: 750px)`);
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const container = containerRef?.current;

    const handleMouseDown = (e: any) => {
        setIsDragging(true);
        if(!container) return;
        setStartX(e.pageX - container.offsetLeft);
        setScrollLeft(container.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: any) => {
        if (!isDragging) return;
        e.preventDefault();
        if(!container) return;
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2; // Adjust multiplier for scroll speed
        container.scrollLeft = scrollLeft - walk;
    };

    const onScrollingLeftAndRight = (direction: string) => {
        if(container){
            const containerwidth = container.offsetWidth ? container.offsetWidth : 0;
            // const containerwidth = 1000;

            console.log(containerwidth);
            console.log(container.scrollLeft)

            if (direction == "L") {
                container.scrollLeft -= containerwidth;
            } else {
                container.scrollLeft += containerwidth;
            }
        }
    };

    useEffect(() => {
        const parent = parentRef.current;
        if (!parent) return;

        const innerDivs = parent.querySelectorAll<HTMLDivElement>('.carousel-slide');
        if (!innerDivs.length) return;

        const resize = () => {
            const parentWidth = parent.offsetWidth;

            innerDivs.forEach((div) => {
            div.style.minWidth = `${parentWidth}px`;
            });
        };

        resize(); // Initial resize
        window.addEventListener('resize', resize); // Listen to screen resize

        return () => {
            window.removeEventListener('resize', resize); // Cleanup
        };
    }, []);

    
    return (
        <div className={`relative flex justify-center items-center w-[94%] md:w-[90%] h-full relative ${containerClass ? containerClass : ""} `} >
            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <PrevCarouselButton
                className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute left-[10px] md:left-[-40px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("L")}
                circle='#CBD4E1' 
                iconColor='#7C909D'
            />
            }

            <div 
                ref={containerRef} 
                className='flex justify-start items-center w-full h-full overflow-x-auto scroll-smooth scrollbar-hide cursor-grab '
                // onMouseDown={handleMouseDown}
                // onMouseLeave={handleMouseLeave}
                // onMouseUp={handleMouseUp}
                // onMouseMove={handleMouseMove}
                style={{ userSelect: "none" }}
            >
                <div ref={parentRef} className='w-full flex justify-start items-start max-w-[100%] h-full flex-nowrap  '> 
                    {allCards}
                </div>

                <div className='flex justify-center items-center '>
                    {}
                </div>
            </div>

            {dataLength != undefined && dataLength != null && dataLength >= 2 &&
            <NextCarouselButton
                className={`w-[32px] h-[32px] cursor-pointer bottom-1 absolute right-[10px] md:right-[-40px] top-[45%] z-10`}
                onClick={() => onScrollingLeftAndRight("R")}
                circle='#CBD4E1' 
                iconColor='#7C909D'
            />
            }
        </div>
    )
}

export default CustomCarousalCards;