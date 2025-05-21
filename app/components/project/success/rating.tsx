import { RatingStar } from "@/app/images/commonSvgs";
import { useFormContext } from "@/app/context/rating";
import clsx from "clsx";
import handleTrimAndReplace from "@/app/utils/input/validations";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import useDynamicProj from "@/app/hooks/project/useDynamic";
import RatingStars from "@/common/components/RatingStars";
interface Props {
  review: string;
  rating: number;
  proj: string;
}
export const Success = ({ projIdEnc, projName, formSubmit }: any) => {
  const form = useFormContext();
  const [value] = useLocalStorage<Props[]>({
    key: "ur",
    defaultValue: [],
  });
  const isSubmitted = value?.find((val) => val.proj === projIdEnc);
  return (
    <div className="px-5 py-8">
      <h1 className="text-[#001F35] text-4xl not-italic font-semibold leading-[normal] mb-[20px]">
        Congratulations 🎉
      </h1>
      <p className="text-[#202020] text-2xl not-italic font-medium leading-[normal] mb-[30px]">
        Your rating has been submitted successfully!
      </p>
      <div className="inline-flex flex-col justify-center items-start gap-[19px] px-4 py-[15px] rounded bg-[#cae9ff4d] ">
        <div className="flex md:justify-center items-center ">
          {/* <Rating
            value={form.values.rating || isSubmitted?.rating}
            readOnly
            classNames={{
              starSymbol: S.star,
              symbolBody: S.star,
            }}
            emptySymbol={
              <IconSun className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]" />
            }
            fullSymbol={
              <RatingStar
                fill="#FFD600"
                className="w-[45px] h-[45px]  md:w-[70px] md:h-[70px]"
              />
            }
          /> */}
          <RatingStars
            initialRating={form.values.rating || isSubmitted?.rating}
          />
        </div>
        {isSubmitted?.review && (
          <p className="text-black text-xl not-italic font-medium leading-8 tracking-[0.8px] ml-2">
            {form.values.review || isSubmitted?.review}
          </p>
        )}
      </div>
      {!isSubmitted?.review && (
        <RatingForm
          isSubmitted={isSubmitted}
          projName={projName}
          formSubmit={formSubmit}
          projIdEnc={projIdEnc}
        />
      )}
    </div>
  );
};

export const RatingForm = ({
  projName,
  formSubmit,
  isSubmitted,
  projIdEnc,
}: any) => {
  const form = useFormContext();
  const data = useDynamicProj(projIdEnc);
  const isTab = useMediaQuery(`(max-width: 1600px)`);
  return (
    <form
      onSubmit={form.onSubmit(formSubmit)}
      className={clsx(
        "max-w-[100%] p-2 rounded-lg space-y-2 xl:p-5 ratingCardBg",
        isSubmitted && "!px-5 pb-5 !mt-0 "
      )}
    >
      {!isSubmitted && (
        <div className="flex md:justify-center items-center  xl:mb-[32px] flex-col">
          {/* <Rating
            classNames={{
              starSymbol: S.star,
              symbolBody: S.star,
            }}
            emptySymbol={
              <IconSun className="w-[45px] h-[45px]  sm:w-[50px] sm:h-[50px]  xl:w-[70px] xl:h-[70px]" />
            }
            fullSymbol={
              <IconSun
                fill="#FFD600"
                className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px]  xl:w-[70px] xl:h-[70px]"
              />
            }
            onChange={(value) => form.setFieldValue("rating", value)}
            value={form.values.rating}
          /> */}

          <RatingStars
            initialRating={form.values.rating}
            onChange={(value) => form.setFieldValue("rating", value)}
          />

          <p className="text-[#F00] text-[12px] xl:text-xl italic font-normal leading-[23.784px] mt-5">
            {form.errors.rating}
          </p>
        </div>
      )}
      {isSubmitted && (
        <div className="flex justify-center items-center mb-6">
          <p className="text-[#242424]  text-2xl not-italic font-bold leading-[normal] inline-flex items-center m-auto">
            <RatingStar
              fill="#FFD600"
              className="w-[34px] h-[34px] mb-2   xl:w-[45px] xl:h-[45px]  md:w-[70px] md:h-[70px]"
            />{" "}
            <span className="text-[#242424] pl-2 text-[24px] xl:text-[39px] not-italic font-bold leading-[normal] inline-block mb-2 mr-1">
              {data?.data?.rating}
            </span>
            {"  "}
            <span className=" text-[16px] xl:text-xl">
              {" "}
              / 5 Ratings Already Given
            </span>
          </p>
        </div>
      )}
      <h2 className="text-[#242424] text-[16px] sm:text-[16px] xl:text-[20px] not-italic font-bold leading-[23.784px]  !mb-[24px]">
        {isSubmitted
          ? `Add your feedback for ${projName} Project `
          : `Add your feedback for ${projName} Project `}{" "}
        ( Optional )
      </h2>

      <div className=" gap-4 ">
        <div className="flex-1">
          <textarea
            name="review"
            id="review"
            className={clsx(
              "w-full resize-none rounded-[10px] text-[12px] md:text-[16px] p-[6px] md:p-[10px] placeholder:!text-[#4D6677] italic font-medium leading-[23.784px] focus:outline-none ",
              !form.errors.review && "border-solid border-[#737579] border "
            )}
            placeholder="Start typing here"
            rows={isTab ? 2 : 4}
            maxLength={401}
            {...form.getInputProps("review")}
            // classNames={{
            //   input: S.ratingInput,
            // }}
            onBlur={(e) => handleTrimAndReplace(e, "review", form)}
          />
        </div>
        <button
          // loading={status === "pending"}
          type="submit"
          className="inline-flex items-center justify-center rounded-md text-[14px]  xl:text-[20px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 !bg-[#0073C6] text-white mt-6"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
