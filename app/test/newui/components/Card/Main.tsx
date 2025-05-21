/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Search } from "@/app/validations/types/search";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import { useShortlistAndCompare } from "@/app/hooks/storage";
import { useSession } from "next-auth/react";
import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import LeftSection from "./Top/LeftSection";
import CenterTop from "./Top/Center";
import CardDownSection from "./Down";
import TopRightSection from "./Top/Right";
import { useMediaQuery } from "@mantine/hooks";
import { useAtomValue } from "jotai";
import { overlayAtom } from "../../store/overlay";
import Overlay from "../modals/Overlay";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";
import { generateListingLinkUrl } from "@/app/utils/linkRouters/ListingLink";
// import { useRouter } from "next/navigation";
import { preventBackButton } from "@/app/components/molecules/popups/req";

type Props = {
  type: any;
} & Search &
  any;

const MainBox = ({ data, refetch, index }: Props) => {
  const {
    type,
    projName,
    coverUrl,
    projIdEnc,
    coverImage,
    bhkName,
    propTypeName,
    localityName,
    propIdEnc,
    rerastatus,
    compareAdded,
    shortListed,
    propTypeId,
    isUsed,
    phaseId,
    category,
    phaseName,
    phaseCount,
  } = data;
  const [state, setState] = useState({
    compareAdded: compareAdded === "Y" ? true : false,
    shortListed: shortListed === "Y" ? true : false,
  });
  const { data: session } = useSession();
  // const router = useRouter();
  const [, { open: openLogin }] = usePopShortList();
  const { toggleShortlist, toggleCompare } = useShortlistAndCompare();
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
  let url =
    data.type == "proj"
      ? createProjectLinkUrl({
          city: data.city,
          locality: data.locality,
          slug: data.projName,
          projIdEnc: projIdEnc,
        })
      : generateListingLinkUrl({
          city: data.cityName,
          locality: data.localityName,
          projName: data.projIdEnc ? data.propName : null,
          category: data.category === "Sale" ? "for-sale" : "for-rent",
          phase: data.phaseName,
          propIdEnc: data.propIdEnc,
          bhkUnitType: data.bhkName
            ? `${data.bhkName + " " + data.propTypeName}`
            : "" + " " + data.propTypeName,
        });
  const newData = {
    ...data,
    Com: state.compareAdded,
    Sh: state.shortListed,
    pageUrl: url,
  };

  // const onClickRedirect = (projEncId: string) => {
  //   let url;
  //   if (data.type == "proj") {
  //     url = createProjectLinkUrl({
  //       city: data.city,
  //       locality: data.locality,
  //       slug: data.projName,
  //       projIdEnc: projEncId,
  //     });
  //     router.push(url);
  //     // window.open(url, "_blank", "noreferrer");
  //     // return url;
  //   } else {
  //     url = generateListingLinkUrl({
  //       city: data.cityName,
  //       locality: data.localityName,
  //       projName: data.projIdEnc ? data.propName : null,
  //       category: data.category === "Sale" ? "for-sale" : "for-rent",
  //       phase: data.phaseName,
  //       propIdEnc: data.propIdEnc,
  //       bhkUnitType: data.bhkName
  //         ? `${data.bhkName + " " + data.propTypeName}`
  //         : "" + " " + data.propTypeName,
  //     });
  //     router.push(url);
  //     // window.open(url, "_blank", "noreferrer");
  //     // return url;
  //   }
  // };

  const [opened, { open, close }] = useReqCallPopup();
  const overlayData = useAtomValue(overlayAtom);

  useEffect(() => {
    if (opened) {
      // Push a new state to the history stack when the modal is opened
      window.history.pushState("reqCallModal", "");

      const handlePopState = () => {
        document.body.style.overflow = "unset";
        close();
      };

      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }
  }, [opened]);

  const handleOpen = () => {
    preventBackButton();
    open({
      modal_type:
        type === "proj" ? "PROJECT_REQ_CALLBACK" : "PROPERTY_REQ_CALLBACK",
      postedByName: type === "proj" ? data.builderName : data.postedBy,
      postedId: type === "proj" ? data.builderId : data.postedById,
      reqId: reqId,
      source: type === "proj" ? "projCard" : "propCard",
      title:
        type === "proj"
          ? projName
          : `${bhkName ?? ""} ${propTypeName} for
      ${data.category === "Rent" ? "Rent" : "Sale"} in ${localityName}`,
    });
  };
  const isMobile = useMediaQuery("(max-width: 1600px)");

  // const [selected, setSelected] = useAtom(selectedSearchAtom);
  // const [{id}, setNearby] = useAtom(selectedNearByAtom)

  // const onHoverCard = () => {
  //   // if(selected === null || selected?.reqId === newData.projIdEnc) return;
  //   // setNearby((prev:any)=>({ ...prev, selectedNearbyItem: {}, id:""}))
  //   // setSelected({
  //   //   agentListing: newData.agentListing,
  //   //   ownerListing: newData.ownerListing,
  //   //   projOrPropName: newData.projName,
  //   //   lat: newData.lat,
  //   //   lang: newData.lang,
  //   //   type: type,
  //   //   reqId: type === "proj" ? projIdEnc : propIdEnc,
  //   //   propType: type === "proj" ? propTypeId : propTypeName,
  //   // });
  // };
  const imageAlt =
    type === "proj"
      ? `Cover Image Of  ${projName}${
          phaseName && phaseCount !== undefined && phaseCount > 1
            ? phaseName
            : ""
        }`
      : `Cover Image Of ${bhkName} ${propTypeName} for ${category} in ${localityName}`;
  return (
    // <a href={onClickRedirect(reqId)} rel="noreferrer" target="_">
    <div
      // onMouseEnter={() => (isMobile ? "" : onHoverCard())}

      // onClick={() => onClickRedirect(reqId)}
      className="h-auto max-w-full xl:w-[98%] m-[1%] self-stretch rounded border-2 shadow-[0px_4px_30px_0px_rgba(74,82,113,0.20)]  border-solid border-[#A4B8D4]"
    >
      <div className="flex flex-col xl:flex-row justify-start w-full  xl:max-w-full relative">
        <LeftSection
          src={coverUrl ?? coverImage}
          rera={rerastatus}
          projstatus={data.projstatus}
          onAddingCompare={onAddingCompare}
          isCompared={state.compareAdded}
          openReqCallback={handleOpen}
          type={type}
          possassionDate={data.possassionDate}
          furnish={data.furnish}
          propStatus={data.propStatus}
          isUsed={isUsed}
          availableFrom={data.availableFrom}
          data={data}
          projEncId={projIdEnc}
          pageUrl={url}
          imageAlt={imageAlt}
          index={index}
        />
        <div className="relative w-full">
          {overlayData.id &&
          `${projIdEnc ?? ""}+${propIdEnc ?? ""}${
            propTypeId ?? propTypeName ?? ""
          }${type === "proj" && phaseId ? "+" + phaseId : ""}` ===
            overlayData.id ? (
            <Overlay />
          ) : null}

          {isMobile && (
            <div className="flex   flex-col  justify-between relative">
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
      </div>
      <CardDownSection
        a={data.agentListing}
        o={data.ownerListing}
        B={data.builderListing}
        type={type}
        reqId={reqId}
        {...data}
        title={`${bhkName ?? ""} ${propTypeName} for ${
          data.cg === "R" ? "Rent" : "Sale"
        } in ${localityName}`}
        onAddingCompare={onAddingCompare}
        isCompared={state.compareAdded}
        handleOpen={handleOpen}
      />
    </div>
    // </a>
  );
};

export default MainBox;
