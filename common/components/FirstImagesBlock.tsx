import { ShearIcon } from "@/app/images/commonSvgs";
import Image from "next/image";
import styles from "@/app/styles/DetailsPageImages.module.css";
import { preventBackButton } from "@/app/components/molecules/popups/req";
import Head from "next/head";
type Props = {
  onSelect: () => void;
  data: {
    images: string[];
    projName?: string;
    type: string;
    projectStatus?: any;
    url: string;
  };
};

function FirstImagesBlock({ onSelect, data }: Props) {
  /* console.log(data) */
  const getUrl = (urls: any, i: number) =>
    urls[i]?.includes("+") ? urls[i].replace(/\+/g, "%2B") : urls[i] || "";
  const getImage = (index: number, className: string) => {
    if (data.images[index]) {
      const urls = data.images[index].split(",");

      <>
        <Head>
          {index == 0 && (
            <link rel="preconnect" href="https://media.getrightproperty.com" />
          )}
          <link
            rel="preload"
            as="image"
            href={getUrl(data.images, 3)}
            // @ts-ignore to skip type error
            imagesrcset={`${getUrl(data.images, 1)} 460w, ${getUrl(
              data.images,
              2
            )} 768w, ${getUrl(data.images, 3)} 1200w`}
            imagesizes="(max-width: 460px) 100vw, (max-width: 768px) 100vw, 900px"
          />
        </Head>

        {/* JSX for your component */}
      </>;

      return (
        <picture>
          <source media="(max-width: 660px)" srcSet={getUrl(urls, 1)} />
          <source media="(max-width: 768px)" srcSet={getUrl(urls, 2)} />
          <source media="(min-width: 1200px)" srcSet={getUrl(urls, 3)} />
          <Image
            alt={data.projName || "Project Image"}
            title={data.projName || "Project Image"}
            src={getUrl(urls, 3)}
            height={195}
            width={900}
            className={className}
            // priority={index == 0 ? true : false}
            unoptimized={true}
            // quality={80}
          />
        </picture>
      );
    } else {
      return "";
    }
  };

  const title = data.type === "proj" ? "Share Project" : "Share Listing";

  return (
    <div
      className={styles.DetailsPageImagesMainCon}
      onClick={() => {
        onSelect();
        preventBackButton();
      }}
    >
      {/* Left side section */}
      <div className={styles.DetailsPageImagesLeftBlock}>
        {/* Project status and shear button */}

        <div className={styles.shearSectionBox}>
          <p className={styles.projectStatusText}>
            {data.type === "proj" ? "Project" : "Listing"} Status:{" "}
            <span className={styles.projectStatusTextSpan}>
              {" "}
              {data.projectStatus}
            </span>{" "}
          </p>
          <button
            aria-label={title}
            name={title}
            title={title}
            onClick={(e) => {
              e.stopPropagation();
              navigator.share({ title: title, url: data.url });
            }}
            className={`${styles.projectStatusText} ${styles.projectShearText}`}
          >
            <ShearIcon className={styles.detailsSherBtnIcon} />
            <span className={styles.detailsSherBtnText}>{title}</span>
          </button>
        </div>

        {getImage(0, styles.firstImage)}
        <span className={styles.mainCardImagesIcon}>{imagesIcon}</span>
      </div>

      {/* Right side section */}
      <div className={styles.DetailsPageImagesRightBlock}>
        <div className={styles.rightSectionImageHolderCon}>
          {getImage(1, styles.rightSectionImage)}
        </div>
        <div className={styles.rightSectionImageHolderCon}>
          {getImage(2, styles.rightSectionImage)}
          <div className={styles.thirdImageCon}>
            <p className={styles.thirdImageText}>
              {data.images.length > 2 && data.images.length !== 3
                ? `View more ${data.images.length - 3}+`
                : "View Gallery"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstImagesBlock;

const imagesIcon = (
  <svg
    fill="#FFFFFF"
    width="30px"
    height="30px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18,15V5a3,3,0,0,0-3-3H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H15A3,3,0,0,0,18,15ZM4,5A1,1,0,0,1,5,4H15a1,1,0,0,1,1,1V9.36L14.92,8.27a2.56,2.56,0,0,0-1.81-.75h0a2.58,2.58,0,0,0-1.81.75l-.91.91-.81-.81a2.93,2.93,0,0,0-4.11,0L4,9.85Zm.12,10.45A.94.94,0,0,1,4,15V12.67L6.88,9.79a.91.91,0,0,1,1.29,0L9,10.6Zm8.6-5.76a.52.52,0,0,1,.39-.17h0a.52.52,0,0,1,.39.17L16,12.18V15a1,1,0,0,1-1,1H6.4ZM21,6a1,1,0,0,0-1,1V17a3,3,0,0,1-3,3H7a1,1,0,0,0,0,2H17a5,5,0,0,0,5-5V7A1,1,0,0,0,21,6Z" />
  </svg>
);
