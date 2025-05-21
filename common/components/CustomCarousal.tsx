// "use client";

// import React, {useEffect, useRef} from 'react';
// import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';

// type props = {
//   dataLength?: number;
//   allCards?: any;
//   containerClass?: string;
// };

// function CustomCarousal({dataLength, allCards, containerClass}:props) {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const parentRef = useRef<HTMLDivElement>(null);

//     const onScrollingLeftAndRight = (direction: any, index?:number) => {
//         const container = containerRef?.current;

//         if(container){
//             const containerwidth = container.offsetWidth ? container.offsetWidth : 0;

//             if(index !== undefined && direction === ""){
//                 console.log(index, index === 0 ? 0 :index * containerwidth)
//                 container.scrollLeft = index * containerwidth;
//             }else{
//                 if (direction == "L") {
//                     container.scrollLeft -= containerwidth;
//                 } else {
//                     container.scrollLeft += containerwidth;
//                 }
//             }
    
//         };
//     };

//     useEffect(() => {
//         const parent = parentRef.current;
//         if (!parent) return;

//         const innerDivs = parent.querySelectorAll<HTMLDivElement>('.carousel-slide');
//         if (!innerDivs.length) return;

//         const resize = () => {
//             const parentWidth = parent.offsetWidth;
//             innerDivs.forEach((div) => {
//                 div.style.minWidth = `${parentWidth}px`;
//             });
//         };

//         resize();
//         window.addEventListener('resize', resize);
//         return () =>  window.removeEventListener('resize', resize);
//     }, []);
    
//     return (
//         <div className={`relative flex justify-center items-end w-[94%] md:w-[90%] h-full relative ${containerClass ? containerClass : ""} `} >
//             {dataLength != undefined && dataLength != null && dataLength >= 2 &&
//             <PrevCarouselButton
//                 className={`w-[40px] h-[40px] cursor-pointer bottom-1 absolute left-[10px] md:left-[20px] top-[45%] z-10`}
//                 onClick={() => onScrollingLeftAndRight("L")}
//                 circle='#CBD4E1'
//                 iconColor='#7C909D'
//             />
//             }

//             <div 
//                 ref={containerRef} 
//                 className='relative flex justify-start items-center w-full h-full overflow-x-auto scroll-smooth scrollbar-hide'
//                 style={{ userSelect: "none" }}
//             >
//                 <div ref={parentRef} className='w-full flex justify-start items-start max-w-[100%] h-full flex-nowrap '> 
//                     {allCards}
//                 </div>
//             </div>

//             {dataLength != undefined && dataLength != null && dataLength >= 2 &&
//             <NextCarouselButton
//                 className={`w-[40px] h-[40px] cursor-pointer bottom-1 absolute right-[10px] md:right-[20px] top-[45%] z-10`}
//                 onClick={() => onScrollingLeftAndRight("R")}
//                 circle='#CBD4E1'
//                 iconColor='#7C909D'
//             />
//             }

//             <div className='flex justify-center items-center gap-[14px] w-full absolute bottom-[60px]  '>
//                 {[...Array(dataLength)].map((_, index) => (
//                     <div 
//                         key={index} 
//                         // style={{ backgroundColor: index ===  }} 
//                         className="rounded-full w-[14px] h-[14px] bg-white" 
//                         onClick={() => onScrollingLeftAndRight("", index)}
//                     >
//                         {/* {index + 1} */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default CustomCarousal;

"use client";

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { NextCarouselButton, PrevCarouselButton } from '@/app/images/commonSvgs';
import Image from 'next/image';

type Props = {
  containerClass?: string;
  images: string[];
  projName?: string;
};

function CustomCarousel({ containerClass = "", images, projName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const dataLength = images.length;

  const handleScroll = useCallback(
    (direction: "L" | "R" | "" = "", index?: number) => {
      const container = containerRef.current;
      if (!container || dataLength === 0) return;

      const width = container.offsetWidth;
      let nextIndex = currentIndex;

      if (direction === "") {
        nextIndex = index ?? 0;
      } else {
        nextIndex =
          direction === "R"
            ? (currentIndex + 1) % dataLength
            : (currentIndex - 1 + dataLength) % dataLength;
      }

      setCurrentIndex(nextIndex);
      container.scrollTo({ left: nextIndex * width, behavior: "smooth" });
    },
    [currentIndex, dataLength]
  );

  const [stopAutoScroll, setStopAutoScroll ] = useState(false);

  // Auto-play every 4s
  useEffect(() => {
    if (stopAutoScroll) return;
    const interval = setInterval(() => {
      handleScroll("R");
    }, 4000);

    return () => clearInterval(interval);

  }, [handleScroll, stopAutoScroll]);

  const onClickBox = () => {
    console.log("clicked")
    setStopAutoScroll(true);
    setTimeout(()=>{
      setStopAutoScroll(false);
    }, 30000)
  }

  return (
    <div className={`relative flex justify-center items-end w-[94%] md:w-[90%] h-full ${containerClass}`} onClick={onClickBox} >
      {dataLength >= 2 && (
        <PrevCarouselButton
          className="w-[40px] h-[40px] cursor-pointer absolute left-[10px] md:left-[20px] top-[45%] z-10"
          onClick={() => handleScroll("L")}
          circle="#CBD4E1"
          iconColor="#7C909D"
        />
      )}

      <div
        ref={containerRef}
        className="relative flex w-full h-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pointer-events-no "
        style={{ userSelect: "none" }}
      >
        <div
          ref={parentRef}
          className="w-full flex flex-nowrap h-full items-start"
        >
          {images.map((imageUrl: string, index: number) => {
            const urls = imageUrl.split(",");
            const getUrl = (i: number) =>
              urls[i]?.includes("+") ? urls[i].replace(/\+/g, "%2B") : urls[i] || "";
                const parent = parentRef.current;
                const width = parent ? parent?.offsetWidth : 1000;
            return (
              <div
                key={`projDetailsCarousel_${index}`}
                className="carousel-slide h-full flex justify-center items-center min-h-[300px] sm:min-h-[545px] xl:min-h-[750px]"
                style={{ minWidth: `${width}px` }}
              >
                <picture>
                  <source media="(max-width: 460px)" srcSet={getUrl(1)} />
                  <source media="(max-width: 768px)" srcSet={getUrl(2)} />
                  <source media="(min-width: 1200px)" srcSet={getUrl(3)} />
                  <Image
                    alt={projName || "Project Image"}
                    title={projName || "Project Image"}
                    src={getUrl(3)}
                    height={750}
                    width={900}
                    className="object-fit h-[300px] sm:h-[545px] xl:h-[750px]"
                    unoptimized
                    quality={80}
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>

      {dataLength >= 2 && (
        <NextCarouselButton
          className="w-[40px] h-[40px] cursor-pointer absolute right-[10px] md:right-[20px] top-[45%] z-10"
          onClick={() => handleScroll("R")}
          circle="#CBD4E1"
          iconColor="#7C909D"
        />
      )}

      <div className="hidden xl:flex justify-center items-center gap-[14px] w-full absolute mb-[30px]">
        {Array.from({ length: dataLength }).map((_, index) => (
          <div
            key={index}
            className={`rounded-full w-[14px] h-[14px] cursor-pointer ${
              index === currentIndex ? "bg-blue-400" : "bg-white"
            }`}
            onClick={() => handleScroll("", index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;

