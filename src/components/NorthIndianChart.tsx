import React from 'react';
import { HouseData, CalculatedPlanet } from '../astrology/kundliEngine';

interface NorthIndianChartProps {
  houses: HouseData[];
  lagnaData?: {
    displayTag: string;
    deg: number;
    degSuperscript: string;
  };
  chartTitle?: string;
  onSelectHouse?: (houseNumber: number) => void;
  selectedHouse?: number | null;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  houses,
  lagnaData,
  chartTitle,
  onSelectHouse,
  selectedHouse,
}) => {
  const houseMap = new Map<number, HouseData>();
  houses.forEach((h) => houseMap.set(h.houseNumber, h));

  // Geometrical layout on a 400x400 SVG matching classical North Indian Kundli:
  // House 1: Top diamond
  // House 2: Top-left triangle
  // House 3: Upper-left outer triangle
  // House 4: Left diamond
  // House 5: Lower-left outer triangle
  // House 6: Bottom-left triangle
  // House 7: Bottom diamond
  // House 8: Bottom-right triangle
  // House 9: Lower-right outer triangle
  // House 10: Right diamond
  // House 11: Upper-right outer triangle
  // House 12: Top-right triangle

  const houseConfig: Record<
    number,
    {
      rashiPos: { x: number; y: number };
      planetAnchor: { x: number; y: number };
      align: 'start' | 'middle' | 'end';
    }
  > = {
    1: {
      rashiPos: { x: 200, y: 180 },
      planetAnchor: { x: 200, y: 125 },
      align: 'middle',
    },
    2: {
      rashiPos: { x: 100, y: 130 },
      planetAnchor: { x: 80, y: 80 },
      align: 'middle',
    },
    3: {
      rashiPos: { x: 95, y: 190 },
      planetAnchor: { x: 55, y: 165 },
      align: 'middle',
    },
    4: {
      rashiPos: { x: 180, y: 200 },
      planetAnchor: { x: 105, y: 200 },
      align: 'middle',
    },
    5: {
      rashiPos: { x: 95, y: 285 },
      planetAnchor: { x: 45, y: 260 },
      align: 'middle',
    },
    6: {
      rashiPos: { x: 100, y: 310 },
      planetAnchor: { x: 80, y: 350 },
      align: 'middle',
    },
    7: {
      rashiPos: { x: 200, y: 240 },
      planetAnchor: { x: 200, y: 310 },
      align: 'middle',
    },
    8: {
      rashiPos: { x: 300, y: 310 },
      planetAnchor: { x: 320, y: 350 },
      align: 'middle',
    },
    9: {
      rashiPos: { x: 305, y: 285 },
      planetAnchor: { x: 355, y: 260 },
      align: 'middle',
    },
    10: {
      rashiPos: { x: 220, y: 200 },
      planetAnchor: { x: 295, y: 200 },
      align: 'middle',
    },
    11: {
      rashiPos: { x: 305, y: 130 },
      planetAnchor: { x: 345, y: 165 },
      align: 'middle',
    },
    12: {
      rashiPos: { x: 300, y: 130 },
      planetAnchor: { x: 320, y: 80 },
      align: 'middle',
    },
  };

  return (
    <div className="w-full max-w-[430px] mx-auto bg-[#181A1B] select-none">
      {chartTitle && (
        <div className="text-center py-1 text-xs font-bold text-amber-300">
          {chartTitle}
        </div>
      )}

      <div className="relative aspect-square w-full">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full cursor-pointer"
          style={{ background: '#181A1B' }}
        >
          {/* Outer Border with crisp gold line */}
          <rect
            x="2"
            y="2"
            width="396"
            height="396"
            fill="#181A1B"
            stroke="#FBBF24"
            strokeWidth="2.5"
          />

          {/* Main Diagonal Lines */}
          <line x1="2" y1="2" x2="398" y2="398" stroke="#FBBF24" strokeWidth="2" />
          <line x1="398" y1="2" x2="2" y2="398" stroke="#FBBF24" strokeWidth="2" />

          {/* Inner Diamond connecting (200, 2) - (398, 200) - (200, 398) - (2, 200) */}
          <polygon
            points="200,2 398,200 200,398 2,200"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
          />

          {/* Render 12 Houses */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const hData = houseMap.get(houseNum);
            const cfg = houseConfig[houseNum];
            const isSelected = selectedHouse === houseNum;

            // In house 1, Lagna (ल) is also rendered
            const isLagnaHouse = houseNum === 1;

            return (
              <g
                key={houseNum}
                onClick={() => onSelectHouse && onSelectHouse(houseNum)}
                className="transition-opacity hover:opacity-90"
              >
                {/* Selection Glow */}
                {isSelected && (
                  <circle
                    cx={cfg.rashiPos.x}
                    cy={cfg.rashiPos.y}
                    r="22"
                    fill="rgba(245, 158, 11, 0.25)"
                  />
                )}

                {/* Rashi Number in House Center (matching screenshot: crisp, white/gray text) */}
                {hData && (
                  <text
                    x={cfg.rashiPos.x}
                    y={cfg.rashiPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#D1D5DB"
                    fontSize="18"
                    fontWeight="500"
                    fontFamily="sans-serif"
                  >
                    {hData.rashi.id}
                  </text>
                )}

                {/* Lagna (ल) in House 1 */}
                {isLagnaHouse && lagnaData && (
                  <text
                    x={cfg.planetAnchor.x}
                    y={cfg.planetAnchor.y - (hData && hData.planets.length > 0 ? 18 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FBBF24"
                    fontSize="16"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {lagnaData.displayTag}
                  </text>
                )}

                {/* Occupying Planets (matching screenshot formatting e.g. मं▫²⁷, च¹³, रा*▫¹⁵) */}
                {hData && hData.planets.length > 0 && (
                  <g>
                    {hData.planets.map((planet: CalculatedPlanet, pIdx: number) => {
                      const total = hData.planets.length;
                      const yOffset = (pIdx - (total - 1) / 2) * 18;
                      const py = cfg.planetAnchor.y + yOffset;

                      return (
                        <text
                          key={planet.key}
                          x={cfg.planetAnchor.x}
                          y={py}
                          textAnchor={cfg.align}
                          dominantBaseline="central"
                          fill={planet.chartColor}
                          fontSize="15"
                          fontWeight="700"
                          fontFamily="sans-serif"
                        >
                          {planet.displayTag}
                        </text>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
