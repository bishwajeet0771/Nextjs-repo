/* eslint-disable react/jsx-boolean-value */
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import ReportButton from "./button";
import clsx from "clsx";
import { useState } from "react";
import { useParams } from "next/navigation";
import Close from "@/app/components/project/button/close";
import { ReportSuccesssMessage } from "@/app/components/project/success";
import ReportOptions from "./reportOptions";
import ModalBox from "@/app/test/newui/components/Card/Top/Right/ModalBox";

export default function ReportModal({ issueData }: any) {
  const { slug, bhk_unit_type } = useParams<{
    slug: string;
    bhk_unit_type: string;
  }>();
  const [opened, { open, close }] = useDisclosure(false);
  const [errorMsg, seterrorMsg] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "error" | "loading" | "success"
  >("idle");
  const [reportStatus, setreportStatus] = useState<number[]>([]);
  const [text, setText] = useState("");
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(reportStatus);
    e.preventDefault();
    if (!(reportStatus.length > 0)) {
      seterrorMsg(true);
      return;
    } else if (reportStatus.includes(670)) {
      if (!text) {
        setStatus("error");
        return;
      }
    }

    setStatus("loading");
    try {
      const singleString = reportStatus.join(", ");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user-actions/report?id=${
          (slug || bhk_unit_type).split("-")[1]
        }&iden=L`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: text, status: singleString }),
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

  const reportIssuseFun = (cid: number) => {
    const updatedReportStatus = [...reportStatus];
    const index = updatedReportStatus.indexOf(cid);
    if (index !== -1) {
      updatedReportStatus.splice(index, 1);
    } else {
      seterrorMsg(false);
      updatedReportStatus.push(cid);
    }
    setreportStatus(updatedReportStatus);
  };
  const isMobile = useMediaQuery("(max-width: 601px)");
  const isTab = useMediaQuery("(max-width: 1600px)");

  const onClose = () => {
    console.log("close priouus popup");
    close();
    document.body.style.overflow = "unset";
    console.log("relising scroll 2");

    setTimeout(() => {
      setText("");
      setStatus("idle");
      setreportStatus([]);
      seterrorMsg(false);
    }, 5000);
  };
  return (
    <>
      {/* <Modal
        opened={opened}
        onClose={onClose}
        centered
        size={isMobile ? "100%" : status === "success" ? "32%" : "50%"}
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
      >
        <div className="relative">
          <Close close={onClose} className="absolute top-3 right-1 z-10" />

          {status === "success" ? (
            <ReportSuccesssMessage close={onClose} />
          ) : (
            <>
              {" "}
              <header className="flex  flex-col items-center gap-[8px] text-center pt-3 mb-2">
                <p className="text-[#242424] text-center  text-[18px] sm:text-[22px] not-italic font-medium leading-[normal]">
                  Report Issue for Property
                </p>
                <p className="text-[#148B16]   !text-wrap text-xs sm:text-[18px] not-italic font-medium leading-[normal]">
                  Let us know your feedback this will allow us to serve you
                  better!
                </p>
              </header>
              <ReportOptions
                reportIssuseFun={reportIssuseFun}
                issueData={issueData}
                reportStatus={reportStatus}
                errorMsg={errorMsg}
              />
              <form onSubmit={formSubmit} className=" gap-1 sm:gap-4 ">
                <p className="text-[#001F35] text-sm not-italic font-semibold leading-[normal] mb-1">
                  Share your comment below
                </p>
                <div className="flex-1">
                  <Textarea
                    size="lg"
                    name="review"
                    w={"100%"}
                    h={"100%"}
                    id="review"
                    className={clsx(
                      " rounded-[10px] !text-[12px]  placeholder:!text-[#4D6677]  placeholder:!text-xl xl:placeholder:!text-2xl italic font-medium leading-[23.784px] border-solid border",
                      status === "error" ? "border-[#F00]" : "border-green"
                    )}
                    placeholder="Start typing here"
                    radius={"10px"}
                    rows={2}
                    error={
                      text.length > 400 &&
                      "Comment must be under 400 characters"
                    }
                    maxLength={401}
                    classNames={{
                      input: S.ratingInput,
                    }}
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
                  {status === "error" && (
                    <p className="text-[12px] sm:text-[14px] text-[#F00]">
                      Please add comment to submit issue
                    </p>
                  )}
                </div>
                <div className="flex justify-center items-center ">
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    //   loading={status === "pending"}
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-[14px]  xl:text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-3 sm:mt-6"
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal> */}

      {opened && (
        <ModalBox
          isOpen={opened}
          handleChange={onClose}
          hideCrossIcon={true}
          // containerClassStyle={`!w-[90%] !md:w-[${status !== "success" ? "32%" : "50%"}] !p-0 !rounded-[20px] `}
          containerClassStyle={`!rounded-[20px] ${
            status == "success" ? "!p-0" : "!p-[10px]"
          } ${isMobile ? "!w-[94%]" : isTab ? "!w-[45%]" : "!w-[30%]"} `}
        >
          <div className="relative">
            <Close
              close={() => onClose()}
              className="absolute top-3 right-1 z-10 !max-w-[20px] !max-h-[20px] md:!max-w-[30px] md:!max-h-[30px] "
            />

            {status == "success" ? (
              <ReportSuccesssMessage close={() => onClose()} />
            ) : (
              <>
                {" "}
                <header className="flex  flex-col items-center gap-[8px] text-center pt-3 mb-2">
                  <p className="text-[#242424] text-center  text-[18px] sm:text-[22px] not-italic font-medium leading-[normal]">
                    Report Issue for Property
                  </p>
                  <p className="text-[#148B16]   !text-wrap text-xs sm:text-[18px] not-italic font-medium leading-[normal]">
                    Let us know your feedback this will allow us to serve you
                    better!
                  </p>
                </header>
                <ReportOptions
                  reportIssuseFun={reportIssuseFun}
                  issueData={issueData}
                  reportStatus={reportStatus}
                  errorMsg={errorMsg}
                />
                <form onSubmit={formSubmit} className=" gap-1 sm:gap-4 ">
                  <p className="text-[#001F35] text-sm not-italic font-semibold leading-[normal] mb-1">
                    Share your comment below
                  </p>
                  <div className="flex-1">
                    {/* <Textarea
                    size="lg"
                    name="review"
                    w={"100%"}
                    h={"100%"}
                    id="review"
                    className={clsx(
                      " rounded-[10px] !text-[12px]  placeholder:!text-[#4D6677]  placeholder:!text-xl xl:placeholder:!text-2xl italic font-medium leading-[23.784px] border-solid border",
                      status === "error" ? "border-[#F00]" : "border-green"
                    )}
                    placeholder="Start typing here"
                    radius={"10px"}
                    rows={2}
                    error={
                      text.length > 400 &&
                      "Comment must be under 400 characters"
                    }
                    maxLength={401}
                    classNames={{
                      input: S.ratingInput,
                    }}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (e.target.value.length > 400) {
                        setStatus("error");
                      } else {
                        setStatus("idle");
                      }
                    }}
                    value={text}
                  /> */}

                    <textarea
                      name="review"
                      id="review"
                      className={clsx(
                        " rounded-[10px] resize-none py-[8px] px-[16px] h-[76px] w-full !text-[12px] placeholder:!text-[#4D6677]  placeholder:!text-[12px] xl:placeholder:!text-[16px] italic font-medium leading-[23.784px] border-solid border focus:outline-none ",
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

                  <div className="flex justify-center items-center ">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      //   loading={status === "pending"}
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-[14px]  xl:text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-3 sm:mt-6"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </ModalBox>
      )}

      <ReportButton open={open} />
    </>
  );
}
