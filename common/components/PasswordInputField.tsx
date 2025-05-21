import React, { useState } from "react";
import { EyeClosed, EyeOpen } from "@/app/images/commonSvgs";

type Props = {
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  label?: string;
  onChange?: any;
  value?: any;
  id?: any;
  otherProps?: any;
  onBlur?: any;
  placeholder?: string;
  errorMsg?: any;
  errorMsgClass?: string;
  inputMode?: string;
  required?: boolean;
  maxLength?: number;
  name?: string;
};

function PasswordInputField({
  containerClass,
  inputClass,
  onChange,
  onBlur,
  otherProps,
  placeholder,
  id,
  label,
  labelClass,
  errorMsg,
  errorMsgClass,
  inputMode,
  required,
  maxLength,
  name,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={containerClass}>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        <span className=" text-[#F00] text-[16px] font-semibold ">*</span>
      </label>
      <input
        required={required}
        name={name}
        type={showPassword ? "text" : "password"}
        inputMode={inputMode}
        className={inputClass}
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{ borderColor: errorMsg ? "#F00" : "" }}
        onChange={onChange}
        onBlur={onBlur}
        {...otherProps}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className=" absolute top-0 mt-[40px] right-[10px] cursor-pointer translate-y-[50%] "
      >
        {showPassword ? <EyeOpen /> : <EyeClosed />}
      </span>
      {errorMsg && <p className={errorMsgClass}>{errorMsg}</p>}
    </div>
  );
}

export default PasswordInputField;
