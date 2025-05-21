import Link from "next/link";

type props = {
  title: string;
  icon?: any;
  buttonConClass?: string;
  buttonClass?: string;
  href: string;
};

const ButtonLink = ({
  title,
  icon,
  buttonConClass,
  buttonClass,
  href,
}: props) => {
  return (
    <Link prefetch={false} className={buttonConClass} href={href}>
      <div className={buttonClass}>
        {icon}
        {title}
      </div>
    </Link>
  );
};

export default ButtonLink;
