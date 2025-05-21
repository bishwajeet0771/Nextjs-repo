/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Image } from "@mantine/core";
import {
  ImgCarouselIcon,
  // PopupOpenSvg,
  PrevCarouselIcon,
  videoPlayIcon,
} from "@/app/images/commonSvgs";
import { Carousel } from "@mantine/carousel";
import S from "@/app/styles/ImgCarousel.module.css";
import ReactPlayer from "react-player";
import { useGallery } from "@/app/hooks/useGallery";
import SharePopup from "../../atoms/SharePopup";
import { imageUrlParser } from "@/app/utils/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import clsx from "clsx";
import styles from "./Gallery.module.css";
import { useMediaQuery } from "@mantine/hooks";
import Close from "../button/close";
import ZoomInOut from "../actions/ZoomInOut";
import { useDrag } from "@use-gesture/react";
type GalleryProps = {
  selectedMedia: any;
  images: any[];
  videos: any[];
  isImage: boolean;
  currentSlide: number;
  setCurrentSlide: any;
};

const Gallery: React.FC<GalleryProps> = ({
  images,
  videos,
  isImage,
  currentSlide,
  setCurrentSlide,
}) => {
  const [content, { open, close }] = useGallery();
  const [previewImage, setPreviewImage] = useState<string | null>(
    videos[currentSlide]
  );
  const handleImageClick = (image: string) => {
    setPreviewImage(image);
    open(isImage ? "image" : "video", image);
  };
  const bind = useDrag(
    ({ swipe: [swipeX], movement: [mx] }) => {
      if (swipeX > 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      } else if (swipeX < 0 && currentSlide < images.length - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    },
    { axis: "x" }
  );
  const isMobile = useMediaQuery(`(max-width: 601px`);
  const isTab = useMediaQuery(`(max-width: 1600px`);
  if (!content) {
    return null;
  }

  function getYouTubeThumbnailUrl(watchUrl: any) {
    // Match both /watch?v= and /embed/ formats
    const match = watchUrl.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/
    );

    const videoId = match ? match[1] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : null;
  }

  return (
    <Modal
      centered={isMobile ? (isImage ? true : false) : false}
      opened={content ? true : false}
      onClose={() => {
        setPreviewImage(null);
        close();
      }}
      size={isMobile ? "100%" : isTab ? "65%" : "auto"}
      classNames={{
        close: S.close,
        content: S.content,
        header: S.header,
        overlay: S.overlay,
        inner: S.inner,
      }}
      className="!styleScroll"
    >
      <div className="h-auto w-full scrollbar-hide flex justify-center flex-col items-center  ">
        <div
          className={`w-full bg-transparent h-[57px] flex items-center justify-between min-w-[321px] mt-[26px] sm:mt-0 xl:mt-[26px] z-[1000] px-0.5 m-auto ${
            !isImage && isMobile ? "mt-50%" : "mt-[10%]"
          }`}
        >
          <p className="text-white text-2xl not-italic  font-bold leading-[normal]">
            {isImage ? "Gallery" : "Videos"}
          </p>
          <div className="flex justify-center items-center gap-5">
            <SharePopup
              title="Share"
              url={imageUrlParser(
                isImage ? images[currentSlide] : videos[currentSlide] || ""
              )}
            />

            <Close
              className="h-[29px] w-[29px] xl:w-[34px] xl:h-full"
              close={close}
            />
          </div>
        </div>

        {/* Displaying amain Image Or Video */}
        {isImage ? (
          <div {...bind()} className="w-full flex justify-center items-center">
            <TransformWrapper>
              <Content url={images[currentSlide]} />
            </TransformWrapper>
          </div>
        ) : (
          <div className="flex justify-center items-center sm:w-[800px] xl:min-w-[1000px] min-w-[300px] bg-black rounded-[10px] md:rounded-[20px] ">
            <ReactPlayer
              url={videos[currentSlide] as string}
              width="100%"
              controls
              height={isMobile ? "50vh" : "60vh"}
              playing
            />
          </div>
        )}

        {/* Bottom Image Sliders */}
        <div className="mt-4 flex items-center justify-center w-full">
          <Carousel
            classNames={styles}
            height={100}
            slideSize="15.333333%"
            slideGap="xs"
            mt={"lg"}
            maw={isMobile ? 300 : 1200}
            px={isMobile ? "50px" : "90px"}
            align={images.length > 5 ? "start" : "center"}
            slidesToScroll={isMobile ? 1 : 5}
            className="w-full min-w-[80px] !h-auto max-h-[100px] min-h-[50px]"
            withControls={
              (content?.type == "image" ? images.length : videos.length) >
              (isMobile ? (isImage ? 0 : 2) : 5)
                ? true
                : false
            }
            nextControlIcon={<ImgCarouselIcon />}
            previousControlIcon={<PrevCarouselIcon />}
          >
            {isImage ? (
              images.map((image, index) => {
                return (
                  <Carousel.Slide
                    key={image}
                    onClick={() => {
                      handleImageClick(image);
                      setCurrentSlide(index);
                    }}
                  >
                    <Image
                      radius="md"
                      h={100}
                      w="auto"
                      fit="cover"
                      src={image}
                      className={clsx(
                        `cursor-pointer w-full min-w-[150px] max-w-[150px] !h-auto max-h-[100px] min-h-[100px] object-cover bg-white`,
                        currentSlide === index && "!border-[4px] !border-white"
                      )}
                      alt="image"
                    />
                  </Carousel.Slide>
                );
              })
            ) : (
              <div className="flex items-center w-full justify-center">
                {videos.map((video, index) => (
                  <Carousel.Slide
                    key={`galleryYoutubeVideo_${video}`}
                    onClick={() => {
                      handleImageClick(video);
                      setCurrentSlide(index);
                    }}
                  >
                    <div
                      className={`relative flex items-center w-full justify-center border-1 border-solid border-white `}
                    >
                      {!video.includes("youtube") ? (
                        <video
                          key={`youtube_${video}`}
                          width={150}
                          height={100}
                          src={video as string}
                          className={`cursor-pointer border-1 border-solid border-white sm:h-full w-full min-w-[150px] rounded-[5px] !h-auto max-h-[100px] min-h-[100px] object-cover  ${
                            currentSlide === index
                              ? "border-[4px] border-white"
                              : ""
                          }`}
                          controls
                        >
                          <track
                            src="/audio.vtt" // Replace with the actual path to your captions file
                            kind="captions"
                            srcLang="en"
                            label="English"
                            default
                          />
                        </video>
                      ) : (
                        <Image
                          width={150}
                          height={100}
                          src={getYouTubeThumbnailUrl(video as string) ?? ""}
                          className={`cursor-pointer border-1 border-solid border-white sm:h-full w-full min-w-[150px] rounded-[5px] !h-auto max-h-[100px] min-h-[100px] object-cover  ${
                            currentSlide === index
                              ? "border-[4px] border-white"
                              : ""
                          }`}
                          alt="thumbnail"
                        />
                      )}

                      <span className="absolute h-[18px] w-[18px] md:h-[26px] md:w-[26px] z-[1000] pointer-events-none ">
                        {videoPlayIcon}
                      </span>
                    </div>
                  </Carousel.Slide>
                ))}
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </Modal>
  );
};

export default Gallery;

const Content = ({ url }: { url: string }) => {
  const isMobile = useMediaQuery("(max-width: 601px)");
  return (
    <div className="relative w-full flex justify-center items-center ">
      <TransformComponent>
        <Image
          radius="md"
          h={isMobile ? "auto" : 600}
          m={"auto"}
          w={1400}
          fit="contain"
          // src={previewImage ?? content?.url}
          src={url}
          className="cursor-pointer max-h-[200px]  sm:border-[5px] sm:bg-white sm:border-white w-[100%] xl:!h-[350px]  sm:min-w-[800px] sm:min-h-[300px]  xl:min-w-[1400px] xl:min-h-[600px]"
          alt="gallery_images"
        />
      </TransformComponent>
      <ZoomInOut className="right-2 bottom-4 xl:right-28 " />
    </div>
  );
};
