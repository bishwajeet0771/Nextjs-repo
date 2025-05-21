import Link from "next/link";

type Props = {
  label: string;
  type: string;
  link: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};
// eslint-disable-next-line no-unused-vars
const Card = ({ label, link, type, Icon }: Props) => {
   
                          
  return (
    <Link rel="noopener noreferrer" href={link} className="flex items-center gap-3" prefetch={false}>
      <div className="bg-[#E8F3FF] min-h-[30px] xl:w-[46px] min-w-[30px] xl:h-[46px] justify-center items-center flex rounded-full shadow-[inset_-4px_-8px_8px_#46464620]">
        <Icon />
      </div>
      <p className="text-[#303030] text-[14px] sm:text-[16px] xl:text-xl not-italic font-medium max-w-[330px] xl:max-w-[494px]">
        {label}
      </p>
    </Link>
  );
};
export default Card;
