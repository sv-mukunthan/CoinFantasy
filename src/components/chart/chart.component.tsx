import moment from 'moment';
import React from 'react';
import Chart from 'react-apexcharts';
import './chart.component.scss';

interface IChart {
  series?: any[];
  category?: any[];
}

const ChartComponent = (props: IChart) => {
  const { series, category } = props;
  const chartOptions: any = {
    series: [
      {
        name: 'Revenue',
        data: series,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        foreColor: '#7425E2',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        colors: ['#7425E2'],
      },
      markers: {
        colors: 'transparent',
        strokeWidth: 0,
      },
      title: {
        text: '',
        align: 'left',
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
      grid: {
        show: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 1,
          colorStops: [
            {
              offset: 0,
              color: '#7425E2',
              opacity: 1,
            },
            {
              offset: 50,
              color: '#7425E2',
              opacity: 0.3,
            },
            // {
            //   offset: 40,
            //   color: '#7425E2',
            //   opacity: 0.6,
            // },
            // {
            //   offset: 60,
            //   color: '#7425E2',
            //   opacity: 0.4,
            // },
            {
              offset: 80,
              color: '#7425E2',
              opacity: 0.1,
            },
            {
              offset: 100,
              color: '#FFFFFF',
              opacity: 0,
            },
          ],
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: false,
        },
        // categories: category,
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
          var d = new Date(data[0]);
          let hour = d.getHours();
          return `<div class="tool_tip_popup">
              <div class="tooltip_head">${
                ('0' + d.getDate()).slice(-2) +
                ' ' +
                d.toLocaleString('default', { month: 'long' }) +
                ' ' +
                d.getFullYear()
              }</div>
              <div class="tooltip_time head4">${
                d.getHours() + ':' + d.getMinutes()
              } ${hour >= 12 ? 'pm' : 'am'}</div>
            </div>`;
        },
      },
      annotations: {
        yaxis: [
          {
            y: 0,
            strokeDashArray: 0,
            borderColor: 'transparent',
            fillColor: 'transparent',
            opacity: 0.8,
            offsetX: 0,
            offsetY: 0,
          },
        ],
      },
    },
  };

  return (
    <div className="daily_chart_component">
      <div className="bar_chart_wrapper">
        <div className="bar_chart_body">
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="area"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
