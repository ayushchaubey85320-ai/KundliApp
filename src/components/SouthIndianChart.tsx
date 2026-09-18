import React from 'react';
import { HouseData } from '../astrology/kundliEngine';
import { RASHIS } from '../astrology/constants';

interface SouthIndianChartProps {
  houses: HouseData[];
  lagnaRashiId: number; // 1 to 12
  chartTitle?: string;
}

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  houses,
  lagnaRashiId,
  chartTitle = 'दक्षिण भारतीय कुंडली (South Indian)',
}) => {
  // Fixed box positions for the 12 signs (clockwise from Pisces at row 0, col 0):
  // (col, row) on a 4x4 grid:
  // [Pisces(12) 0,0] [Aries(1) 1,0]   [Taurus(2) 2,0]    [Gemini(3) 3,0]
  // [Aquarius(11)0,1] [  EMPTY 1,1  ] [  EMPTY 2,1  ]     [Cancer(4) 3,1]
  // [Capric.(10) 0,2] [  EMPTY 1,2  ] [  EMPTY 2,2  ]     [Leo(5) 3,2]
  // [Sagitt.(9)  0,3] [Scorpio(8) 1,3][Libra(7) 2,3]     [Virgo(6) 3,3]

  const signGridMap: Record<number, { col: number; row: number }> = {
    12: { col: 0, row: 0 },
    1:  { col: 1, row: 0 },
    2:  { col: 2, row: 0 },
    3:  { col: 3, row: 0 },
    4:  { col: 3, row: 1 },
    5:  { col: 3, row: 2 },
    6:  { col: 3, row: 3 },
    7:  { col: 2, row: 3 },
    8:  { col: 1, row: 3 },
    9:  { col: 0, row: 3 },
    10: { col: 0, row: 2 },
    11: { col: 0, row: 1 },
  };

  // Find planets residing in each Rashi
  const planetsByRashi = new Map<number, HouseData['planets']>();
  houses.forEach((h) => {
    planetsByRashi.set(h.rashi.id, h.planets);
  });

  return (
    <div className="w-full max-w-[420px] mx-auto bg-[#0d121f] p-3 rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-900/10">
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-amber-300 font-semibold tracking-wide text-sm flex items-center gap-1.5">
          <span className="text-base">☸</span> {chartTitle}
        </h3>
        <span className="text-[11px] text-amber-200/60 font-sans">दक्षिण भारतीय पद्धति</span>
      </div>

      <div className="relative aspect-square w-full">
        <svg viewBox="0 0 400 400" className="w-full h-full select-none">
          <defs>
            <linearGradient id="southBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B0E17" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <linearGradient id="southStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Outer Border */}
          <rect x="4" y="4" width="392" height="392" fill="url(#southBg)" stroke="url(#southStroke)" strokeWidth="2.5" rx="4" />

          {/* Grid lines (4 cols, 4 rows = 100px each cell) */}
          {/* Vertical lines */}
          <line x1="100" y1="4" x2="100" y2="396" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="200" y1="4" x2="200" y2="100" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="200" y1="300" x2="200" y2="396" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="300" y1="4" x2="300" y2="396" stroke="url(#southStroke)" strokeWidth="1.2" />

          {/* Horizontal lines */}
          <line x1="4" y1="100" x2="396" y2="100" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="4" y1="200" x2="100" y2="200" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="300" y1="200" x2="396" y2="200" stroke="url(#southStroke)" strokeWidth="1.2" />
          <line x1="4" y1="300" x2="396" y2="300" stroke="url(#southStroke)" strokeWidth="1.2" />

          {/* Central Center Box (200x200) */}
          <rect x="100" y="100" width="200" height="200" fill="#090D16" />
          <text x="200" y="195" textAnchor="middle" fill="#FBBF24" fontSize="15" fontWeight="700" fontFamily="serif">
            वैदिक कुंडली
          </text>
          <text x="200" y="215" textAnchor="middle" fill="rgba(245, 158, 11, 0.6)" fontSize="11" fontFamily="sans-serif">
            पं. संजय चौबे
          </text>

          {/* Render 12 Rashi Boxes */}
          {RASHIS.map((rashi) => {
            const grid = signGridMap[rashi.id];
            const x = grid.col * 100;
            const y = grid.row * 100;
            const isLagna = rashi.id === lagnaRashiId;
            const planets = planetsByRashi.get(rashi.id) || [];

            return (
              <g key={rashi.id} transform={`translate(${x}, ${y})`}>
                {/* Lagna Diagonal Marking */}
                {isLagna && (
                  <line x1="4" y1="4" x2="96" y2="96" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                )}

                {/* Sign Name / Number */}
                <text x="8" y="16" fill="rgba(251, 191, 36, 0.7)" fontSize="10" fontWeight="700">
                  {rashi.nameHi}
                </text>

                {isLagna && (
                  <rect x="62" y="6" width="32" height="13" rx="2" fill="#EF4444" opacity="0.9" />
                )}
                {isLagna && (
                  <text x="78" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">
                    लग्न
                  </text>
                )}

                {/* Planets in this Rashi */}
                {planets.map((planet, pIdx) => {
                  const py = 32 + pIdx * 15;
                  return (
                    <text
                      key={planet.key}
                      x="10"
                      y={py}
                      fill={planet.isRetrograde ? '#F87171' : '#FDE047'}
                      fontSize="9.5"
                      fontWeight="600"
                    >
                      {planet.nameHi} {planet.isRetrograde ? '(व)' : ''}
                    </text>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
