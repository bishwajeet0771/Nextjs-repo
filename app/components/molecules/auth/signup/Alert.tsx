import React from "react";

const Alert = ({
  isTouched,
  type,
}: {
  isTouched: boolean;
  type: "agent" | "builder";
}) => {
  return (
    <div className="sm:p-4 bg-transparent   rounded-lg  xl:fixed right-0 top-0 xl:w-[48%]">
      <div className="flex justify-between items-start">
        <div>
          <h6
            className={`text-[14px] xl:text-2xl font-semibold  ${
              isTouched ? "text-[#148B16]" : "text-gray-800"
            }`}
          >
            {isTouched ? "Keep it going" : "Welcome Back!"}
          </h6>
          <p className="sm:mt-2 text-xs xl:text-lg text-gray-600">
            {isTouched
              ? "It's just a few more details and it's done"
              : type === "agent"
              ? "Kindly complete you's sign up details for users to build in trust and decency in you."
              : "We request you to please complete the sign up process for us to be in a better postion to quickly approve your account."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
