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

import { supersetTheme } from '@apache-superset/core/theme';
import { ChartProps } from '@superset-ui/core';
import transformProps from '../src/plugin/transformProps';
import { FlowMeterFormData } from '../src/types';

const formData: FlowMeterFormData = {
  datasource: '3__table',
  metric: 'sum__flow',
  number_format: ',.1f',
  unit: ' L/min ',
  viz_type: 'kleebot-flow-meter',
};

test('formats selected metric and exposes configured unit', () => {
  const chartProps = new ChartProps<FlowMeterFormData>({
    formData,
    height: 600,
    queriesData: [{ data: [{ sum__flow: 1248.25 }] }],
    theme: supersetTheme,
    width: 800,
  });

  expect(transformProps(chartProps)).toEqual({
    formattedValue: '1,248.3',
    height: 600,
    metricName: 'sum__flow',
    unit: 'L/min',
    width: 800,
  });
});

test('uses zero when query has no numeric value', () => {
  const chartProps = new ChartProps<FlowMeterFormData>({
    formData,
    height: 600,
    queriesData: [{ data: [] }],
    theme: supersetTheme,
    width: 800,
  });

  expect(transformProps(chartProps).formattedValue).toBe('0.0');
});
