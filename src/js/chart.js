import ApexCharts from 'apexcharts'

let _seed = Date.now();

export function valueOrDefault(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}

export function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  let cfg = config || {};
  let min = valueOrDefault(cfg.min, 0);
  let max = valueOrDefault(cfg.max, 100);
  let from = valueOrDefault(cfg.from, []);
  let count = valueOrDefault(cfg.count, 8);
  let decimals = valueOrDefault(cfg.decimals, 8);
  let continuity = valueOrDefault(cfg.continuity, 1);
  let dfactor = Math.pow(10, decimals) || 0;
  let data = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(Math.round(dfactor * value) / dfactor));
    } else {
      data.push(null);
    }
  }

  return data;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function months(config) {
  let cfg = config || {};
  let count = cfg.count || 12;
  let section = cfg.section;
  let values = [];
  let i, value;

  for (i = 0; i < count; ++i) {
    value = MONTHS[Math.ceil(i) % 12];
    values.push(value.substring(0, section));
  }

  return values;
}

export function salesChart() {
  const ctx = document.getElementById('salesChart')

  const DATA_COUNT = 9;
  const NUMBER_CFG = {count: DATA_COUNT, min: 10000, max: 60000};

  const options = {
    series: [
      {name: 'Purchase', data: numbers(NUMBER_CFG)},
      {name: 'Sales', data: numbers(NUMBER_CFG)}
    ],
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        borderRadiusApplication: 'end',
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: months({count: DATA_COUNT}),
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 90, 100]
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands"
        }
      }
    },
  }

  const chart = new ApexCharts(ctx, options)
  chart.render()
}

export function orderChart() {
  const ctx = document.getElementById('orderChart')

  const DATA_COUNT = 5;
  const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 4000};

  const options = {
    series: [
      {name: 'Ordered', type: 'area', data: numbers(NUMBER_CFG)},
      {name: 'Delivered', type: 'line', data: numbers(NUMBER_CFG)}
    ],
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      type: 'solid',
      colors: ['#DBA362', '#B6D3FA'],
      opacity: [0.35, 1],
    },
    labels: months({count: DATA_COUNT}),
    markers: {
      size: 0
    },
  }

  const chart = new ApexCharts(ctx, options)
  chart.render()
}
