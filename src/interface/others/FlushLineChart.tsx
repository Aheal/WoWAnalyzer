import React from 'react';

import { Config } from 'vega-lite';
import FooterChart from './FooterChart';

export interface Props {
  data: any,
  config?: Config,
  x?: string,
  y?: string,
  duration?: number,
};

export default function FlushLineChart(props: Props) {
  const x = props.x || 'time';
  const y = props.y || 'val';
  const spec = {
    mark: {
      type: 'area' as const,
      line: {
        color: '#fab700',
        strokeWidth: 1,
      },
      color: 'rgba(250, 183, 0, 0.15)',
    },
    transform: [
      {
        impute: y,
        key: x,
        keyvals: {
          start: 0,
          stop: props.duration || Math.max.apply(null, props.data.map((obj: any) => obj[x])),
        },
        method: 'value' as const,
        value: 0,
      },
      {
        window: [
          { op: 'sum' as const, field: y, as: 'sum_val' },
        ],
        sort: [
          { field: x, order: 'ascending' as const },
        ],
        frame: [-3, 3],
      },
      {
        calculate: 'if(datum.sum_val <= 0, 0, datum.sum_val)',
        as: 'sum_val',
      },
    ],
    encoding: {
      x: {
        field: x,
        type: 'quantitative' as const,
        axis: null,
      },
      y: {
        field: 'sum_val',
        type: 'quantitative' as const,
        axis: null,
      },
    },
    config: {
      padding: {
        left: 0,
        top: 0,
        right: -5,
        // hide the 0 values w/o leaving disconnected lines
        bottom: -2,
      },
    },
  };

  return <FooterChart spec={spec} data={props.data} config={props.config} />;
}
