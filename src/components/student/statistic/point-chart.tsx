import { floatTwoDigits } from '@/script/util';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Animation,
  Title,
  Tooltip,
  Legend,
  
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    datalabels: {
      display: true,
      color: 'rgb(70,70,70)',
      align: 'top',
      anchor: 'start',
      font: { size: 12 },
      formatter: (val: number) => floatTwoDigits(val)
    }
  },
};

const PointChart = ({pointData}) => {
  const labels = pointData.time;

  const data = {
    labels,
    datasets: [
      {
        data: pointData.avgPoint,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
    <Bar options={options} data={data} />
  )
}

export { PointChart }