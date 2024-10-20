import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Definición del tipo de datos para los grupos de sílabas
type GroupData = {
  dates: string[]; // Fechas para cada sílaba
  values: number[]; // Valores para cada sílaba
};

type SyllableGroup = {
  label: string;
  data: {
    [syllable: string]: GroupData; // Mapa de sílabas a datos
  };
};

// Ejemplo de grupos de sílabas
const groups: SyllableGroup[] = [
  {
    label: 'Grupo 1',
    data: {
      ba: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [12, 10, 15, 20, 25] },
      be: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [8, 5, 3, 10, 12] },
      bi: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [5, 12, 15, 20, 25] },
      bo: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [2, 3, 10, 15, 20] },
      bu: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [1, 2, 5, 7, 10] },
    },
  },
  {
    label: 'Grupo 2',
    data: {
      ra: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [10, 15, 20, 25, 30] },
      re: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [5, 10, 15, 20, 25] },
      ri: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [7, 12, 18, 22, 26] },
      ro: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [1, 3, 5, 7, 9] },
      ru: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [4, 6, 8, 10, 12] },
    },
  },
  {
    label: 'Grupo 3',
    data: {
      da: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [10, 15, 20, 25, 30] },
      de: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [5, 10, 15, 20, 25] },
      di: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [7, 12, 18, 32, 26] },
      do: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [1, 3, 5, 7, 9] },
      du: { dates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'], values: [4, 6, 8, 10, 12] },
    },
  },
];

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

const Dashboard = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm breadcrumbs">
          <ul>
            <li><a href="/">Home</a></li>
            <li>Juan Perez</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        {groups.map((group, index) => (
          <div key={index} className="col-span-2 md:col-span-1 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">{group.label}</h2>
            <div className="flex justify-center">
              <div className="w-full h-96 relative">
                <Line
                  style={{ width: '100%', height: '100%' }}
                  options={lineChartOptions}
                  data={{
                    labels: group.data[Object.keys(group.data)[0]].dates, // Usa las fechas del primer conjunto de datos
                    datasets: Object.keys(group.data).map((syllable) => ({
                      label: syllable,
                      data: group.data[syllable].values, // Utiliza los valores de cada sílaba
                      borderColor: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
                      backgroundColor: 'rgba(53, 162, 235, 0.2)',
                    })),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
