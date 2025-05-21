import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "blue" | "green";
  className?: string;
  showButton?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "blue",
  className,
  showButton = true,
  ...rest
}) => {
  const baseClasses =
    "inline-flex justify-center items-center gap:1.5 sm:gap-2.5 rounded p-1.5 md:p-2.5  text-white  text-[12px]  2xl:text-2xl font-bold";
  const variantClasses = clsx({
    "bg-[#0073c6]": variant === "blue",
    "bg-green-500": variant === "green",
  });

  const classes = clsx(baseClasses, variantClasses, className);

  return (
    showButton && (
      <button className={classes} {...rest}>
        {children}
      </button>
    )
  );
};

export default Button;
