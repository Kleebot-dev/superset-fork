/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { styled, useTheme } from '@apache-superset/core/theme';
import { useId } from 'react';
import { GasTankChartProps, GasTankStylesProps } from './types';

const Styles = styled.div<GasTankStylesProps>`
  align-items: center;
  display: flex;
  height: ${({ height }) => height}px;
  justify-content: center;
  overflow: hidden;
  width: ${({ width }) => width}px;

  .tank {
    height: 100%;
    margin: 0;
    width: 100%;
  }

  .wave-scroll {
    animation: move-waves 5s linear infinite;
  }

  @keyframes move-waves {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-500px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .wave-scroll {
      animation: none;
    }
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export default function Tank({
  height,
  metricName,
  percentage,
  width,
}: GasTankChartProps) {
  const theme = useTheme();
  const identifier = useId().replace(/:/gu, '');
  const clipPathId = `horizontal-tank-clip-${identifier}`;
  const gradientId = `water-gradient-${identifier}`;
  const boundedPercentage = Math.min(100, Math.max(0, percentage));
  const translateY = 200 * (1 - boundedPercentage / 100);
  const accessibleLabel = `${metricName}: ${boundedPercentage}%`;

  return (
    <Styles height={height} width={width}>
      <figure aria-label={accessibleLabel} className="tank">
        <svg
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          viewBox="-20 -40 540 300"
        >
          <title>{accessibleLabel}</title>
          <defs>
            <clipPath id={clipPathId}>
              <path d="M 50,0 H 450 A 40,40 0 0 1 490,40 V 160 A 40,40 0 0 1 450,200 H 50 A 40,40 0 0 1 10,160 V 40 A 40,40 0 0 1 50,0 Z" />
            </clipPath>
            <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor={theme.colorWarningBg} />
              <stop offset="50%" stopColor={theme.colorWarning} />
              <stop offset="100%" stopColor={theme.colorWarningActive} />
            </linearGradient>
          </defs>

          <rect
            fill="none"
            height="20"
            rx="0"
            stroke={theme.colorText}
            strokeWidth="3"
            width="40"
            x="110"
            y="-21"
          />
          <rect
            fill="none"
            height="15"
            rx="5"
            stroke={theme.colorText}
            strokeWidth="3"
            width="70"
            x="95"
            y="-36"
          />

          <g clipPath={`url(#${clipPathId})`}>
            <g transform={`translate(0, ${translateY})`}>
              <g className="wave-scroll">
                <path
                  d="M0,0 C125,-30 375,30 500,0 V280 H0 Z"
                  fill={`url(#${gradientId})`}
                />
                <path
                  d="M0,0 C125,-30 375,30 500,0 V280 H0 Z"
                  fill={`url(#${gradientId})`}
                  transform="translate(499,0)"
                />
              </g>
            </g>
          </g>

          <text
            dominantBaseline="middle"
            fill={theme.colorText}
            fontFamily={theme.fontFamily}
            fontSize="36"
            fontWeight="bold"
            textAnchor="middle"
            x="250"
            y="105"
          >
            {boundedPercentage}%
          </text>

          <path
            d="M 50,0 H 450 A 40,40 0 0 1 490,40 V 160 A 40,40 0 0 1 450,200 H 50 A 40,40 0 0 1 10,160 V 40 A 40,40 0 0 1 50,0 Z"
            fill="none"
            stroke={theme.colorText}
            strokeWidth="4"
          />
        </svg>
      </figure>
    </Styles>
  );
}
