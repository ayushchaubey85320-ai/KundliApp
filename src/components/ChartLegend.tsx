import React from 'react';

export const ChartLegend: React.FC = () => {
  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#F7A789] text-white font-medium text-xs sm:text-sm px-4 py-2.5 shadow-md select-none">
      {/* Row 1: * वक्री, ^ अस्त, ▫ वर्गोत्तम */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center gap-1">
          <span className="text-white font-bold">*</span>
          <span>वक्री</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white font-bold">^</span>
          <span>अस्त</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white font-bold">▫</span>
          <span>वर्गोत्तम</span>
        </div>
      </div>

      {/* Row 2: ↑ उच्च, ↓ नीच */}
      <div className="flex items-center justify-start gap-12 px-1">
        <div className="flex items-center gap-1">
          <span className="text-white font-bold">↑</span>
          <span>उच्च</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-white font-bold">↓</span>
          <span>नीच</span>
        </div>
      </div>
    </div>
  );
};
