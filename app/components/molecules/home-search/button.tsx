import clsx from "clsx";

interface ButtonProps {
  selected?: boolean;
  value: string;
  onClick?: () => any;
}
const Button: React.FC<ButtonProps> = ({ selected, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-4 py-2 border border-[#CBE9FF]  rounded-full text-sm text-[color:var(--Field-colour-stroke,#282828)]  not-italic font-medium leading-[normal]",
        selected && " bg-[#AEDDFF] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]",
        !selected && "bg-[#F9FCFF]"
      )}
    >
      {value}
    </button>
  );
};

export default Button;
