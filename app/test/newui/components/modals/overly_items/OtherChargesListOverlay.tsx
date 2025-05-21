import { useAtomValue } from "jotai";
import React from "react";
import { overlayAtom } from "../../../store/overlay";
import { FaRupeeSign } from "react-icons/fa"; // Optional: Use this icon to represent currency
import { projSearchStore } from "@/app/(new_routes_seo)/search/store/projSearchStore";

const OtherCharges: React.FC = () => {
  const { content } = useAtomValue(overlayAtom);
  const state = useAtomValue(projSearchStore);

  if (!content || content.length === 0) {
    return <div>No charges available</div>;
  }
  // console.log(content.data)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
        <thead>
          <tr className="bg-btnPrimary">
            <th className="px-4 py-2 text-left text-white font-semibold">
              Type of Charge
            </th>
            <th className="px-4 py-2 text-right text-white font-semibold">
              Price Range (In Rupees)
            </th>
          </tr>
        </thead>
        <tbody>
          {content.data.map((charge: any, index: number) => (
            <tr
              key={`${charge.label}`}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 text-gray-700">{state.cg === "R" && charge.label === "Price" ? "Price/Month" : charge.label}</td>
              <td className="px-4 py-2 text-right text-gray-900 font-medium flex items-center justify-end">
                {/* <FaRupeeSign className="mr-1 text-green-600" /> */}
                {isNaN(charge.value.replace(",", '')) ? charge.value : `₹ ${charge.value}`}
              </td>
            </tr>
          ))}
          {/* Example: Total Row */}
          <tr className="bg-gray-100 font-semibold">
            <td className="px-4 py-2"> {state.cg === "R" ? "Total Price" : "Total Selling Price"}</td>
            <td className="px-4 py-2 text-right flex items-center justify-end">
              <FaRupeeSign className="mr-1 text-green-600" />
              {/* Replace this with actual total value if available */}
              {content.total}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OtherCharges;
