import Loading from "@/app/components/atoms/Loader";
import useSearchFilters from "@/app/hooks/search";
import useQsearch from "@/app/hooks/search/useQsearch";
import { SearchLocationIcon } from "@/app/images/commonSvgs";
import { ScrollArea } from "@mantine/core";
// import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function Results() {
  // const { push } = useRouter();
  const { data, isLoading, handleResetQuery } = useQsearch();
  const {
    localities,
    builders,
    cities,
    projects,
    listing: listings,
    projectListing,
  } = data;
  const { filters, setFilters } = useSearchFilters();

  if (isLoading) {
    return <Loading />;
  }

  const handleAddSearch = (newItem: string) => {
    if (!filters.locality.includes(newItem)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        locality: [...prevFilters.locality, newItem],
      }));
      handleResetQuery();
    } else {
      toast.error("The locality already exists.");
    }
  };

  const handlePush = async (type: string, data: any) => {
    switch (type) {
      case "project":
        window.open(`/abc/delhi/palika/${data}`);
        break;
      case "listing":
        {
          const [ut, pt, cg, lt] = data.id.split("_");
          const url = `propType=${pt}-bhk=${ut}-cgs=${cg}-localities=${data.name}%2B${lt}`;
          window.open("/search/listing?sf=" + url);
        }
        break;
      case "projectListing":
        {
          const url = `projIdEnc=${data.id}-listedBy=${data.type.split("")[0]}`;
          window.open("/search/listing?sf=" + url);
        }
        break;
      case "builder":
        setFilters((prevFilters) => ({
          ...prevFilters,
          builderIds: [...prevFilters.builderIds, `$${data.name}+${data.id}`],
        }));
        handleResetQuery();
        break;
      default:
        break;
    }
  };

  const noResults =
    localities?.length === 0 &&
    cities?.length === 0 &&
    builders?.length === 0 &&
    projects?.length === 0 &&
    listings?.length === 0 &&
    projectListing?.length === 0;
  return (
    <ScrollArea className="px-5 py-2 h-[310px]">
      {noResults ? (
        <p>No results found</p>
      ) : (
        <>
          {" "}
          <div>
            {localities?.length > 0 && (
              <h2 className="text-[#5F81B2] text-[14px] font-bold sm:text-xl flex space-x-2 items-center">
                <SearchLocationIcon /> <span>Location</span>
              </h2>
            )}

            {localities?.length > 0 && <SubHeading text="Locality" />}
            <ul>
              {localities?.map((locality: any) => (
                <li
                  onClick={() =>
                    handleAddSearch(`${locality.name}+${locality.id}`)
                  }
                  className="text-[14px] md:text-[16px] text-[#4D6677] font-[600] cursor-pointer"
                  key={locality.id}
                >
                  {locality.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            {projects && projects.length > 0 && (
              <h2 className="text-[#5F81B2] sm:text-xl flex space-x-2 items-center mt-[14px] mb-1 font-bold">
                {property} <span>Projects</span>
              </h2>
            )}
            <ul>
              {projects?.map((project: any) => (
                <li
                  onClick={() => handlePush("project", project.id)}
                  className="text-[#737579] text-[14px] sm:text-xl not-italic font-medium leading-[normal] cursor-pointer"
                  key={project.id}
                >
                  {project.name}
                </li>
              ))}
            </ul>
            {listings?.length > 0 && <SubHeading text="Listings" />}

            <ul>
              {listings?.map((listing: any) => {
                return (
                  <li
                    onClick={() =>
                      handlePush("listing", {
                        id: listing.id,
                        name: listing.name.split("in")[1],
                      })
                    }
                    className="text-[#737579] text-[14px] sm:text-xl not-italic font-medium leading-[normal] cursor-pointer"
                    key={listing.id}
                  >
                    {listing.name}
                  </li>
                );
              })}
            </ul>
            {projectListing?.length > 0 && (
              <SubHeading text="Project Listings" />
            )}
            <ul>
              {projectListing?.map((projectListing: any) => (
                <li
                  onClick={() =>
                    handlePush("projectListing", {
                      id: projectListing.id,
                      type: projectListing.type,
                    })
                  }
                  className="text-[#737579] text-[14px] sm:text-xl not-italic font-medium leading-[normal] cursor-pointer"
                  key={projectListing.id}
                >
                  {projectListing.name}
                </li>
              ))}
            </ul>
            {builders?.length > 0 && <SubHeading text="Builders" />}
            <ul>
              {builders?.map((builder: any) => (
                <li
                  onClick={() =>
                    handlePush("builder", {
                      name: builder.name,
                      id: builder.id,
                    })
                  }
                  className="text-[14px] md:text-[16px] text-[#4D6677] font-[600] cursor-pointer"
                  key={builder.id}
                >
                  {builder.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </ScrollArea>
  );
}
const SubHeading = ({ text }: { text: string }) => {
  return (
    <div className="flex  items-center gap-1.5 mt-[14px] mb-1">
      <div className="text-[#4D6677] text-lg   font-bold">{text}</div>{" "}
      <hr className="w-full h-px  border-0 bg-[#98A5B8]" />
    </div>
  );
};
const property = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <g clipPath="url(#clip0_2974_100402)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8554 1.89162C11.0345 1.832 11.2248 1.81372 11.412 1.83815C11.5991 1.86259 11.7784 1.9291 11.9362 2.0327C12.094 2.1363 12.2263 2.2743 12.3231 2.43633C12.42 2.59837 12.4789 2.78024 12.4954 2.96829L12.5004 3.07829V7.64995L15.662 8.28329C15.9255 8.33579 16.1651 8.47179 16.3452 8.67112C16.5253 8.87046 16.6364 9.12252 16.662 9.38995L16.667 9.50829V15.8333H17.5004C17.7128 15.8335 17.9171 15.9149 18.0715 16.0607C18.226 16.2065 18.3189 16.4057 18.3314 16.6178C18.3438 16.8298 18.2748 17.0386 18.1385 17.2015C18.0022 17.3644 17.8088 17.469 17.5979 17.4941L17.5004 17.5H2.50038C2.28798 17.4997 2.08369 17.4184 1.92924 17.2726C1.77479 17.1268 1.68185 16.9275 1.6694 16.7155C1.65695 16.5034 1.72594 16.2946 1.86227 16.1318C1.99859 15.9689 2.19197 15.8642 2.40288 15.8391L2.50038 15.8333H3.33371V5.29995C3.33371 4.79995 3.63038 4.35329 4.08205 4.15495L4.18871 4.11412L10.8554 1.89162ZM10.8337 3.65662L5.00038 5.60079V15.8333H10.8337V3.65662ZM12.5004 9.35079V15.8333H15.0004V9.84995L12.5004 9.35079Z"
        fill="#5F81B2"
      />
    </g>
    <defs>
      <clipPath id="clip0_2974_100402">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
