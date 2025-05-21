import Image from "next/image";

export const GrpLogoSvg = ({ className }: { className: string }) => (
  <Image
    src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/grp-logo-tm.webp`}
    width={160}
    height={54}
    alt="getright logo"
    title="getright logo"
    className={className}
    unoptimized
  />
);

/* export const GrpLogoSvgMobile = ({ className }: { className: string }) => (
  <Image
    src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/grp-logo-mobile.webp`}
    width={160}
    height={50}
    alt="getright logo"
    title="getright logo"
    className={className}
    unoptimized
  />
); */


export const GrpDarkLogoSvg = ({ className }: { className: string }) => {
  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_IMG_BASE}/staticmedia-images-icons/grp-logo/grp-logo-footer.webp`}
      width={182}
      height={64}
      alt="getright logo"
      className={className}
      unoptimized
      title="getright logo"
    />
  );
};
