// import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import useSearchFilters from "@/app/hooks/search";
import S from "@/app/styles/seach/Drawer.module.css";
import { MobileFilter } from "./filter";
import { ListingMobileFilter } from "../../listing/components/drawer/filter";
type Props = {
  open: () => void;
  close: () => void;
  opened: boolean;
};
function SearchDrawer({ close, open, opened }: Props) {
  const { countAppliedFilters, params } = useSearchFilters();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        classNames={{
          overlay: S.overlay,
          content: S.content,
          body: S.body,
          header: S.header,
        }}
        size={"100%"}
      >
        {params.listedBy ? (
          <ListingMobileFilter close={close} />
        ) : (
          <MobileFilter close={close} />
        )}
      </Drawer>

      <button
        className=" text-[#0073C6] mr-[5%] md:m-0 text-[12px] xl:text-[20px] font-[500] gap-[3px] p-[3px] xl:gap-[6px] xl:p-[7px] pl-[12px] pr-[12px]  justify-center items-center rounded-[57px] border-[1px] border-[#A0D7FF] bg-[#FFF] shadow-md hidden"
        onClick={open}
      >
        <div className="text-[#FFF] bg-[#148B16] rounded-[50%] text-[12px] xl:text-[16px] font-[700] w-[24px] h-[24px] flex justify-center items-center">
          {countAppliedFilters()}
        </div>
        Filters
      </button>
    </>
  );
}
export default SearchDrawer;
