import React from 'react';
import { HouseData } from '../astrology/kundliEngine';

interface NorthIndianChartProps {
  houses: HouseData[];
  chartTitle?: string;
  onSelectHouse?: (houseNumber: number) => void;
  selectedHouse?: number | null;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  houses,
  chartTitle = 'लग्न कुंडली (D1)',
  onSelectHouse,
  selectedHouse,
}) => {
  // Map of houses by houseNumber (1 to 12)
  const houseMap = new Map<number, HouseData>();
  houses.forEach((h) => houseMap.set(h.houseNumber, h));

  // Coordinates for the 12 houses in a 400x400 SVG
  // House centers for Rashi numbers and Planet badges
  const houseConfig: Record<
    number,
    {
      rashiPos: { x: number; y: number };
      planetsPos: { x: number; y: number };
      polyPoints?: string;
    }
  > = {
    1: {
      rashiPos: { x: 200, y: 145 },
      planetsPos: { x: 200, y: 95 },
    },
    2: {
      rashiPos: { x: 105, y: 55 },
      planetsPos: { x: 95, y: 95 },
    },
    3: {
      rashiPos: { x: 55, y: 105 },
      planetsPos: { x: 50, y: 155 },
    },
    4: {
      rashiPos: { x: 145, y: 200 },
      planetsPos: { x: 95, y: 200 },
    },
    5: {
      rashiPos: { x: 55, y: 295 },
      planetsPos: { x: 50, y: 250 },
    },
    6: {
      rashiPos: { x: 105, y: 345 },
      planetsPos: { x: 95, y: 305 },
    },
    7: {
      rashiPos: { x: 200, y: 255 },
      planetsPos: { x: 200, y: 305 },
    },
    8: {
      rashiPos: { x: 295, y: 345 },
      planetsPos: { x: 305, y: 305 },
    },
    9: {
      rashiPos: { x: 345, y: 295 },
      planetsPos: { x: 350, y: 250 },
    },
    10: {
      rashiPos: { x: 255, y: 200 },
      planetsPos: { x: 305, y: 200 },
    },
    11: {
      rashiPos: { x: 345, y: 105 },
      planetsPos: { x: 350, y: 155 },
    },
    12: {
      rashiPos: { x: 295, y: 55 },
      planetsPos: { x: 305, y: 95 },
    },
  };

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#0d121f] p-3 rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-900/10">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-amber-300 font-semibold tracking-wide text-sm flex items-center gap-1.5">
          <span className="text-base">☸</span> {chartTitle}
        </h3>
        <span className="text-[11px] text-amber-200/60 font-sans">उत्तर भारतीय पद्धति</span>
      </div>

      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full select-none cursor-pointer"
          style={{ filter: 'drop-shadow(0 0 10px rgba(217, 119, 6, 0.15))' }}
        >
          <defs>
            {/* Cosmic Background Gradient */}
            <linearGradient id="chartBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B0E17" />
              <stop offset="50%" stopColor="#111827" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Gold Stroke Gradient */}
            <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Highlighted House Gradient */}
            <radialGradient id="highlightGlow">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.35)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.0)" />
            </radialGradient>
          </defs>

          {/* Background Outer Box */}
          <rect
            x="4"
            y="4"
            width="392"
            height="392"
            fill="url(#chartBg)"
            stroke="url(#goldStroke)"
            strokeWidth="2.5"
            rx="4"
          />

          {/* Diamond Central Lines */}
          {/* Main Diagonals */}
          <line x1="4" y1="4" x2="396" y2="396" stroke="url(#goldStroke)" strokeWidth="1.5" opacity="0.85" />
          <line x1="396" y1="4" x2="4" y2="396" stroke="url(#goldStroke)" strokeWidth="1.5" opacity="0.85" />

          {/* Inner Diamond connecting midpoints (200, 4) - (396, 200) - (200, 396) - (4, 200) */}
          <polygon
            points="200,4 396,200 200,396 4,200"
            fill="none"
            stroke="url(#goldStroke)"
            strokeWidth="2"
          />

          {/* Render 12 Houses */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const hData = houseMap.get(houseNum);
            const cfg = houseConfig[houseNum];
            const isSelected = selectedHouse === houseNum;

            return (
              <g
                key={houseNum}
                onClick={() => onSelectHouse && onSelectHouse(houseNum)}
                className="transition-all duration-200 hover:opacity-90"
              >
                {/* Visual feedback if selected */}
                {isSelected && (
                  <circle
                    cx={cfg.rashiPos.x}
                    cy={cfg.rashiPos.y}
                    r="24"
                    fill="url(#highlightGlow)"
                  />
                )}

                {/* Rashi Number in House */}
                {hData && (
                  <text
                    x={cfg.rashiPos.x}
                    y={cfg.rashiPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FBBF24"
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="serif"
                    className="cursor-pointer"
                  >
                    {hData.rashi.id}
                  </text>
                )}

                {/* House Number subtle watermark */}
                <text
                  x={cfg.rashiPos.x}
                  y={cfg.rashiPos.y + (houseNum === 1 ? -24 : houseNum === 7 ? 24 : 15)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="rgba(148, 163, 184, 0.4)"
                  fontSize="8.5"
                  fontFamily="sans-serif"
                >
                  H{houseNum}
                </text>

                {/* Occupying Planets */}
                {hData && hData.planets.length > 0 && (
                  <g>
                    {hData.planets.map((planet, pIdx) => {
                      const totalPlanets = hData.planets.length;
                      // Stagger planets around center position
                      const yOffset = (pIdx - (totalPlanets - 1) / 2) * 14;
                      const xPos = cfg.planetsPos.x;
                      const yPos = cfg.planetsPos.y + yOffset;

                      return (
                        <g key={planet.key} transform={`translate(${xPos}, ${yPos})`}>
                          {/* Planet badge pill */}
                          <rect
                            x="-19"
                            y="-6.5"
                            width="38"
                            height="13"
                            rx="3"
                            fill="rgba(15, 23, 42, 0.85)"
                            stroke={planet.isRetrograde ? '#EF4444' : '#F59E0B'}
                            strokeWidth="0.8"
                          />
                          <text
                            x="0"
                            y="0.5"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={planet.isRetrograde ? '#FCA5A5' : '#FEF08A'}
                            fontSize="9"
                            fontWeight="600"
                            fontFamily="sans-serif"
                          >
                            {planet.nameHi}
                            {planet.isRetrograde ? '(व)' : ''}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 text-center text-[11px] text-amber-200/50">
        💡 किसी भी भाव (घर) पर टैप करके उसका विस्तृत फल एवं स्वामी देखें।
      </div>
    </div>
  );
};
