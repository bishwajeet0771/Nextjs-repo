"use client";

import {
  FaBuilding,
  FaBed,
  FaBath,
  FaCompass,
  FaArrowRight,
} from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { MdBalcony } from "react-icons/md";

interface PropertyCardProps {
  bhk: string;
  type: string;
  tower: string;
  floor: string;
  unit: string;
  area: {
    value: number;
    unit: string;
  };
  facing: string;
  details: {
    bedrooms: number;
    bathrooms: number;
    balconies: number;
  };
  onViewDetails: () => void;
}

export default function PropertyCard({
  bhk,
  type,
  tower,
  floor,
  unit,
  area,
  facing,
  details,
  onViewDetails,
}: PropertyCardProps) {
  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                {bhk} {type}
              </h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="w-4 h-4 mr-1.5 text-blue-600" />
                  <span className="text-sm">Tower {tower}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BiBuildingHouse className="w-4 h-4 mr-1.5 text-blue-600" />
                  <span className="text-sm">Floor {floor}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaBuilding className="w-4 h-4 mr-1.5 text-blue-600" />
                  <span className="text-sm">Unit {unit}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-right">
                <div className="text-sm text-gray-500">Super Built-up Area</div>
                <div className="text-lg font-semibold text-gray-900">
                  {area.value} {area.unit}
                </div>
              </div>
              <div className="flex items-center justify-end gap-1.5">
                <FaCompass className="w-4 h-4 text-blue-600" />
                <div className="text-sm text-gray-500">Facing</div>
                <div className="text-sm font-semibold text-gray-900">
                  {facing}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaBed className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Bedrooms</div>
              <div className="font-semibold text-gray-900">
                {details.bedrooms}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaBath className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Bathrooms</div>
              <div className="font-semibold text-gray-900">
                {details.bathrooms}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <MdBalcony className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Balconies</div>
              <div className="font-semibold text-gray-900">
                {details.balconies}
              </div>
            </div>
          </div>
        </div>

        {/* View Details */}
        <button
          onClick={onViewDetails}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors ml-auto group"
        >
          <span className="font-medium">View Details</span>
          <FaArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
