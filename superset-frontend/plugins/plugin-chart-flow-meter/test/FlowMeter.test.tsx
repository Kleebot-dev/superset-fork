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

import { supersetTheme, ThemeProvider } from '@apache-superset/core/theme';
import { render, screen } from '@testing-library/react';
import FlowMeter from '../src/FlowMeter';

test('renders formatted metric and unit with an accessible label', () => {
  render(
    <ThemeProvider theme={supersetTheme}>
      <FlowMeter
        formattedValue="1,248.3"
        height={560}
        metricName="Water flow"
        unit="L/min"
        width={640}
      />
    </ThemeProvider>,
  );

  expect(
    screen.getByRole('figure', { name: 'Water flow: 1,248.3 L/min' }),
  ).not.toBeNull();
  expect(screen.getByText('1,248.3')).not.toBeNull();
  expect(screen.getByText('L/min')).not.toBeNull();
});

test('renders value without a unit', () => {
  render(
    <ThemeProvider theme={supersetTheme}>
      <FlowMeter
        formattedValue="80"
        height={560}
        metricName="Water flow"
        unit=""
        width={640}
      />
    </ThemeProvider>,
  );

  expect(screen.getByRole('figure', { name: 'Water flow: 80' })).not.toBeNull();
});
