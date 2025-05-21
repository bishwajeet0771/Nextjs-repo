"use client";
type props = {
  title: any;
  icon?: any;
  buttonConClass?: string;
  buttonClass?: string;
  onChange?: (e: any) => void;
  type?: any;
  loading?: boolean;
  name?: string;
};

const ButtonElement = ({
  title,
  icon,
  buttonConClass,
  buttonClass,
  onChange,
  type,
  loading,
  name,
}: props) => {
  return (
    <div className={buttonConClass || ""}>
      <button
        name={name}
        className={buttonClass || ""}
        type={type || ""}
        onClick={(e) => {
          e.stopPropagation();
          onChange && onChange(e);
        }}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        {icon}
        {title}
      </button>
    </div>
  );
};

export default ButtonElement;
