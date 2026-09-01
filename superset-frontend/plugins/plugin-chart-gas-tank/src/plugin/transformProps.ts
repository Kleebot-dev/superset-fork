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

import { ChartProps, DataRecord, getMetricLabel } from '@superset-ui/core';
import { GasTankChartProps, GasTankFormData } from '../types';

export default function transformProps(
  chartProps: ChartProps<GasTankFormData>,
): GasTankChartProps {
  const { width, height, formData, queriesData } = chartProps;
  const { metric } = formData as GasTankFormData;
  const metricName = getMetricLabel(metric);
  const queryData = queriesData[0]?.data;
  const firstRecord = Array.isArray(queryData)
    ? (queryData[0] as DataRecord | undefined)
    : undefined;
  const rawPercentage = firstRecord?.[metricName];
  const numericPercentage = Number(rawPercentage);

  return {
    width,
    height,
    metricName,
    percentage: Number.isFinite(numericPercentage) ? numericPercentage : 0,
  };
}
