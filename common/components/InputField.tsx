import React from "react";

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
  type?: string;
  errorMsg?: any;
  errorMsgClass?: string;
  inputMode?: string;
  required?: boolean;
  maxLength?: number;
  name?: string;
};

function InputField({
  containerClass,
  inputClass,
  onChange,
  onBlur,
  otherProps,
  placeholder,
  id,
  type,
  label,
  labelClass,
  errorMsg,
  errorMsgClass,
  inputMode,
  required,
  maxLength,
  name,
}: Props) {
  return (
    <div className={containerClass}>
      <label htmlFor={id} className={labelClass}>
        {label}{" "}
        <span className=" text-[#F00] text-[16px] font-semibold ">*</span>
      </label>
      <input
        required={required}
        name={name}
        type={type}
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
      {errorMsg && <p className={errorMsgClass}>{errorMsg}</p>}
    </div>
  );
}

export default InputField;
