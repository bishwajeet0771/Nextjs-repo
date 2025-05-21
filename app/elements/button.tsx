/* eslint-disable no-unused-vars */
"use client";
type props = {
  title: any;
  icon?: any;
  buttonConClass?: string;
  buttonClass?: string;
  onChange?: (e: any) => void;
};

const Button = ({
  title,
  icon,
  buttonConClass,
  buttonClass,
  onChange,
}: props) => {
  return (
    <div className={buttonConClass || ""}>
      <button
        aria-label={title}
        name={title}
        title={"Click to "+title}
        className={buttonClass || ""}
        onClick={(e) =>{
          e.stopPropagation();
          onChange && onChange(e)
        }}
      >
        {icon}
        {title}
      </button>
    </div>
  );
};

export default Button;
