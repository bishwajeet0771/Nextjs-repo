import React from "react";
import Button from "@/app/elements/button";
import {
  GradientLocation,
  Phone,
  // ReraIcon,
  // Shorlisted,
  Wallet,
  // shortlistIconSvg,
} from "@/app/images/commonSvgs";
// import { Search } from "@/app/validations/types/search";
import { formatDateDDMMYYYY } from "@/app/utils/date";
import Image from "next/image";
// import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import { formatCurrency, formatNumberWithSuffix } from "@/app/utils/numbers";
import { useSetAtom } from "jotai";
import { listingSearchAtom } from "@/app/store/search/map";
// import { Main } from "@/app/validations/property/search";
import Link from "next/link";
import { calculatePerSqPrice } from "@/app/utils/price";

// type Props = {
//   type: any;
// } & Search;

const ProjectDetailsCard = ({
  category,
  localityName,
  postedBy,
  price,
  projIdEnc,
  propName,
  propStatus,
  propTypeName,
  // propertyIdEnc,
  bhkName,
  pa,
  ca,
  sba,
  coverImage,
  availableFrom,
  type,
  propIdEnc,
  possassionDate,
  lat,
  lang,
}: any) => {
  const { data: session } = useSession();

  // const [, { open }] = useReqCallPopup();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();
  const reqId = type === "proj" ? projIdEnc : propIdEnc;
  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some((item) => item.id === reqId && item.status === "Y");

  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: reqId,
        status: isItemInShortlist ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === reqId && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: reqId,
        status: isItemCompared ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const setSelectedSearch = useSetAtom(listingSearchAtom);
  const openMap = () => {
    if (lat && lang) {
      setSelectedSearch({
        projName: propName,
        lat,
        lang,
      });
    } else {
      alert("Lat Lang Not Available");
    }
  };
  return (
    <div className=" flex w-full mb-[5%] flex-col shadow-md ">
      <div className=" flex justify-center items-center w-full h-full">
        <Link target="_self" href={`/listing/test/${reqId}`} prefetch={false}>
          <div className="md:max-w-[320px] max-w-[150px] flex justify-center items-center w-full flex-col h-fit md:h-full    relative">
            <div className="relative">
              <Image
                src={coverImage}
                width={320}
                height={174}
                alt="conver"
                className="w-full h-[110px] md:h-[174px]  shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] object-cover relative"
              />
              <p className="absolute text-[#FFF] text-[12px] bottom-2 left-5 md:mt-[-60px]  md:left-[10px] gap-[4px] z-10 flex justify-center rounded-[20px] items-center p-[7px] font-[500] rtm ">
                {" "}
                {propStatus}
              </p>
            </div>

            <div className="flex-col flex md:hidden min-w-[100px] mt-2">
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Posted By: <span className=" font-[600]">{postedBy}</span>
              </p>
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Date:{" "}
                <span className=" font-[600]">
                  {formatDateDDMMYYYY("Wed Jan 30 00:00:00 IST 2030")}
                </span>
              </p>
            </div>
          </div>
        </Link>
        <div className="w-full px-[2%]">
          <div>
            <p className="text-[#001F35] text-[12px]  md:text-[20px] font-[600]   md:mb-0">
              {bhkName} {propTypeName} for {category} in {localityName},{" "}
            </p>
            <p className=" text-[#148B16] text-[12px] md:text-base not-italic font-semibold mb-[19px]">
              {localityName}
            </p>
          </div>
          <div className="  justify-between items-start  flex ">
            <div className=" flex  items-start flex-col  ">
              <div>
                {propTypeName !== "Plot" ? (
                  <>
                    {" "}
                    <p className="text-[#333] text-nowrap text-[12px] md:text-[16px] font-[500]">
                      Super Builtup Area:{" "}
                      <span className=" font-[600]">
                        {formatNumberWithSuffix(sba)} sq.ft
                      </span>
                    </p>
                    <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                      Carpet Area:{" "}
                      <span className=" font-[600]">
                        {" "}
                        {formatNumberWithSuffix(ca)} sq.ft{" "}
                      </span>
                      ₹ {calculatePerSqPrice(price, sba)}/ sqft
                    </p>
                    <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                      Available From:{" "}
                      <span className=" font-[600]">
                        {formatDateDDMMYYYY(availableFrom)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                      Plot Area:{" "}
                      <span className=" font-[600]"> {pa} sq.ft </span>₹{" "}
                      {calculatePerSqPrice(price, pa)}/ sqft
                    </p>
                    <p className="text-[#333] text-[12px] md:text-[16px] font-[500]">
                      Possession Date:{" "}
                      <span className=" font-[600]">
                        {formatDateDDMMYYYY(possassionDate)}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="  justify-end items-end flex-col hidden md:flex mt-auto ">
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Posted By: <span className=" font-[600]">{postedBy}</span>
              </p>
              <p className="text-[#202020] text-[12px] md:text-[16px] font-[400]">
                Date:{" "}
                <span className=" font-[600]">
                  {formatDateDDMMYYYY("Wed Jan 30 00:00:00 IST 2030")}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="md:flex w-[197px] flex-col justify-center items-center gap-[6px] shrink-0 px-[22px] py-4 bg-[#E9F6FF] hidden">
          <div className="flex justify-center items-center gap-2 px-2.5 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)_inset] rounded-[5px] border-[0.5px] border-solid border-[#CAE9FF] bg-white">
            <Wallet />{" "}
            <span className="text-[#233333] text-xl not-italic font-semibold">
              {formatCurrency(price)}
            </span>
          </div>
          <button
            className=" justify-center items-center gap-1 p-2 border rounded-[21px] border-solid border-[#0094FF] text-[#202020] text-[12px] not-italic font-semibold leading-[normal] mb-1 md:inline-flex hidden bg-white"
            onClick={openMap}
          >
            View on Map <GradientLocation />
          </button>

          <Button
            onChange={() => onAddingShortList()}
            title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
            buttonClass="text-[#FF7A00] text-[12px] font-[700] underline"
          />
          <Button
            onChange={() => onAddingCompare()}
            title={isItemCompared ? "Remove Compare" : " Add to Compare"}
            buttonClass="text-[#148B16] text-[12px] font-[700] underline"
          />

          <Button
            // onChange={() => open("prop", reqId, "propCard")}
            title="Request Callback"
            icon={<Phone className="h-[16px] w-[16px] " />}
            buttonClass="flex justify-center items-center text-[#FFF] p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] font-[700]"
          />
        </div>
      </div>
      <MobileDetails
        projIdEnc={reqId}
        agentListing={10}
        ownerListing={10}
        projName={propName}
        price={price}
        lat={lat}
        lang={lang}
      />
    </div>
  );
};

export default ProjectDetailsCard;

const MobileDetails = ({
  projIdEnc,
  agentListing,
  ownerListing,
  projName,
  lat,
  lang,
  price,
}: any) => {
  // const [, { open }] = useReqCallPopup();
  const { data: session } = useSession();
  const { toggleShortlist, shortlistedItems, compareItems, toggleCompare } =
    useShortlistAndCompare();

  const isItemInShortlist =
    shortlistedItems.length > 0 &&
    shortlistedItems.some(
      (item) => item.id === projIdEnc && item.status === "Y"
    );
  const [, { open: openLogin }] = usePopShortList();
  const onAddingShortList = () => {
    if (session) {
      toggleShortlist({
        id: projIdEnc,
        status: isItemInShortlist ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const isItemCompared =
    compareItems.length > 0 &&
    compareItems.some((item) => item.id === projIdEnc && item.status === "Y");
  const onAddingCompare = () => {
    if (session) {
      toggleCompare({
        id: projIdEnc,
        status: isItemCompared ? "N" : "Y",
      });
    } else {
      openLogin();
    }
  };
  const setSelectedSearch = useSetAtom(listingSearchAtom);

  const openMap = () => {
    if (lat && lang) {
      setSelectedSearch({
        agentListing,
        ownerListing,
        projName,
        lat,
        lang,
      });
    } else {
      alert("Lat Lang Not Available");
    }
  };
  return (
    <div className="flex md:hidden items-center justify-between gap-[10px] px-[12px] py-[11px] rounded-[10px] bg-[#E9F6FF] mt-5">
      <div className="flex flex-col justify-center items-start gap-2.5">
        <div className="flex justify-center items-center gap-2.5">
          <Button
            onChange={() => onAddingShortList()}
            title={isItemInShortlist ? "Shortlisted" : "Shortlist"}
            buttonClass="text-[#FF7A00] text-[12px] font-[700] underline"
          />
          <Button
            onChange={() => onAddingCompare()}
            title={isItemCompared ? "Remove Compare" : " Add to Compare"}
            buttonClass="text-[#148B16] text-[12px] font-[700] underline"
          />
        </div>
        <Button
          // onChange={() => open("card", projIdEnc, "projCard")}
          title="Request Callback"
          icon={<Phone className="h-[16px] w-[16px] " />}
          buttonClass="flex justify-center items-center text-[#FFF] p-[5px] bg-[#0073C6] rounded-[5px] shadow-md text-[12px] font-[700]"
        />
      </div>
      <div className=" justify-center items-center  gap-[5px]">
        <button
          className=" justify-center items-center gap-1 p-2 border rounded-[21px] border-solid border-[#0094FF] text-[#202020] text-[12px] not-italic font-semibold leading-[normal] mb-1 inline-flex  bg-white"
          onClick={openMap}
        >
          View on Map
        </button>{" "}
        <div className="flex justify-center items-center gap-2 px-2 py-2 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.05)_inset] rounded-[5px] border-[0.5px] border-solid border-[#CAE9FF] bg-white ">
          <span className="text-[#233333] text-xs not-italic font-semibold">
            ₹ {price} Cr
          </span>
        </div>
      </div>
    </div>
  );
};
