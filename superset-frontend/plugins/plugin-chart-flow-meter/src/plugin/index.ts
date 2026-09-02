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

import { t } from '@apache-superset/core/translation';
import { ChartMetadata, ChartPlugin } from '@superset-ui/core';
import thumbnail from '../images/thumbnail.svg';
import { FlowMeterFormData } from '../types';
import buildQuery from './buildQuery';
import controlPanel from './controlPanel';
import transformProps from './transformProps';

const metadata = new ChartMetadata({
  category: t('KPI'),
  description: t(
    'Displays one raw metric as a digital flow meter with a configurable unit.',
  ),
  name: t('Flow Meter'),
  tags: [t('KPI'), t('Single Metric'), t('Flow')],
  thumbnail,
});

export default class KleebotFlowMeterChartPlugin extends ChartPlugin<FlowMeterFormData> {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('../FlowMeter'),
      metadata,
      transformProps,
    });
  }
}
