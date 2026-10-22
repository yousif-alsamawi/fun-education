import React from 'react';
import { StudioState } from '../../types/studio';
import { getCalendarData, DAY_HEADERS_COMPACT } from '../../utils/calendarUtils';
import { ArtworkPatterns } from './ArtworkPatterns';

interface CalendarTagPieceProps {
  state: StudioState;
}

/**
 * Template 3: كرت تقويم المناسبة (Save-the-Date Calendar Tag - Updated with Multi-Layer Colors)
 * - Base Tag Color: state.cardBaseColor
 * - Wax Seal Medallion: state.secondaryPieceColor / state.artworkColor
 * - Calendar Grid & Heart Marker: state.textColor / state.artworkColor
 * - Artwork Pattern: state.artworkPatternStyle
 */
export const CalendarTagPiece: React.FC<CalendarTagPieceProps> = ({ state }) => {
  const calendarData = getCalendarData(state.selectedIsoDate || '2026-09-19');

  const tagLeft = 110;
  const tagRight = 490;
  const tagTop = 50;
  const tagBottom = 770;
  const notchSize = 24;

  const notchedTagPath = `
    M ${tagLeft + notchSize}, ${tagTop}
    L ${tagRight - notchSize}, ${tagTop}
    L ${tagRight}, ${tagTop + notchSize}
    L ${tagRight}, ${tagBottom - notchSize}
    L ${tagRight - notchSize}, ${tagBottom}
    L ${tagLeft + notchSize}, ${tagBottom}
    L ${tagLeft}, ${tagBottom - notchSize}
    L ${tagLeft}, ${tagTop + notchSize}
    Z
  `;

  const eyeletX = 300;
  const eyeletY = 85;
  const eyeletRadius = 4.5;

  const calStartX = 150;
  const calStartY = 430;
  const colWidth = 43;
  const rowHeight = 30;

  let heartX: number | null = null;
  let heartY: number | null = null;

  calendarData.weeks.forEach((week, rowIndex) => {
    week.forEach((day, colIndex) => {
      if (day === calendarData.selectedDay) {
        heartX = calStartX + colIndex * colWidth + colWidth / 2;
        heartY = calStartY + 50 + rowIndex * rowHeight;
      }
    });
  });

  const cardBase = state.cardBaseColor || '#FAF9F6';
  const artworkCol = state.artworkColor || '#A89F91';
  const secondaryCol = state.secondaryPieceColor || '#EFECE6';
  const textCol = state.textColor || '#333333';

  return (
    <g id="template-calendar-tag" className="template-calendar-tag">
      {/* 
        ========================================================================
        LAYER 0: Paper Tag Backdrop (Mockup & Print)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-paper-backdrop">
          {/* Main Notched Tag Base Fill (Layer 1: Card Base Color) */}
          <path
            d={notchedTagPath}
            fill={cardBase}
            filter={state.activeLayerMode === 'mockup' ? 'url(#card-drop-shadow)' : undefined}
          />
          {state.activeLayerMode === 'mockup' && (
            <path
              d={notchedTagPath}
              fill="url(#paper-texture-pattern)"
              opacity="0.4"
            />
          )}
          {/* Inner hairline border */}
          <path
            d={notchedTagPath}
            fill="none"
            stroke="url(#dynamic-artwork-gradient)"
            strokeWidth="1.2"
            transform="scale(0.96) translate(12, 16)"
            opacity="0.75"
          />
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 1: Artwork Layer (Artwork Patterns & Wax Seal)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-artwork">
          {/* DYNAMIC PATTERN STYLE */}
          <ArtworkPatterns
            patternStyle={state.artworkPatternStyle || 'vintage-baroque'}
            artworkColor={artworkCol}
            artworkGradientEnd={state.artworkGradientEnd}
            accentColor={artworkCol}
            templateId={state.activeTemplateId}
          />

          {/* WAX SEAL MEDALLION (Layer 3: Secondary Piece Color) */}
          <g id="wax-seal" transform="translate(300, 140)">
            <path
              d="
                M 0,-34
                C 15,-36 28,-28 35,-15
                C 42,-2 38,18 28,28
                C 18,38 -2,42 -18,36
                C -32,30 -40,15 -38,-2
                C -36,-18 -25,-32 0,-34
                Z
              "
              fill={secondaryCol}
              stroke={artworkCol}
              strokeWidth="0.8"
              filter={state.activeLayerMode === 'mockup' ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' : undefined}
            />
            <circle cx="0" cy="0" r="22" fill="none" stroke={artworkCol} strokeWidth="0.8" opacity="0.7" />
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily="Playfair Display, serif"
              fontSize="16"
              fontWeight="bold"
              letterSpacing="1"
            >
              {state.monogram.text || 'S&K'}
            </text>
          </g>

          {/* "SAVE THE DATE" Subtitle */}
          <text
            x="300"
            y="210"
            textAnchor="middle"
            fill={artworkCol}
            fontFamily="Playfair Display, serif"
            fontSize="12"
            letterSpacing="5"
            fontWeight="600"
          >
            ✦ SAVE THE DATE ✦
          </text>

          {/* Dividing Flourish lines */}
          <g stroke={artworkCol} strokeWidth="0.8" opacity="0.6">
            <line x1="160" y1="345" x2="440" y2="345" />
            <circle cx="300" cy="345" r="3" fill={artworkCol} />
            <line x1="160" y1="415" x2="440" y2="415" />
          </g>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 2: Text Layer (Names, Greeting, Calendar Grid & Heart Marker)
        ========================================================================
      */}
      {(state.activeLayerMode === 'mockup' || state.activeLayerMode === 'print') && (
        <g id="layer-text">
          {/* Main Names */}
          <text
            x="300"
            y="275"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.names.fontFamily}
            fontSize={state.names.fontSize}
            fontWeight={state.names.isBold ? 'bold' : 'normal'}
            letterSpacing={state.names.letterSpacing}
          >
            {state.names.text}
          </text>

          {/* Main Greeting Quote */}
          <text
            x="300"
            y="320"
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.greeting.fontFamily}
            fontSize={state.greeting.fontSize}
            letterSpacing={state.greeting.letterSpacing}
          >
            {state.greeting.text}
          </text>

          {/* DYNAMIC MONTH & YEAR HEADER */}
          <g id="calendar-header" transform="translate(300, 385)">
            <text
              x="0"
              y="0"
              textAnchor="middle"
              fill={textCol}
              fontFamily="Cairo, sans-serif"
              fontSize="16"
              fontWeight="bold"
              letterSpacing="1"
            >
              {calendarData.monthNameAr} {calendarData.year}
            </text>
            <text
              x="0"
              y="18"
              textAnchor="middle"
              fill={artworkCol}
              fontFamily="Playfair Display, serif"
              fontSize="10"
              letterSpacing="3"
            >
              {calendarData.monthNameEn}
            </text>
          </g>

          {/* DAY HEADERS */}
          <g id="calendar-days-of-week">
            {DAY_HEADERS_COMPACT.map((dayHead, i) => {
              const xPos = calStartX + i * colWidth + colWidth / 2;
              return (
                <text
                  key={`head-${i}`}
                  x={xPos}
                  y={calStartY + 25}
                  textAnchor="middle"
                  fill={artworkCol}
                  fontFamily="Cairo, sans-serif"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {dayHead}
                </text>
              );
            })}
          </g>

          {/* DAY NUMBERS */}
          <g id="calendar-days-numbers">
            {calendarData.weeks.map((week, rIndex) => (
              <g key={`week-${rIndex}`}>
                {week.map((dayNum, cIndex) => {
                  if (!dayNum) return null;
                  const xPos = calStartX + cIndex * colWidth + colWidth / 2;
                  const yPos = calStartY + 55 + rIndex * rowHeight;
                  const isSelected = dayNum === calendarData.selectedDay;

                  return (
                    <text
                      key={`day-${rIndex}-${cIndex}`}
                      x={xPos}
                      y={yPos}
                      textAnchor="middle"
                      fill={isSelected ? artworkCol : textCol}
                      fontFamily="Cairo, sans-serif"
                      fontSize={isSelected ? '14' : '12'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {dayNum}
                    </text>
                  );
                })}
              </g>
            ))}
          </g>

          {/* DELICATE VECTOR HEART SHAPE AROUND SELECTED DAY NUMBER */}
          {heartX !== null && heartY !== null && (
            <g id="selected-day-heart" transform={`translate(${heartX}, ${heartY - 4})`}>
              <path
                d="
                  M 0, -4
                  C -4, -12 -16, -10 -16, 2
                  C -16, 11 0, 19 0, 22
                  C 0, 22 16, 11 16, 2
                  C 16, -10 4, -12 0, -4
                  Z
                "
                fill="none"
                stroke={artworkCol}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 1px 3px rgba(0,0,0,0.3))"
              />
            </g>
          )}

          {/* Bottom Location Note */}
          <text
            x="300"
            y={tagBottom - 45}
            textAnchor="middle"
            fill={textCol}
            fontFamily={state.location.fontFamily}
            fontSize={state.location.fontSize}
            letterSpacing={state.location.letterSpacing}
            opacity="0.9"
          >
            {state.location.text}
          </text>
        </g>
      )}

      {/* 
        ========================================================================
        LAYER 4: Cut Lines / Dieline Layer (Plotter Cameo/Skycut Hairline)
        ========================================================================
      */}
      {(state.activeLayerMode === 'cut' || state.activeLayerMode === 'mockup') && (
        <g id="layer-cut-lines-calendar-tag" opacity={state.activeLayerMode === 'cut' ? 1 : 0.45}>
          <path
            d={notchedTagPath}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth={state.activeLayerMode === 'cut' ? '0.75' : '1'}
            strokeDasharray={state.activeLayerMode === 'mockup' ? '4, 4' : 'none'}
          />
          <circle
            cx={eyeletX}
            cy={eyeletY}
            r={eyeletRadius}
            fill="none"
            stroke={state.dielineStrokeColor}
            strokeWidth="0.75"
          />
        </g>
      )}
    </g>
  );
};
