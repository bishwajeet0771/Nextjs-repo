"use client";

import React, {
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

interface OtpInputProps {
  onChange: (name: string, value: string) => void;
  name: string; // Field name to identify in form
}

const OtpInput: React.FC<OtpInputProps> = ({ onChange, name }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const updateOtpValue = () => {
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    onChange(name, otp); // Update form value
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    inputsRef.current[index]!.value = value;
    updateOtpValue();

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, 4); // only digits, max 4
    pasteData.split("").forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = char;
      }
    });
    updateOtpValue();
    if (inputsRef.current[pasteData.length - 1]) {
      inputsRef.current[pasteData.length - 1]!.focus();
    }
  };

  return (
    <div style={styles.otpContainer}>
      {[0, 1, 2, 3].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="otp-input"
          // @ts-ignore
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          style={styles.otpInput}
        />
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "40px",
  },
  otpInput: {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    textAlign: "center",
    borderBottom: "2px solid #ccc",
    outline: "none",
    transition: "border 0.3s",
  },
};

export default OtpInput;
