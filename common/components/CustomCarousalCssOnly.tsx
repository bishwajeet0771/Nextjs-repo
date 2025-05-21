import React from 'react';
import style from "@/app/styles/CustomCarousel.module.css";
import Image from 'next/image';

type Props = {
  urlsData:any;
  projName?:string;
};

const CustomCarousalCssOnly = ({urlsData, projName}: Props) => {
  const dataLength = urlsData.length;
  return (
    <section className={style.carousel} aria-label="Gallery">
      <ol className={style.carousel__viewport}>
        {urlsData.map((imageUrl:any, index:number) => {
          const item = index+1;
          const prevCount = item !== 1 ? item - 1 : dataLength;
          const nextCount = item === dataLength ? 1 : item + 1;
          return(
              <li key={`customCarosual_${index.toString()}`} id={`carousel__slide${item}`} tabIndex={item} className={style.carousel__slide}>
                <div className={style.carousel__snapper}> 
                    <picture>
                      <source
                        media="(max-width: 460px)"
                        srcSet={imageUrl.split(",")[1] ? imageUrl.split(",")[1].includes("+") 
                          ? imageUrl.split(",")[1].replace(/\+/g, "%2B")
                          : imageUrl.split(",")[1] : imageUrl.split(",")[1]
                      }
                      />
                      <source
                        media="(max-width: 768px)"
                        srcSet={imageUrl.split(",")[2] ?imageUrl.split(",")[2].includes("+")
                          ? imageUrl.split(",")[2].replace(/\+/g, "%2B")
                          : imageUrl.split(",")[2] : imageUrl.split(",")[2]
                      }
                      />
                      <source
                        media="(min-width: 1200px)"
                        srcSet={imageUrl.split(",")[3] ?imageUrl.split(",")[3].includes("+") 
                          ? imageUrl.split(",")[3].replace(/\+/g, "%2B")
                          : imageUrl.split(",")[3] : imageUrl.split(",")[3]
                      }
                        //srcSet={imageUrl.split(",")[3]}
                      />
                      <Image
                        alt={projName ? projName : "Project Image"}
                        title={projName ? projName : "Project Image"}
                        // src={imageUrl.split(",")[3]}
                        src={imageUrl.split(",")[3] ?imageUrl.split(",")[3].includes("+") 
                          ? imageUrl.split(",")[3].replace(/\+/g, "%2B")
                          : imageUrl.split(",")[3] : imageUrl.split(",")[3]
                        }
                        height={630}
                        width={1200}
                        className={` w-full h-full object-cover max-h-[300px] sm:max-h-[545px] !xl:max-h-[750px] xl:max-h-[750px] `}
                        unoptimized
                        quality={80} 
                      />
                    </picture>

                    <a href={`#carousel__slide${prevCount}`} className={style.carousel__prev}>
                      Go to last slide
                    </a>
                    <a href={`#carousel__slide${nextCount}`} className={style.carousel__next}>
                      Go to next slide
                    </a>
                </div>
            </li>
          )})}
      </ol>

      <aside className={style.carousel__navigation}>
        <ol className={style.carousel__navigation_list}>
          {[...Array(dataLength)].map((_:any, index:number) => (
            <li key={`customCarosualButton_${index.toString()}`} className={style.carousel__navigation_item}>
              <a href={`#carousel__slide${index+1}`} className={style.carousel__navigation_button}>
                Go to slide {index+1}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
};

export default CustomCarousalCssOnly;

