/* eslint-disable react/jsx-boolean-value */
"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  memo,
  Fragment,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaSpinner,
} from "react-icons/fa";
import { PopupOpenSvg } from "@/app/images/commonSvgs";
import { useMediaQuery } from "@mantine/hooks";
// import { useSession } from "next-auth/react";
// import { usePopShortList } from "@/app/hooks/popups/useShortListCompare";
import Image from "next/image";
// import SubHeading from "../headings/SubHeading";
// import PropertyHeading from "../../property/heading";

// PDF worker setup
pdfjs.GlobalWorkerOptions.workerSrc =
  process.env.NODE_ENV === "development"
    ? new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()
    : `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ProjectPhase {
  id: number;
  name: string;
  brochure: string | null;
}

interface PhaseOverview {
  phaseId: number;
  phaseName: string | null;
  phaseBrochureUrl: string | null;
}

type Props = {
  projName: string;
  phaseOverviewData: PhaseOverview[];
  singleBrocher?: string;
  broucherImage: string;
};

function BrocherContent({
  phaseOverviewData,
  projName,
  broucherImage,
  singleBrocher,
}: Props) {
  // const { data: session } = useSession();
  // const [, { open: LoginOpen }] = usePopShortList();
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 660px)");
  const [currentSize, setCurrentSize] = useState<number>(0);
  const [state, setState] = useState<{
    activePhase: ProjectPhase;
    numPages: number | null;
    pageNumber: number;
    pageScale: number;
    blobCache: Record<number, string | null>;
    loading: boolean;
    errorMessage: string;
  }>(
    singleBrocher
      ? {
          activePhase: {
            id: 0,
            name: "Single Brochure",
            brochure: singleBrocher,
          },
          numPages: null,
          pageNumber: 1,
          pageScale: 1,
          blobCache: {},
          loading: false,
          errorMessage: "",
        }
      : {
          activePhase: {
            id: phaseOverviewData[0].phaseId,
            name: phaseOverviewData[0].phaseName || "Phase 1",
            brochure: phaseOverviewData[0].phaseBrochureUrl,
          },
          numPages: null,
          pageNumber: 1,
          pageScale: 1,
          blobCache: {},
          loading: false,
          errorMessage: "",
        }
  );

  const adjustPageScale = useCallback(() => {
    if (pdfContainerRef.current) {
      const containerHeight = pdfContainerRef.current.clientHeight;
      const containerWidth = pdfContainerRef.current.clientWidth;
      const scale = Math.min(containerWidth / 800, containerHeight / 1200);
      setState((prev) => ({ ...prev, pageScale: scale }));
    }
  }, []);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setState((prev) => ({ ...prev, numPages, pageNumber: 1 }));
      adjustPageScale();
    },
    [adjustPageScale]
  );

  useEffect(() => {
    const handleResize = () => adjustPageScale();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [adjustPageScale]);

  const ram =
    typeof navigator !== "undefined"
      ? ((navigator as any).deviceMemory as number)
      : 0;

  const getBroucherSize = (size: number) => {
    return !(size > 2 * 1024 * 1024);
  };
  const [showMap, setShowMap] = useState(false);

  // If RAM is less than 4GB, render iframe instead
  if (ram && ram <= 4) {
    return (
      <div className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50">
        <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words pl-3 pt-2">
          <strong>
            <span className="text-[#001F35]">
              Explore the Comprehensive Brochure of{" "}
            </span>
            <span className="text-green-800">{projName}</span>
          </strong>
        </h2>
        {!showMap ? (
          <div className="h-[291px] sm:h-[486px] xl:h-[700px] w-full relative scroll-mt-[125px]">
            <div className="absolute inset-0 bg-gray-100 opacity-80 w-[95%] sm:w-[90%] mx-auto rounded-lg mb-2 sm-mb-0">
              <picture>
                <source
                  media="(max-width: 460px)"
                  srcSet={broucherImage?.split(",")[0]}
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={broucherImage?.split(",")[1]}
                />
                <source
                  media="(min-width: 1200px)"
                  srcSet={broucherImage?.split(",")[2]}
                />
                <Image
                  alt={`${projName} Brochure`}
                  title={`${projName} Brochure`}
                  src={broucherImage?.split(",")[3]}
                  fill
                  unoptimized
                  priority
                />
              </picture>
            </div>
            <div
              onClick={() => setShowMap(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <button
                onClick={() => setShowMap(true)}
                className="z-8 px-6 py-3 mx-2 text-left  sm:mx-0 sm:text-center text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors"
              >
                <span className="text-sm md:text-base font-semibold line-clamp-1">{`Click to View  Brochure ${projName}`}</span>
              </button>
            </div>
          </div>
        ) : (
          <iframe
            src={singleBrocher || phaseOverviewData[0]?.phaseBrochureUrl || ""}
            className="w-full h-[400px] border-0"
            title={`${projName} Brochure`}
          />
        )}
      </div>
    );
  }

  const changePage = (offset: number) => {
    setState((prev) => ({ ...prev, pageNumber: prev.pageNumber + offset }));
  };

  // const downloadBroucher = (url: string) => {
  //   fetch(url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(
  //           `Network response was not ok: ${response.statusText}`
  //         );
  //       }
  //       return response.blob();
  //     })
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = "brochure.pdf";
  //       document.body.appendChild(link);

  //       link.click();

  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching or downloading the file:", error);
  //     });
  // };

  function downloadPDF(url: string, filename: string) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        const objectURL = URL.createObjectURL(blob);
        link.href = objectURL;
        link.download = filename || "download.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Delay the revoke
        setTimeout(() => URL.revokeObjectURL(objectURL), 1000);
      })
      .catch(console.error);
  }

  // Example usage:

  const handleDownload = (url: string) => {
    const brocherPageUrl = `/pdf/${encodeURIComponent(
      url.split(process.env.NEXT_PUBLIC_IMG_BASE!)[1] ?? ""
    )}`;
    if (isMobile) {
      /* if (!session) {
        LoginOpen(
          () => {
            url && downloadBroucher(brocherPageUrl);
          },
          {
            type: "brochure",
            link: url,
          }
        );
        return;
      } */
      downloadPDF(url, `${projName}.pdf`);
      // window.open(brocherPageUrl, "_blank", "noreferrer");
      return;
    }
    /* if (!session) {
      LoginOpen(
        () => {
          url && window.open(brocherPageUrl, "_self", "noreferrer");
        },
        {
          type: "brochure",
          link: url,
        }
      );
      return;
    } */
    window.open(brocherPageUrl, "_blank", "noreferrer");
  };

  const loadPDF = async (phase: ProjectPhase) => {
    if (state.activePhase.id === phase.id) return;

    setState((prev) => ({
      ...prev,
      activePhase: phase,
      pageNumber: 1,
      loading: true,
    }));

    try {
      if (!state.blobCache[phase.id]) {
        if (!phase.brochure) throw new Error("Brochure URL not available");
        const response = await fetch(phase.brochure);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        setState((prev) => ({
          ...prev,
          blobCache: { ...prev.blobCache, [phase.id]: blobUrl },
          errorMessage: "",
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        errorMessage: "Error loading PDF. Please try again.",
      }));
      console.error("Error loading PDF:", error);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  //for showing the buttons iniial render
  const BroucherHeader = ({
    projName,
    phaseOverviewData,
    singlePhase,
  }: {
    projName: string;
    phaseOverviewData: PhaseOverview[];
    singlePhase: boolean;
  }) => {
    return (
      <div id="brochure">
        {/*  <button
              onClick={(e) => {
                e.preventDefault();
                if (state.activePhase.brochure)
                  handleDownload(state.activePhase.brochure);
              }}
              className="absolute  bottom-1 right-1 sm:bottom-2  sm:right-2 z-[1]"
            >
              <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px] " />
            </button> */}
        <h2 className="sm:text-[22px] xl:text-[28px] font-bold mb-[12px] capitalize break-words ">
          <strong>
            <span className="text-[#001F35]">
              Explore the Comprehensive Brochures of{" "}
            </span>
            <span className="text-green-800">{projName} </span>
          </strong>
        </h2>
        <div className="mb-1 flex-wrap pl-3">
          <div
            className="inline-flex rounded-md shadow-sm space-x-2"
            role="group"
          >
            {singlePhase &&
              phaseOverviewData.map(
                (phase) =>
                  phase.phaseBrochureUrl && (
                    <button
                      key={phase.phaseId}
                      onClick={() =>
                        loadPDF({
                          id: phase.phaseId,
                          name: phase.phaseName || `Phase ${phase.phaseId}`,
                          brochure: phase.phaseBrochureUrl,
                        })
                      }
                      className={` ${buttonClasses(
                        state.activePhase.id === phase.phaseId
                      )} ${
                        phase.phaseId === phaseOverviewData.length
                          ? "rounded-r-lg"
                          : ""
                      }`}
                      aria-pressed={state.activePhase.id === phase.phaseId}
                    >
                      <span className="hidden sm:inline-flex">
                        {" "}
                        {projName} :{" "}
                      </span>{" "}
                      {phase.phaseName || `Phase ${phase.phaseId}`}
                    </button>
                  )
              )}
          </div>
        </div>
      </div>
    );
  };

  const buttonClasses = (isActive: boolean) =>
    `px-1 py-1 text-xs sm:px-4 sm:py-2 sm:text-lg font-semibold rounded-lg transition-all duration-300 ${
      isActive
        ? "bg-[#0073C6] !text-white shadow-lg"
        : "bg-white text-[#0073C6] hover:bg-gray-50 border border-gray-300"
    } focus:z-10 focus:ring-2 focus:ring-[#0073C6] focus:text-[#0073C6] hover:scale-105`;
  const isLargeBrochure = getBroucherSize(currentSize);
  if (singleBrocher) {
    return (
      <div
        className="w-full scroll-mt-[170px] mx-auto mb-[3%] sm:mb-0 sm:pt-less-screen-spacing"
        id="brochure"
      >
        <div className="w-[95%] sm:w-[90%] mx-auto scroll-mt-[200px]">
          <BroucherHeader
            projName={projName}
            phaseOverviewData={phaseOverviewData}
            singlePhase={false}
          />
        </div>
        {!showMap ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              if (singleBrocher) handleDownload(singleBrocher);
            }}
            className="h-[291px] sm:h-[486px] xl:h-[700px] w-full relative scroll-mt-[125px]"
          >
            <div className="absolute inset-0 bg-gray-100 opacity-80 w-[95%] sm:w-[90%] mx-auto rounded-lg mb-2 sm-mb-0 bg-white/20 shadow-lg backdrop-blur-sm border border-white/30">
              {/*<BroucherHeader projName={projName} singlePhase={true} phaseOverviewData={phaseOverviewData} />*/}

              <picture>
                <source
                  media="(max-width: 460px)"
                  srcSet={broucherImage?.split(",")[0]}
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={broucherImage?.split(",")[1]}
                />
                <source
                  media="(min-width: 1200px)"
                  srcSet={broucherImage?.split(",")[2]}
                />
                <Image
                  alt={`${projName} Brochure`}
                  title={`${projName} Brochure`}
                  src={broucherImage?.split(",")[3]}
                  fill
                  unoptimized
                />
              </picture>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                aria-label="Click to download Brochure" name="Click to download Brochure" title="Click to download Brochure"
                onClick={(e) => {
                  e.preventDefault();
                  if (singleBrocher) handleDownload(singleBrocher);
                }}
                className="z-8 px-6 py-3 text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors"
              >
                <span className="hidden sm:flex text-sm md:text-base font-semibold">
                  Click to View Brochure
                </span>
                <span className="flex sm:hidden text-sm md:text-base font-semibold">
                  Click to download Brochure
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50 scroll-mt-[125px]"
            id="brochure"
          >
            <div
              className="bg-white relative rounded-lg shadow-lg p-4 max-w-full mx-auto h-[350px] sm:h-[600px] flex flex-col justify-between items-center overflow-y-auto"
              ref={pdfContainerRef}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (singleBrocher) handleDownload(singleBrocher);
                }}
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 z-[1]"
              >
                <PopupOpenSvg className="w-[24px] h-[24px] lg:w-[36px] lg:h-[36px]" />
              </button>
              <div className="flex-grow w-full overflow-hidden flex justify-center items-center relative">
                {state.loading ? (
                  <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                ) : state.errorMessage ? (
                  <p className="text-red-500">{state.errorMessage}</p>
                ) : isLargeBrochure ? (
                  <Document
                    className={"overscroll-y-scroll"}
                    file={state.blobCache[0] || singleBrocher}
                    onLoadSuccess={async (document) => {
                      const info = await document.getDownloadInfo();
                      setCurrentSize(info.length);
                      onDocumentLoadSuccess(document);
                    }}
                    loading={
                      <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                    }
                  >
                    <Page
                      pageNumber={state.pageNumber}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="shadow-md rounded overflow-y-auto"
                      height={isMobile ? 300 : 520}
                      loading={
                        <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                      }
                    />
                  </Document>
                ) : (
                  <iframe
                    src={singleBrocher}
                    className="w-full h-[600px] border-0"
                    title={`${projName} Brochure`}
                  />
                )}
              </div>

              <div className="w-full flex items-center justify-center space-x-4 mt-4">
                {isLargeBrochure ? (
                  <>
                    <button
                      onClick={() => changePage(-1)}
                      disabled={
                        state.pageNumber <= 1 ||
                        state.loading ||
                        state.pageNumber === 0
                      }
                      className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed ${
                        state.loading ? "cursor-not-allowed" : "h-8 w-8"
                      }`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-4 relative group">
                      <span className="text-gray-600 font-bold">
                        Page {state.pageNumber} of {state.numPages || "--"}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (singleBrocher) handleDownload(singleBrocher);
                        }}
                        className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                          state.loading ? "cursor-not-allowed" : ""
                        }`}
                        aria-label={`Download ${projName} brochure`}
                      >
                        <FaDownload className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          Download Brochure
                        </span>
                      </button>
                    </div>
                    <button
                      onClick={() => changePage(1)}
                      disabled={
                        state.pageNumber >= state.numPages! || state.loading
                      }
                      className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full disabled:opacity-50 disabled:cursor-not-allowed ${
                        state.loading ? "cursor-not-allowed" : "h-8 w-8"
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (singleBrocher) handleDownload(singleBrocher);
                    }}
                    className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                      state.loading ? "cursor-not-allowed" : ""
                    }`}
                    aria-label={`Download ${projName} brochure`}
                  >
                    <FaDownload className="h-4 w-4" />
                    <span className="hidden sm:inline">Download Brochure</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="w-full scroll-mt-[170px] mx-auto mb-[3%] sm:mb-0 sm:pt-less-screen-spacing"
      id="location-map"
    >
      <div className="w-[95%] sm:w-[90%] mx-auto scroll-mt-[200px]">
        {/* new implemented of brochure header */}
        <BroucherHeader
          projName={projName}
          singlePhase={true}
          phaseOverviewData={phaseOverviewData}
        />
      </div>

      {!showMap ? (
        <div className="h-[291px] sm:h-[486px] xl:h-[700px] w-full relative scroll-mt-[125px]">
          <div className="absolute inset-0 bg-gray-100 opacity-80 w-[95%] sm:w-[90%] mx-auto rounded-lg mb-2 sm-mb-0">
            <picture>
              <source
                media="(max-width: 460px)"
                srcSet={broucherImage?.split(",")[0]}
              />
              <source
                media="(max-width: 768px)"
                srcSet={broucherImage?.split(",")[1]}
              />
              <source
                media="(min-width: 1200px)"
                srcSet={broucherImage?.split(",")[2]}
              />
              <Image
                alt={`${projName} Brochure`}
                title={`${projName} Brochure`}
                src={broucherImage?.split(",")[3]}
                fill
                unoptimized
              />
            </picture>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                if (state.activePhase.brochure)
                  handleDownload(state.activePhase.brochure);
              }}
              className="z-8 px-6 py-3 mx-2 text-left sm:mx-0 sm:text-center text-white rounded-lg bg-btnPrimary shadow-lg hover:bg-btnPrimary transition-colors"
            >
              <span className="text-sm md:text-base font-semibold line-clamp-1">{`Click to View  Brochure ${projName}`}</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-[95%] sm:w-[90%] mx-auto my-4 sm:my-8 bg-gray-50 scroll-mt-[125px] relative"
          id="brochure"
        >
          <div
            className="bg-white rounded-lg shadow-lg p-4 max-w-full mx-auto h-[350px] sm:h-[600px] flex flex-col justify-between items-center overflow-y-auto"
            ref={pdfContainerRef}
          >
            <div className="flex-grow w-full overflow-hidden flex justify-center items-center relative">
              {state.loading ? (
                <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
              ) : state.errorMessage ? (
                <p className="text-red-500">{state.errorMessage}</p>
              ) : isLargeBrochure ? (
                <Document
                  className={"overscroll-y-scroll"}
                  key={state.activePhase.id}
                  file={
                    state.blobCache[state.activePhase.id] ||
                    state.activePhase.brochure
                  }
                  onLoadSuccess={async (document) => {
                    const info = await document.getDownloadInfo();
                    setCurrentSize(info.length);
                    onDocumentLoadSuccess(document);
                  }}
                  loading={
                    <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                  }
                >
                  <Page
                    pageNumber={state.pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="shadow-md rounded "
                    loading={
                      <FaSpinner className="animate-spin text-[#0073C6] h-8 w-8" />
                    }
                    height={isMobile ? 270 : 520}
                  />
                </Document>
              ) : (
                <iframe
                  src={state.activePhase.brochure || ""}
                  className="w-full h-[500px] border-0"
                  title={`${projName} Brochure`}
                />
              )}
            </div>

            <div className="w-full flex items-center justify-center mt-4">
              <div className="flex items-center space-x-4 relative group">
                {isLargeBrochure ? (
                  <>
                    <button
                      onClick={() => changePage(-1)}
                      disabled={state.pageNumber <= 1 || state.loading}
                      className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full h-8 w-8 ${
                        state.pageNumber <= 1 || state.loading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="text-gray-600 font-bold">
                      Page {state.pageNumber} of {state.numPages || "--"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (state.activePhase.brochure)
                          handleDownload(state.activePhase.brochure);
                      }}
                      className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                        state.loading ? "cursor-not-allowed" : ""
                      }`}
                      aria-label={`Download ${state.activePhase.name} brochure`}
                    >
                      <FaDownload className="h-4 w-4" />
                      <span className="hidden sm:inline">
                        Download Brochure
                      </span>
                    </button>
                    <button
                      onClick={() => changePage(1)}
                      disabled={
                        state.pageNumber >= state.numPages! || state.loading
                      }
                      className={`bg-[#0073C6] text-white p-1 flex justify-center items-center rounded-full h-8 w-8 ${
                        state.pageNumber >= state.numPages! || state.loading
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (state.activePhase.brochure)
                        handleDownload(state.activePhase.brochure);
                    }}
                    className={`bg-[#0073C6] text-white px-3 py-1 rounded-full flex items-center space-x-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 hover:shadow-lg ${
                      state.loading ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <FaDownload className="h-4 w-4" />
                    <span className="hidden sm:inline">Download Brochure</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(BrocherContent);
