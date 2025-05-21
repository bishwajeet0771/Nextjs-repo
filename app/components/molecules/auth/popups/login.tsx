"use client";
import { useForm, yupResolver } from "@mantine/form";

// import useAuth from "@/app/hooks/useAuth";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
// import S from "@/app/styles/Pass.module.css";
// import { useMediaQuery } from "@mantine/hooks";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import CryptoJS from "crypto-js";
import usePathToOrigin from "@/app/hooks/custom/useRedirect";
import StepCss from "@/app/styles/Stepper.module.css";
import { usePathname } from "next/navigation";
// import { revalidatePath } from "next/cache";
import axios from "axios";
import { MAX_LENTH_TEXT } from "@/app/validations/auth";
import ButtonElement from "@/common/components/CustomButton";
import InputField from "@/common/components/InputField";
import PasswordInputField from "@/common/components/PasswordInputField";

const schema = yup.object().shape({
  username: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .test(
      "len",
      "Mobile number should be 10 digit",
      (val) => val?.toString().length === 10
    )
    .required("Mobile number is required")
    .typeError("Mobile number is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be under 40 characters"),
});
type Action = {
  username: string;
  password: string;
};
interface Login {
  username: string | number;
  password: string;
}
function LoginPopupForm({ closePopup }: { closePopup?: () => void }) {
  const [, { close, callback }] = usePopShortList();
  const path = usePathname();
  const [state, setState] = useState<"idle" | "pending" | "success">("idle");
  const form = useForm({
    initialValues: { username: "", password: "" },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const loginWithCredentials = async (data: Login): Promise<any> => {
    const encryptedPassword = CryptoJS.AES.encrypt(
      data.password,
      process.env.NEXT_PUBLIC_SECRET!!
    ).toString();
    const requestData = {
      username: data.username,
      password: encryptedPassword,
    };
    const res = await signIn("credentials", {
      ...requestData,
      redirect: false,
    });
    if (res?.ok) {
      if (path.includes("builder")) {
        axios.post("/api/revalidate", { id: path.split("/").pop() });
      }
      callback && callback();
      close();
      document.body.style.overflow = "unset";
    } else {
      const errorsParam =
        res?.error === "Please enter correct password"
          ? "password"
          : "username";
      form.setErrors({
        [errorsParam]: res?.error || "Something went wrong. Please try again.",
      });
      toast.error(res?.error || "Something went wrong. Please try again.");
    }
  };

  const login = async (data: Action) => {
    loginWithCredentials({
      username: data.username,
      password: data.password,
    });
  };
  const onSubmit = async (values: any) => {
    setState("pending");
    await login(values);
    setState("success");
  };
  // const isMobile = useMediaQuery(`(max-width: ${750 / 16}em)`);
  const { redirectQueryParam } = usePathToOrigin();
  return (
    <div className=" max-w-[420px] mx-auto ">
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="w-[100%] flex justify-center mt-2 items-center flex-col "
      >
        {/* <NumberInput
          mt={"xs"}
          required
          classNames={{
            root: StepCss.inputRoot,
            input: StepCss.textInput,
            error: StepCss.errorMsg,
            label: StepCss.custlabelOfNumpop,
          }}
          hideControls
          size="lg"
          className="w-[100%] mb-[3%] "
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
          {...form.getInputProps("username")}
          maxLength={10}
        /> */}

        {/* <div
          className={StepCss.inputContainer}
          style={{ position: "relative" }}
        >
          <label
            htmlFor={`login_username_popup_input`}
            className={StepCss.custlabelOfNumpop}
          >
            Mobile Number <span className={StepCss.errorMsg}>*</span>
          </label>
          <input
            required
            type="text"
            inputMode="numeric"
            className={StepCss.newTextInput}
            {...form.getInputProps("username")}
            id="login_username_popup_input"
            placeholder="Enter Your Mobile Number"
            maxLength={10}
            style={{ borderColor: form.errors.mobile ? "#F00" : "" }}
          />
          {form.errors.username && (
            <p className={StepCss.errorMsg}>{form.errors.username}</p>
          )}
        </div> */}

        <InputField
          key="login_username_popup_input"
          required
          name="username"
          type="text"
          inputMode="numeric"
          labelClass={StepCss.custlabelOfNumpop}
          errorMsg={form.errors.username}
          placeholder="Enter Your Mobile Number"
          containerClass={StepCss.inputContainer}
          inputClass={StepCss.newTextInput}
          errorMsgClass={StepCss.errorMsg}
          label="Mobile Number"
          maxLength={10}
          id="login_username_popup_input"
          otherProps={{ ...form.getInputProps("username") }}
        />

        {/* <PasswordInput
          classNames={{
            root: StepCss.inputRoot,
            error: StepCss.errorMsg,
            innerInput: StepCss.textInput,
            label: StepCss.custlabelOfNumpop,
          }}
          required
          size="lg"
          className="w-[100%] mb-[3%]"
          mt="sm"
          label="Password"
          placeholder="Enter Your Password"
          visibilityToggleIcon={({ reveal }) =>
            reveal ? <EyeOpen /> : <EyeClosed />
          }
          {...form.getInputProps("password")}
          onBlur={(e) => handleTrimAndReplace(e, "password", form)}
          maxLength={MAX_LENTH_TEXT}
        /> */}

        <PasswordInputField
          key="login_password_popup_input"
          id="login_password_popup_input"
          required
          name="password"
          inputMode="password"
          labelClass={StepCss.custlabelOfNumpop}
          errorMsg={form.errors.password}
          placeholder="Enter Your Password"
          containerClass={StepCss.inputContainer}
          inputClass={StepCss.newTextInput}
          errorMsgClass={StepCss.errorMsg}
          label="Password"
          otherProps={{ ...form.getInputProps("password") }}
          onBlur={(e: any) => handleTrimAndReplace(e, "password", form)}
          maxLength={MAX_LENTH_TEXT}
        />

        <Link
          href={{
            pathname: "/forgot",
            search: redirectQueryParam,
          }}
          onClick={closePopup && closePopup}
          className="text-[#0C7ACA] text-sm not-italic font-semibold  w-full cursor-pointer "
        >
          Forgot Password ?
        </Link>

        {/* <button
          // loading={state === "pending"}
          type="submit"
          // size={isMobile ? "compact-xs" : "md"}
          className=" !w-[95%] !h-[35px] text-white font-semibold xl:!h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] !text-[20px] xl:text-[20px]"
        >
          LOGIN
        </button> */}
        <ButtonElement
          name="loginButton"
          buttonConClass="w-full"
          title="LOGIN"
          buttonClass=" !w-[95%] !h-[35px] text-white font-semibold xl:!h-[57px] mt-[4%] !bg-[#0c7aca] rounded-[6px] !text-[20px] xl:text-[20px]"
          type="submit"
          loading={state === "pending"}
        />
        <div className="text-center mt-4 ">
          <Link
            href={{ pathname: "/register", search: redirectQueryParam }}
            className="text-[#282828] text-[14px]  flex justify-center font-semibold items-center gap-2.5 rounded border p-2 border-solid border-[#B2B2B2] mb-4 sm:mb-8 text-nowrap  "
          >
            New User?{" "}
            <span className=" text-[14px]  text-[#0C7ACA]  font-semibold  not-italic text-nowrap   ">
              Create an account
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPopupForm;
