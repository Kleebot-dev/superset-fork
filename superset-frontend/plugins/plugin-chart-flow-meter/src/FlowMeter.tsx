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
import { FlowMeterChartProps, FlowMeterStylesProps } from './types';

const Styles = styled.div<FlowMeterStylesProps>`
  align-items: center;
  display: flex;
  height: ${({ height }) => height}px;
  justify-content: center;
  overflow: hidden;
  width: ${({ width }) => width}px;

  figure {
    height: 100%;
    margin: 0;
    width: 100%;
  }

  .flow-line {
    animation: flow 1.25s linear infinite;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -48;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .flow-line {
      animation: none;
    }
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

export default function FlowMeter({
  formattedValue,
  height,
  metricName,
  unit,
  width,
}: FlowMeterChartProps) {
  const theme = useTheme();
  const accessibleValue = unit ? `${formattedValue} ${unit}` : formattedValue;
  const accessibleLabel = `${metricName}: ${accessibleValue}`;
  const valueFontSize =
    formattedValue.length <= 8
      ? 64
      : formattedValue.length <= 12
        ? 50
        : formattedValue.length <= 16
          ? 40
          : 30;
  const compactMetricName = metricName.length > 28;
  const compactUnit = unit.length > 22;

  return (
    <Styles height={height} width={width}>
      <figure aria-label={accessibleLabel}>
        <svg
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 640 560"
        >
          <title>{accessibleLabel}</title>

          <rect
            fill={theme.colorPrimaryBg}
            height="92"
            stroke={theme.colorText}
            strokeWidth="12"
            width="430"
            x="105"
            y="432"
          />
          <line
            className="flow-line"
            stroke={theme.colorPrimary}
            strokeDasharray="24 24"
            strokeLinecap="round"
            strokeWidth="28"
            x1="122"
            x2="518"
            y1="478"
            y2="478"
          />
          <rect
            fill={theme.colorPrimaryBg}
            height="136"
            rx="16"
            stroke={theme.colorText}
            strokeWidth="12"
            width="92"
            x="35"
            y="410"
          />
          <rect
            fill={theme.colorPrimaryBg}
            height="136"
            rx="16"
            stroke={theme.colorText}
            strokeWidth="12"
            width="92"
            x="513"
            y="410"
          />

          <rect
            fill={theme.colorPrimaryBg}
            height="82"
            stroke={theme.colorText}
            strokeWidth="12"
            width="92"
            x="274"
            y="362"
          />

          <circle
            cx="320"
            cy="212"
            fill={theme.colorBgContainer}
            r="204"
            stroke={theme.colorText}
            strokeWidth="12"
          />
          <circle
            cx="320"
            cy="212"
            fill={theme.colorPrimaryBg}
            r="180"
            stroke={theme.colorPrimary}
            strokeWidth="18"
          />
          <circle
            cx="320"
            cy="212"
            fill={theme.colorBgContainer}
            r="154"
            stroke={theme.colorText}
            strokeWidth="8"
          />

          <rect
            fill={theme.colorPrimaryBg}
            height="160"
            rx="18"
            stroke={theme.colorText}
            strokeWidth="8"
            width="340"
            x="150"
            y="88"
          />
          <text
            dominantBaseline="middle"
            fill={theme.colorText}
            fontFamily={theme.fontFamily}
            fontSize={valueFontSize}
            fontWeight="bold"
            textAnchor="middle"
            x="320"
            y={unit ? 140 : 148}
          >
            {formattedValue}
          </text>
          {unit && (
            <text
              dominantBaseline="middle"
              fill={theme.colorTextSecondary}
              fontFamily={theme.fontFamily}
              fontSize="24"
              lengthAdjust="spacingAndGlyphs"
              textAnchor="middle"
              textLength={compactUnit ? 260 : undefined}
              x="320"
              y="202"
            >
              {unit}
            </text>
          )}

          <text
            dominantBaseline="middle"
            fill={theme.colorTextSecondary}
            fontFamily={theme.fontFamily}
            fontSize="24"
            lengthAdjust="spacingAndGlyphs"
            textAnchor="middle"
            textLength={compactMetricName ? 300 : undefined}
            x="320"
            y="292"
          >
            {metricName}
          </text>
        </svg>
      </figure>
    </Styles>
  );
}
