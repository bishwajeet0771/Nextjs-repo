// "use client";

// import { useEffect } from "react";
// import { FaTimes, FaCompass, FaCar, FaBuilding } from "react-icons/fa";
// import { PropertyUnit } from "../types/floor-plan";

// interface FullImageModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   unit: PropertyUnit;
// }

// export function FullImageModal({ isOpen, onClose, unit }: FullImageModalProps) {
//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };

//     if (isOpen) {
//       document.addEventListener("keydown", handleEscape);
//       document.body.style.overflow = "hidden";
//     }

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="absolute inset-0 bg-black/50" onClick={onClose} />
//       <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
//         <div className="flex items-center justify-between p-4 border-b">
//           <h3 className="text-2xl font-semibold text-[#0073C6]">
//             {unit.bhk} Floor Plan
//           </h3>
//           <button
//             onClick={onClose}
//             className="p-1 rounded-full hover:bg-gray-100 transition-colors"
//           >
//             <FaTimes className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>
//         <div className="p-6">
//           <img
//             src={unit.floorPlanImage}
//             alt={`Floor Plan for ${unit.bhk}`}
//             className="w-full h-auto rounded-lg shadow-sm mb-6"
//           />
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <p className="text-gray-600">Super Builtup Area</p>
//               <p className="text-2xl font-semibold">{unit.builtupArea} sq ft</p>
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600">Unit Number</p>
//               <p className="text-2xl font-semibold">{unit.unitNumber}</p>
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600">Tower</p>
//               <p className="text-2xl font-semibold">{unit.tower}</p>
//             </div>
//             <div className="space-y-2">
//               <p className="text-gray-600">Facing</p>
//               <p className="text-2xl font-semibold">{unit.facing}</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4 mt-6">
//             <div className="flex items-center gap-2">
//               <FaBuilding className="text-[#0073C6] text-xl" />
//               <span>{unit.bedrooms} Bedrooms</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaCompass className="text-[#0073C6] text-xl" />
//               <span>{unit.bathrooms} Bathrooms</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaCar className="text-[#0073C6] text-xl" />
//               <span>Car Parking: {unit.carParking}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react'

type Props = {}

export default function FullImageModal({}: Props) {
  return (
    <div>full-image-modal</div>
  )
}
