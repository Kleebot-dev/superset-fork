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
import { GasTankFormData } from '../src/types';

const formData: GasTankFormData = {
  datasource: '3__table',
  metric: 'sum__num',
  viz_type: 'kleebot-gas-tank',
};

test('extracts selected metric value from first query row', () => {
  const chartProps = new ChartProps<GasTankFormData>({
    formData,
    height: 600,
    queriesData: [{ data: [{ sum__num: 45.5 }] }],
    theme: supersetTheme,
    width: 800,
  });

  expect(transformProps(chartProps)).toEqual({
    height: 600,
    metricName: 'sum__num',
    percentage: 45.5,
    width: 800,
  });
});

test('uses zero when query has no numeric value', () => {
  const chartProps = new ChartProps<GasTankFormData>({
    formData,
    height: 600,
    queriesData: [{ data: [] }],
    theme: supersetTheme,
    width: 800,
  });

  expect(transformProps(chartProps).percentage).toBe(0);
});
