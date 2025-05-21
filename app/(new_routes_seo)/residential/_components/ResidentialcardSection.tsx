/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
"use client";
import { formatDate } from "@/app/utils/date";
import Button from "../../../elements/button";
import Image from "next/image";
import Link from "next/link";
import { useReqCallPopup } from "@/app/hooks/useReqCallPop";
import React, { useState, useEffect, useCallback, memo } from "react";
import { FaMapMarkerAlt} from "react-icons/fa";
import RequestCallBackModal from "@/app/components/molecules/popups/req";
import { createProjectLinkUrl } from "@/app/utils/linkRouters/ProjectLink";

type Props = {
  data: any;
  setLoading: (loading: boolean) => void;
  loading: boolean;
  totalCount: Number;
};

export default function ResidentialCardSection({
  data,
  setLoading,
  loading,
  totalCount,
}: Props) {
  const properties = data.data || [];
  const [listItemsCount, setListItemsCount] = useState(40);
  const [, { open }] = useReqCallPopup();

  const fetchMoreItems = useCallback(() => {
    if (properties.length > listItemsCount) {
      setLoading(true);
      setTimeout(() => {
        setListItemsCount((prevCount) => {
          const newCount = prevCount + 20;

          if (newCount % 200 === 0 || newCount >= properties.length) {
            setTimeout(() => {
              const targetItem = document.getElementById(
                `item-${newCount - 1}`
              );
              if (targetItem) {
                targetItem.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 100); // delay to ensure DOM is updated
          }

          return newCount;
        });
        setLoading(false);
      }, 500);
    }
  }, [listItemsCount, properties.length]);

  useEffect(() => {
    if (listItemsCount >= properties.length) return;

    const items = document.querySelectorAll(".infinityItem");
    if (items.length === 0) return;

    const observerCallback = (entries: any, observer: any) => {
      entries.forEach((entry: any) => {
        if (
          entry.isIntersecting &&
          entry.target.id === `item-${items.length - 1}`
        ) {
          fetchMoreItems();
          items.forEach((item) => observer.unobserve(item));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, [listItemsCount, properties, fetchMoreItems]);

  const LoadingSpinner = memo(function LoadingSpinner() {
    return (
      <div className="flex items-center gap-2">
        <div className="w-[20px] h-[20px] md:w-[26px] md:h-[26px] xl:w-[30px] xl:h-[30px] border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
        <span className="font-bold">Loading more results...</span>
      </div>
    );
  });
  const type = "proj";

  /*Tested jios test */

  return (
    <>
      <section className="py-8 sm:py-14 container mx-auto px-4">
        {!properties || properties.length < 1 ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties
                .slice(0, listItemsCount)
                .map((property: any, index: any) => {
                  if (!property) {
                    return null; // Handle case where property is undefined
                  }

                  const minPrice = property.minPrice
                    ? parseInt(property.minPrice)
                    : 0;
                  const maxPrice = property.maxPrice
                    ? parseInt(property.maxPrice)
                    : 0;
                  const possessionDate = property.possassionDate
                    ? formatDate(property.possassionDate)
                    : "N/A";
                  const propertyType =
                    Array.isArray(property.propType) &&
                    property.propType.length > 0
                      ? property.propType.join(", ")
                      : property.propType;
                  const reraStatus = property.rerastatus || "N/A";

                  return (
                    <div
                      id={`item-${index}`}
                      key={property.projIdEnc}
                      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow infinityItem"
                    >
                      <div className="relative h-64">
                        <Image
                          unoptimized
                          src={
                            property.coverUrl
                              ? property.coverUrl.split(",")[0]
                              : "/api/placeholder/60/60"
                          }
                          alt={
                            `Cover Image Of ${property.projName} - ${
                              property.locality
                            }, ${property.city} - Price Range: ₹${(
                              minPrice / 10000000
                            ).toFixed(2)} Cr - ₹${(maxPrice / 10000000).toFixed(
                              2
                            )} Cr` || "Property Image"
                          }
                          title={
                            `Cover Image Of ${property.projName} - ${
                              property.locality
                            }, ${property.city} - Price Range: ₹${(
                              minPrice / 10000000
                            ).toFixed(2)} Cr - ₹${(maxPrice / 10000000).toFixed(
                              2
                            )} Cr` || "Property Image"
                          }
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute top-4 left-4 bg-primary px-3 py-1 text-sm flex justify-center items-center gap-1 rounded p-1 bg-[#000000b0] text-white text-[12px] xl:text-base not-italic font-semibold leading-[normal] capitalize">
                          {property.projstatus || "Status Unknown"}
                        </div>
                      </div>
                      <div className=" p-6">
                        <h2>
                          <Link
                            prefetch={false}
                            href={createProjectLinkUrl({
                              city: property.city,
                              locality: property.locality,
                              slug: property.projName,
                              projIdEnc: property.projIdEnc,
                            })}
                            /*  href={`/residential/projects/${
                            property.city?.toLowerCase() || "unknown"
                          }/${
                            property.locality?.toLowerCase() || "unknown"
                          }/${property.projName
                            ?.toLowerCase()
                            .replace(/ /g, "-")}-${property.projIdEnc}`} */
                            className="text-xl font-bold mb-2 text-blue-600 hover:cursor-pointer"
                          >
                            {property.projName || "Unnamed Property"}
                          </Link>
                        </h2>
                        <h3 className="text-muted-foreground flex items-center gap-2 mb-4">
                          <FaMapMarkerAlt />{" "}
                          {property.locality || "Unknown Locality"},{" "}
                          {property.city || "Unknown City"}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-sm">
                          <p className="font-semibold">Price Range</p>
                          <p>
                            ₹{(minPrice / 10000000).toFixed(2)} Cr - ₹
                            {(maxPrice / 10000000).toFixed(2)} Cr
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">Property Type</p>
                          <p>{propertyType}</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">Possession</p>
                          <p>{possessionDate}</p>
                        </div>
                        <div className="text-sm">
                          <p className="font-semibold">RERA Status</p>
                          <p>{reraStatus}</p>
                        </div>
                      </div>
                        <div className="flex w-full  flex-row gap-4">
                          <Link
                            prefetch={false}
                            href={createProjectLinkUrl({
                              city: property.city,
                              locality: property.locality,
                              slug: property.projName,
                              projIdEnc: property.projIdEnc,
                            })}
                            className="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white sm:px-4 py-2 rounded-lg text-center text-sm sm:text-[12px] lg:text-sm font-medium transition-colors"
                          >
                            View Details
                          </Link>
                          <Button
                            title="Request  Callback"
                            buttonConClass="flex-1 bg-bgSecondary bg-primary hover:bg-primary/90 text-white px-4 sm:px-2 lg:px-4 py-2 rounded-lg text-center text-sm  sm:text-[10px] lg:text-sm font-medium transition-colors"
                            buttonClass=""
                            onChange={() => {
                              open({
                                modal_type: true
                                  ? "PROJECT_REQ_CALLBACK"
                                  : "PROPERTY_REQ_CALLBACK",
                                postedByName: true
                                  ? property.projName
                                  : data.postedBy,
                                postedId: true
                                  ? property.projIdEnc
                                  : data.postedById,
                                reqId: property.projIdEnc,
                                source: true ? "projCard" : "propCard",
                                title: property.projName,
                                /*  true
                                ? projName
                                : `${bhkName ?? ""} ${propTypeName} for
                            ${data.category === "Rent" ? "Rent" : "Sale"} in ${localityName}`, */
                              });
                              // pushHistory();
                            }}
                          />
                          {/*  <Link
                          rel="noopener noreferrer"
                          prefetch={false}
                          href="tel:+91-8884440963"
                          className="flex-1 border border-primary text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Enquire Now
                        </Link> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {loading && (
              <div className="w-full h-[10vh] py-8 flex justify-center items-center text-gray-600">
                <LoadingSpinner />
              </div>
            )}
          </div>
        )}
        <RequestCallBackModal />
      </section>
      {/* Pagination controls */}
      {/* {totalPages > 1 && (
            <div className="mt-10 flex justify-center">
              <nav className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <FaChevronLeft className="h-4 w-4" />
                </button>

                {getPageNumbers().map((pageNum, index) => {
                  // Handle ellipsis
                  if (pageNum < 0) {
                    return (
                      <span key={`ellipsis-${index}`} className="px-3 py-2">
                        ...
                      </span>
                    )
                  }

                  return (
                    <button
                      key={`page-${pageNum}`}
                      onClick={() => 
                        
                        
                        
                        (pageNum)}
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
                        currentPage === pageNum
                          ? "bg-primary text-primary-foreground"
                          : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                      }`}
                      aria-label={`Page ${pageNum + 1}`}
                      aria-current={currentPage === pageNum ? "page" : undefined}
                    >
                      {pageNum + 1}
                    </button>
                  )
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  aria-label="Next page"
                >
                  <FaChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          )} */}

      {/* Page information */}
      {/*    {totalCount > 0 && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, totalCount)} of{" "}
              {totalCount} results
            </div>
          )} */}
    </>
  );
}
