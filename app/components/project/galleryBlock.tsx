/* eslint-disable no-unused-vars */
"use client";
import { PopupOpenSvg, videoPlayIcon } from "@/app/images/commonSvgs";
import { Media } from "@/app/validations/types/project";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { getImageUrls } from "@/app/utils/image";
// import { useGallery } from "@/app/hooks/useGallery";
import PropertyHeading from "../property/heading";
import clsx from "clsx";
import SubHeading from "./headings/SubHeading";
import { useMediaQuery } from "@mantine/hooks";
import VideoJsonLdScript from "@/app/seo/VideoJson";
import { useSetAtom } from "jotai";
import { galleryStateAtom } from "@/app/store/project/gallery";
import Image from "next/image";
import { preventBackButton } from "../molecules/popups/req";

export default function GalleryBlock({
  walkThrowVideoUrl,
  projName,
  media,
  projectVideoIUrl,
  newTitle,
  // videoUrl,
  type = "proj",
}: Media) {
  const images = getImageUrls(media);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(images[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videos = [walkThrowVideoUrl, projectVideoIUrl, media?.videoUrl].filter(
    (video) => video !== "" && video !== undefined
  );

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

  const isMobile = useMediaQuery(`(max-width: 750px)`);
  const dispatch = useSetAtom(galleryStateAtom);
  const handleMediaClick = (media: string, index: number) => {
    setSelectedMedia(media);
    setCurrentSlide(index);
  };

  return (
    <div
      className="w-[95%] md:w-[90%] sm:pt-[50px] scroll-mt-[165px] mt-[50px] sm:mt-0 mb-[3%] sm:mb-0"
      id="gallery"
    >
      {type === "prop" ? (
        <PropertyHeading
          title="Gallery"
          desc={`Gallery Highlights : A Glimpse into good property ${newTitle}`}
        />
      ) : (
        <>
          <h2
            className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words text-wrap w-[78%] scroll-mt-[260px]"
            id="videos"
          >
            <strong>
              <span className="text-[#001F35]">Gallery of </span>
              <span className="text-green-800 scroll-mt-[260px]" id="photos">
                {projName}
              </span>{" "}
            </strong>
          </h2>

          <SubHeading
            text="Gallery highlights : A glimpse into good project"
            className="mb-4 sm:mb-2"
          />
        </>
      )}
      <div className="flex justify-center flex-col md:flex-row items-center-full sm:mt-[1%]">
        {/* Image display con */}
        <div className="w-[100%] md:w-[50%] bg-white h-[220px] overflow-hidden sm:h-[394px] lg:h-auto md:mb-[0%] mr-[3%] rounded-[14px] flex justify-center items-center p-1">
          {selectedMedia && (
            <div
              className={clsx(
                "w-[100%] sm:h-[100%] md:h-[100%] sm:max-h-[100%] flex justify-center items-center sm:mb-[3%] md:mb-[0%] sm:mr-[3%] relative rounded-[14px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]",
                (selectedMedia.includes(".mp4") ||
                  selectedMedia.includes("youtube")) &&
                  "flex justify-center items-center"
              )}
            >
              {selectedMedia.includes(".mp4") ||
              selectedMedia.includes("youtube") ? (
                <ReactPlayer
                  url={selectedMedia}
                  width="100%"
                  height={isMobile ? "250px" : "462px"}
                  controls
                  playing
                />
              ) : (
                <div className="min-h-[220px] max-h-[250px] sm:max-h-[400px] xl:max-h-[450px]">
                  <picture>
                    <source
                      media="(max-width: 460px)"
                      srcSet={selectedMedia.split(",")[1]}
                    />
                    <source
                      media="(max-width: 800px)"
                      srcSet={selectedMedia.split(",")[2]}
                    />
                    {/* <Image
                      src={selectedMedia.split(",")[2]}
                      alt={
                        type === "prop" ? "Property Gallery" : "Project Gallery"
                      }
                      title={
                        type === "prop" ? "Property Gallery" : "Project Gallery"
                      }
                      className="cursor-pointer object-contain"
                      onClick={() => {
                        dispatch({
                          type: "OPEN",
                          payload: {
                            items: images,
                            mediaType: "image",
                            title:
                              type === "prop"
                                ? "Property Gallery"
                                : "Project Gallery",
                            activeIndex: images.indexOf(selectedMedia),
                          },
                        });
                      }}
                      width={799}
                      height={400}
                      unoptimized
                    /> */}

                    <img
                      alt={type === "prop" ? "Property Gallery" : "Project Gallery"}
                      title={type === "prop" ? "Property Gallery" : "Project Gallery"}
                      src={selectedMedia.split(",")[2]} // fallback image
                      width={799}
                      height={400}
                      className="cursor-pointer object-contain"
                      loading="lazy"
                    />
                  </picture>
                </div>
              )}
              <button
                aria-label="Open Gallery"
                name="Open Gallery" 
                title="Open Gallery"
                onClick={() => {
                  const isVideo =
                    selectedMedia.includes(".mp4") ||
                    selectedMedia.includes("youtube");
                  dispatch({
                    type: "OPEN",
                    payload: {
                      items: isVideo ? videos : images,
                      mediaType: isVideo ? "video" : "image",
                      title:
                        type === "prop"
                          ? isVideo
                            ? "Property Video"
                            : "Property Gallery"
                          : isVideo
                          ? "Project Video"
                          : "Project Gallery",
                      activeIndex: isVideo
                        ? videos.indexOf(selectedMedia)
                        : images.indexOf(selectedMedia),
                    },
                  });
                  preventBackButton();
                }}
                className="absolute bottom-7 sm:bottom-3 right-1 xl:right-3 z-[6]"
              >
                <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[33px] lg:h-[33px]" />
              </button>
            </div>
          )}
        </div>
        {/* all media display con */}
        <div className="w-[100%] md:w-[47%] mt-3 sm:mt-0">
          <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-1 sm:mb-[2%]">
            Photos
          </h3>
          <div className="flex justify-start items-start w-full gap-[4%] flex-wrap relative">
            {images?.map((img, ind) => {
              if (img.includes("masterplan")) return null;

              const imageUrl = img.split(",")[1];
              const imageName = imageUrl.split("/")[6]?.split(".")[0];
              const allSizesSchemas = img.split(",").map((url, schemaIndex) => {
                return (
                  <script
                    key={`schema_${ind.toString()}_${schemaIndex.toString()}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "ImageObject",
                        contentUrl: url,
                        license:
                          "https://www.getrightproperty.com/privacy-policy",
                        acquireLicensePage:
                          "https://www.getrightproperty.com/privacy-policy",
                        creditText: imageName,
                        creator: {
                          "@type": "Person",
                          name: projName?.split(" ")[0],
                        },
                        copyrightNotice: projName?.split(" ")[0],
                      }),
                    }}
                  />
                );
              });
              return (
                <div
                  className="relative w-[110px] min-w-[90px] sm:min-w-[120px] xl:w-[152px] h-[68px] lg:h-[94px] mb-[4%]"
                  key={`gallery_block_${imageUrl}_${ind.toString()}`}
                >
                  {allSizesSchemas}
                  <Image
                    src={imageUrl}
                    alt={imageName || ""}
                    title={imageName || ""}
                    className={clsx(
                      "!rounded-[5px] shadow-md cursor-pointer border border-gray-300",
                      selectedMedia?.split("?")[0] === img.split("?")[0] &&
                        "!border-2 !border-btnPrimary !shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                    )}
                    onClick={() => handleMediaClick(img, ind)}
                    unoptimized
                    fill
                  />
                </div>
              );
            })}
          </div>
        </div>

        {videos && videos.length > 0 && (
          <div className="w-[100%] md:w-[47%]">
            <h3 className="text-[#737579] font-[600] text-[20px] lg:text-[24px] mb-1 sm:mb-[2%] scroll-mt-[400px]">
              Videos
            </h3>
            <div className="flex justify-start items-start w-full gap-[4%] flex-wrap">
              {videos?.map((img, ind) => (
                <div
                  key={`gallery_block_video_${ind.toString()}`}
                  className={clsx(
                    "relative w-[110px] lg:w-[152px] flex justify-center items-center h-[68px] md:h-[94px] bg-white rounded-[5px] mb-[4%] cursor-pointer",
                    selectedMedia === img &&
                      "border-2 !border-btnPrimary shadow-[0px_4px_20px_0px_rgba(91,143,182,0.19)]"
                  )}
                >
                  <VideoJsonLdScript
                    contentUrl={img}
                    name={`${projName} ${VideoALText(img)}`}
                    description={`This video is about ${projName} ${VideoALText(
                      img
                    )}`}
                  />
                  {img.includes("youtube") ? (
                    <Image
                      width={150}
                      height={90}
                      src={getYouTubeThumbnailUrl(img) ?? ""}
                      className="!w-full rounded-[5px] cursor-pointer h-[64px] md:h-[90px] object-cover"
                      alt="thumbnail"
                      title="thumbnail"
                      onClick={() => handleMediaClick(img, ind)}
                    />
                  ) : (
                    <video
                      key={img}
                      src={img}
                      className="!w-full rounded-[5px] cursor-pointer h-[64px] md:h-[90px] object-cover"
                      onClick={(e) => {
                        e.preventDefault();
                        handleMediaClick(img, ind);
                      }}
                    >
                      <track
                        src="/audio.vtt"
                        kind="captions"
                        srcLang="en"
                        label="English"
                        default
                      />
                    </video>
                  )}
                  <span
                    className="absolute pointer-events-none"
                    onClick={(e) => {
                      handleMediaClick(img, ind);
                    }}
                  >
                    {videoPlayIcon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const VideoALText = (url: string) => {
  if (url.includes("walk-Through-video")) {
    return "Walk Through Video";
  } else {
    return "Project Video";
  }
};
