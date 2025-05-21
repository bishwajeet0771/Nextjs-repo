import React, { useState } from "react";
// import Button from "@/app/elements/button";
// import { GradientLocation, Phone, ReraIcon } from "@/app/images/commonSvgs";
import { Search } from "@/app/validations/types/search";
// import { formatDateDDMMYYYY } from "@/app/utils/date";
// import Image from "next/image";
// import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
// import { formatCurrency } from "@/app/utils/numbers";
// import { calculatePerSqPrice } from "@/app/utils/price";
import LeftSection from "./Top/LeftSection";
import CenterTop from "./Top/Center";
import CardDownSection from "./Down";
import TopRightSection from "./Top/Right";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  type: any;
} & Search &
  any;

const MainBox = ({ data, refetch, 
  // index, mutate 
}: Props) => {
  const {
    type,
    // projName,
    // minPrice,
    // maxPrice,
    // launchDate,
    // possassionDate,
    // agentListing,
    // ownerListing,
    // postedDate,
    // propTypes,
    // lat = 22.176912,
    // lang = 75.66009,
    // availableFrom,
    // ca,
    // sba,
    // propName,
        // propTypeName,
    // category,
    // localityName,
    // price,
    // propStatus,
    // pa,
    // projstatus,
    coverUrl,
    projIdEnc,
    coverImage,
    bhkName,
    propIdEnc,
    rerastatus,
    compareAdded,
    shortListed,
  } = data;
  const [state, setState] = useState({
    compareAdded: compareAdded === "Y" ? true : false,
    shortListed: shortListed === "Y" ? true : false,
  });
  const { data: session } = useSession();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, toggleCompare } =
    useShortlistAndCompare();
  const reqId = type === "proj" ? projIdEnc : propIdEnc;

  const onAddingShortList = () => {
    if (session) {
      setState({ ...state, shortListed: !state.shortListed });
      toggleShortlist({
        id: reqId,
        status: state.shortListed ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };

  const onAddingCompare = () => {
    if (session) {
      setState({ ...state, compareAdded: !state.compareAdded });
      toggleCompare({
        id: reqId,
        status: state.compareAdded ? "N" : "Y",
        source: type,
      });
    } else {
      openLogin(() => refetch());
    }
  };
  const newData = {
    ...data,
    Com: state.compareAdded,
    Sh: state.shortListed,
  };
  const onClickRedirect = (projEncId: string) => {
    if (data.type == "proj") {
      window.open(`/abc/karnataka/banglore/${projEncId}`, "_self");
    } else {
      window.open(`/listing/banglore/${projEncId}`, "_self");
    }
  };

  const isMobile = useMediaQuery("(max-width: 1600px)");
  return (
    <div className="h-auto max-w-full xl:w-full m-2 ml-0 mr-0 self-stretch rounded border shadow-[0px_4px_30px_0px_rgba(74,82,113,0.20)] border-solid border-[#A4B8D4]">
      <div
        onClick={() => onClickRedirect(reqId)}
        className="flex flex-col xl:flex-row justify-between w-full  xl:max-w-full"
      >
        <LeftSection src={coverUrl ?? coverImage} rera={rerastatus} />
        {isMobile && (
          <div className="flex flex-col justify-between">
            <TopRightSection
              data={newData}
              type={type}
              {...newData}
              bhkName={bhkName}
              onAddingCompare={onAddingCompare}
              onAddingShortList={onAddingShortList}
            />
            <CenterTop data={newData} type={type} />
          </div>
        )}
        {!isMobile && (
          <>
            <CenterTop data={newData} type={type} />
            <TopRightSection
              data={newData}
              type={type}
              {...newData}
              bhkName={bhkName}
              onAddingCompare={onAddingCompare}
              onAddingShortList={onAddingShortList}
            />
          </>
        )}
      </div>
      <CardDownSection
        a={data.agentListing}
        o={data.ownerListing}
        B={data.builderListing}
        type={type}
        reqId={reqId}
        {...data}
      />
    </div>
  );
};

export default MainBox;
