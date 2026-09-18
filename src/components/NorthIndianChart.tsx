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
  // House 1: Top diamond (Centroid: 200, 100)
  // House 2: Top-left triangle (Centroid: 100, 33)
  // House 3: Upper-left side triangle (Centroid: 33, 100)
  // House 4: Left diamond (Centroid: 100, 200)
  // House 5: Lower-left side triangle (Centroid: 33, 300)
  // House 6: Bottom-left triangle (Centroid: 100, 367)
  // House 7: Bottom diamond (Centroid: 200, 300)
  // House 8: Bottom-right triangle (Centroid: 300, 367)
  // House 9: Lower-right side triangle (Centroid: 367, 300)
  // House 10: Right diamond (Centroid: 300, 200)
  // House 11: Upper-right side triangle (Centroid: 367, 100)
  // House 12: Top-right triangle (Centroid: 300, 33)

  const houseConfig: Record<
    number,
    {
      polygon: string;
      rashiPos: { x: number; y: number };
      planetAnchor: { x: number; y: number };
      layout: 'vertical' | 'horizontal';
    }
  > = {
    1: {
      polygon: '200,2 300,100 200,200 100,100',
      rashiPos: { x: 200, y: 168 },
      planetAnchor: { x: 200, y: 82 },
      layout: 'vertical',
    },
    2: {
      polygon: '2,2 200,2 100,100',
      rashiPos: { x: 100, y: 78 },
      planetAnchor: { x: 90, y: 35 },
      layout: 'horizontal',
    },
    3: {
      polygon: '2,2 100,100 2,200',
      rashiPos: { x: 78, y: 100 },
      planetAnchor: { x: 38, y: 80 },
      layout: 'vertical',
    },
    4: {
      polygon: '2,200 100,100 200,200 100,300',
      rashiPos: { x: 168, y: 200 },
      planetAnchor: { x: 82, y: 200 },
      layout: 'vertical',
    },
    5: {
      polygon: '2,200 100,300 2,398',
      rashiPos: { x: 78, y: 300 },
      planetAnchor: { x: 38, y: 320 },
      layout: 'vertical',
    },
    6: {
      polygon: '2,398 100,300 200,398',
      rashiPos: { x: 100, y: 322 },
      planetAnchor: { x: 90, y: 365 },
      layout: 'horizontal',
    },
    7: {
      polygon: '200,200 300,300 200,398 100,300',
      rashiPos: { x: 200, y: 232 },
      planetAnchor: { x: 200, y: 318 },
      layout: 'vertical',
    },
    8: {
      polygon: '200,398 300,300 398,398',
      rashiPos: { x: 300, y: 322 },
      planetAnchor: { x: 310, y: 365 },
      layout: 'horizontal',
    },
    9: {
      polygon: '398,200 398,398 300,300',
      rashiPos: { x: 322, y: 300 },
      planetAnchor: { x: 362, y: 320 },
      layout: 'vertical',
    },
    10: {
      polygon: '200,200 300,100 398,200 300,300',
      rashiPos: { x: 232, y: 200 },
      planetAnchor: { x: 318, y: 200 },
      layout: 'vertical',
    },
    11: {
      polygon: '398,2 398,200 300,100',
      rashiPos: { x: 322, y: 100 },
      planetAnchor: { x: 362, y: 80 },
      layout: 'vertical',
    },
    12: {
      polygon: '200,2 398,2 300,100',
      rashiPos: { x: 300, y: 78 },
      planetAnchor: { x: 310, y: 35 },
      layout: 'horizontal',
    },
  };

  return (
    <div className="w-full max-w-[430px] mx-auto select-none">
      {chartTitle && (
        <div className="text-center py-1.5 text-xs font-bold text-amber-300 tracking-wider">
          {chartTitle}
        </div>
      )}

      <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-amber-500/40 bg-[#090D16]">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full cursor-pointer"
          style={{ background: '#090D16' }}
        >
          {/* Defs for gradients & filters */}
          <defs>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#F59E0B" floodOpacity="0.6" />
            </filter>
            <filter id="textHalo" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Interactive House Click Zones with Hover & Selection Highlight */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const cfg = houseConfig[houseNum];
            const isSelected = selectedHouse === houseNum;
            return (
              <polygon
                key={`poly-${houseNum}`}
                points={cfg.polygon}
                fill={isSelected ? 'rgba(245, 158, 11, 0.22)' : 'transparent'}
                stroke="none"
                onClick={() => onSelectHouse && onSelectHouse(houseNum)}
                className="hover:fill-amber-500/10 transition-colors"
              />
            );
          })}

          {/* Outer Border with crisp classical gold double-frame */}
          <rect
            x="2"
            y="2"
            width="396"
            height="396"
            fill="none"
            stroke="#D97706"
            strokeWidth="3"
          />
          <rect
            x="5"
            y="5"
            width="390"
            height="390"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Main Diagonal Lines */}
          <line x1="2" y1="2" x2="398" y2="398" stroke="#D97706" strokeWidth="2" />
          <line x1="398" y1="2" x2="2" y2="398" stroke="#D97706" strokeWidth="2" />

          {/* Center Rhombus connecting (200, 2) - (398, 200) - (200, 398) - (2, 200) */}
          <polygon
            points="200,2 398,200 200,398 2,200"
            fill="none"
            stroke="#D97706"
            strokeWidth="2"
          />

          {/* Render 12 Houses (Rashi Numbers and Planets) */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
            const hData = houseMap.get(houseNum);
            const cfg = houseConfig[houseNum];
            const isSelected = selectedHouse === houseNum;
            const isLagnaHouse = houseNum === 1;

            return (
              <g
                key={`house-content-${houseNum}`}
                onClick={() => onSelectHouse && onSelectHouse(houseNum)}
                className="pointer-events-none select-none"
              >
                {/* Selection Indicator Ring */}
                {isSelected && (
                  <circle
                    cx={cfg.rashiPos.x}
                    cy={cfg.rashiPos.y}
                    r="18"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    filter="url(#goldGlow)"
                  />
                )}

                {/* Rashi Number in House (crisp, elegant, readable white/ivory text) */}
                {hData && (
                  <text
                    x={cfg.rashiPos.x}
                    y={cfg.rashiPos.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#F1F5F9"
                    fontSize="17"
                    fontWeight="700"
                    fontFamily="serif"
                    filter="url(#textHalo)"
                  >
                    {hData.rashi.id}
                  </text>
                )}

                {/* Lagna (ल) in House 1 */}
                {isLagnaHouse && lagnaData && (
                  <text
                    x={cfg.planetAnchor.x}
                    y={cfg.planetAnchor.y - (hData && hData.planets.length > 0 ? 17 : 0)}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#F59E0B"
                    fontSize="16"
                    fontWeight="800"
                    fontFamily="sans-serif"
                    filter="url(#goldGlow)"
                  >
                    {lagnaData.displayTag}
                  </text>
                )}

                {/* Occupying Planets */}
                {hData && hData.planets.length > 0 && (
                  <g>
                    {hData.planets.map((planet: CalculatedPlanet, pIdx: number) => {
                      const total = hData.planets.length;
                      let px = cfg.planetAnchor.x;
                      let py = cfg.planetAnchor.y;

                      if (isLagnaHouse) {
                        // In house 1, shift planets slightly down from Lagna tag
                        py = cfg.planetAnchor.y + 16 + pIdx * 17;
                      } else if (cfg.layout === 'horizontal' && total > 1) {
                        // Horizontal spread for top/bottom triangles
                        const spacing = 38;
                        px = cfg.planetAnchor.x + (pIdx - (total - 1) / 2) * spacing;
                      } else {
                        // Vertical spread
                        const spacing = 17;
                        py = cfg.planetAnchor.y + (pIdx - (total - 1) / 2) * spacing;
                      }

                      return (
                        <text
                          key={planet.key}
                          x={px}
                          y={py}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={planet.chartColor}
                          fontSize="14.5"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          filter="url(#textHalo)"
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
