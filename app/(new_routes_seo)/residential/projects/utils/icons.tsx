import { projectprops } from "@/app/data/projectDetails";
import {
  PlotIcon,
  VillamentIcon,
  VillaIcon,
  RowHouseIcon,
  ApartmentIcon,
  // ByTypeSvg,
  // ByUnitSvg,
  // ByBhkSvg,
  // PopupOpenSvg,
} from "@/app/images/commonSvgs";
const iconStyles: string =
  " flex items-center justify-center w-[34px] sm:w-[40px] h-[34px] sm:h-[40px] bg-[#FAFDFF] rounded-[50%] ";
const getIcon = (id: number) => {
  let iconComponent;
  switch (id) {
    case projectprops.apartment:
      iconComponent = <ApartmentIcon className={iconStyles} />;
      break;
    case projectprops.rowHouse:
      iconComponent = <RowHouseIcon className={iconStyles} />;
      break;
    case projectprops.villa:
      iconComponent = <VillaIcon className={iconStyles} />;
      break;
    case projectprops.villament:
      iconComponent = <VillamentIcon className={iconStyles} />;
      break;
    case projectprops.plot:
      iconComponent = <PlotIcon className={iconStyles} />;
      break;
    default:
      break;
  }
  return iconComponent;
};
export default getIcon;
