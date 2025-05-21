/* eslint-disable react/jsx-boolean-value */
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import ReportButton from "./button";
import clsx from "clsx";
// import S from "@/app/styles/Rating.module.css";
import Close from "../../button/close";
import { useState } from "react";
import {
  // QnaSuccesssMessage,
  ReportSuccesssMessage,
} from "../../success";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";
// import Styles from "@/app/styles/Qna.module.css";
// import { useParams } from "next/navigation";
export default function ReportModal({ slug }: { slug: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<
    "idle" | "error" | "loading" | "success"
  >("idle");
  const [text, setText] = useState("");
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/report?id=${slug}&iden=P`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: text }),
        }
      );
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  const handleClose = () => {
    close();
    setStatus("idle");
    setText("");
    document.body.style.overflow = "unset";
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  const isTab = useMediaQuery("(max-width: 1600px)");

  return (
    <>
      {/* <Modal
        opened={opened}
        onClose={handleClose}
        centered
        className="w-full md:w-[70%] lg:w-[40%] h-auto "
        styles={{
          header: {
            display: "none",
          },
          body: {
            padding: `${status == "success" ? "0px" : "10px"}`,
            borderRadius: "100px",
          },
          content: {
            borderRadius: "20px",
          },
        }}
        size={isMobile ? "100%" : isTab ? "45%" : "30%"}
      > */}
      {opened && (
        <ModalBox
          isOpen={opened}
          handleChange={() => handleClose()}
          hideCrossIcon={true}
          // containerClassStyle="w-[90%] md:w-[35%] xl:w-auto !p-0 !rounded-[20px] !min-w-[200px] md:!min-w-[500px] !max-w-[100%] md:!max-w-[500px] "
          containerClassStyle={`!rounded-[20px] ${
            status == "success" ? "!p-0" : "!p-[10px]"
          } ${isMobile ? "!w-[94%]" : isTab ? "!w-[45%]" : "!w-[30%]"} `}
        >
          <div className="relative">
            <Close
              close={close}
              className="absolute sm:right-1 sm:top-1 xl:top-3 top-1 xl:right-5 right-1 z-10 w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]   xl:w-[30px] xl:h-[30px] "
            />

            {status === "success" ? (
              <ReportSuccesssMessage close={handleClose} />
            ) : (
              <>
                {" "}
                <header className="flex  flex-col items-center gap-[8px] text-center pt-3 mb-2">
                  <p className="text-[#242424] text-center  text-[18px] sm:text-[22px] not-italic font-medium leading-[normal]">
                    Report Issues for Project
                  </p>
                  <p className="text-[#148B16]  text-xs sm:text-[18px] not-italic font-medium leading-[normal]">
                    Let us know your feedback this will allow us to serve you
                    better!
                  </p>
                </header>
                <form onSubmit={formSubmit} className=" gap-1 sm:gap-4 ">
                  <div className="flex-1">
                    <p className="text-[#001F35] font-semibold font-montserrat text-[14px] sm:text-base ">
                      Share Your Comment Below
                    </p>

                    {/* <Textarea
                    size="lg"
                    name="review"
                    w={"100%"}
                    h={"100%"}
                    id="review"
                    className={clsx(
                      " rounded-[10px] !text-[12px]  placeholder:!text-[#4D6677]  placeholder:!text-xl xl:placeholder:!text-2xl italic font-medium leading-[23.784px] border-solid border",
                      status == "error" ? "border-[#F00]" : "border-green"
                    )}
                    placeholder="Start typing here"
                    radius={"10px"}
                    rows={2}
                    maxLength={401}
                    classNames={{
                      input: S.ratingInput,
                    }}
                    onChange={(e) => {
                      setText(e.target.value), setStatus("idle");
                    }}
                    value={text}
                  /> */}

                    <textarea
                      name="review"
                      id="review"
                      className={clsx(
                        " rounded-[10px] resize-none py-[8px] px-[16px] h-[76px] w-full !text-[12px] placeholder:!text-[#4D6677] placeholder:!text-[12px] xl:placeholder:!text-[16px] italic font-medium leading-[23.784px] border-solid border focus:outline-none ",
                        status === "error" ? "border-[#F00]" : "border-green"
                      )}
                      placeholder="Start typing here"
                      rows={2}
                      maxLength={401}
                      onChange={(e) => {
                        setText(e.target.value);
                        if (e.target.value.length > 400) {
                          setStatus("error");
                        } else {
                          setStatus("idle");
                        }
                      }}
                      value={text}
                    />

                    {text.length > 400 && (
                      <p className="text-[12px] sm:text-[14px] text-[#F00]">
                        Comment must be under 400 characters
                      </p>
                    )}

                    {status === "error" && (
                      <p className="text-[12px] sm:text-[14px] text-[#F00]">
                        {text.length === 0
                          ? "Please add comment to submit issue"
                          : "Something went wrong!"}
                      </p>
                    )}
                  </div>
                  <button
                    //   loading={status === "pending"}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md !text-[12px] sm:!text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 !px-2 !py-1 sm:px-4 sm:py-2 !bg-[#0073C6] text-white mt-3 sm:mt-6"
                  >
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </ModalBox>
      )}
      {/* </Modal> */}

      <ReportButton open={open} />
    </>
  );
}
