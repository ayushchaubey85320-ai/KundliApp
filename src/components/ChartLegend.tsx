import React from 'react';

export const ChartLegend: React.FC = () => {
  return (
    <div className="chart-legend-box">
      {/* Row 1: * वक्री, ^ अस्त, ▫ वर्गोत्तम */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        <div className="flex items-center">
          <span className="legend-symbol">*</span>
          <span className="legend-text">वक्री</span>
        </div>

        <div className="flex items-center">
          <span className="legend-symbol">^</span>
          <span className="legend-text">अस्त</span>
        </div>

        <div className="flex items-center">
          <span className="legend-symbol">▫</span>
          <span className="legend-text">वर्गोत्तम</span>
        </div>
      </div>

      {/* Row 2: ↑ उच्च, ↓ नीच */}
      <div className="flex items-center justify-start gap-12 px-1">
        <div className="flex items-center">
          <span className="legend-symbol">↑</span>
          <span className="legend-text">उच्च</span>
        </div>

        <div className="flex items-center">
          <span className="legend-symbol">↓</span>
          <span className="legend-text">नीच</span>
        </div>
      </div>
    </div>
  );
};
