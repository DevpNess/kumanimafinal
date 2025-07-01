import { Line } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useRef, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

// Generar datos aleatorios para Mobile y Desktop
function randomData(length: number, min: number, max: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

// Definir el tipo correcto para los datasets
interface DataSet {
  labels: string[];
  mobile: number[];
  desktop: number[];
}
const dataSets: Record<string, DataSet> = {
  '3m': {
    labels: ["Apr 5", "Apr 11", "Apr 17", "Apr 23", "Apr 29", "May 5", "May 11", "May 17", "May 23", "May 29", "Jun 4", "Jun 10", "Jun 16", "Jun 22", "Jun 29"],
    mobile: randomData(15, 200, 500),
    desktop: randomData(15, 300, 600),
  },
  '30d': {
    labels: ["Jun 1", "Jun 5", "Jun 10", "Jun 15", "Jun 20", "Jun 25", "Jun 29"],
    mobile: randomData(7, 200, 500),
    desktop: randomData(7, 300, 600),
  },
  '7d': {
    labels: ["Jun 23", "Jun 24", "Jun 25", "Jun 26", "Jun 27", "Jun 28", "Jun 29"],
    mobile: randomData(7, 200, 500),
    desktop: randomData(7, 300, 600),
  },
};

export default function GraficoPanel() {
  const [range, setRange] = useState('3m');
  const chartRef = useRef<any>(null);
  // Crear degradado dinámico para el área bajo la línea
  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(255,255,255,0.25)');
    gradient.addColorStop(1, 'rgba(255,255,255,0.02)');
    return gradient;
  };
  const chartData = {
    labels: dataSets[range].labels,
    datasets: [
      {
        label: 'Mobile',
        data: dataSets[range].mobile,
        borderColor: '#fff',
        borderWidth: 2,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(255,255,255,0.1)';
          return getGradient(ctx, chartArea);
        },
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        fill: true,
        order: 1,
      },
      {
        label: 'Desktop',
        data: dataSets[range].desktop,
        borderColor: '#a1a1aa',
        borderWidth: 2,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(161,161,170,0.1)';
          return getGradient(ctx, chartArea);
        },
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#a1a1aa',
        pointBorderColor: '#a1a1aa',
        fill: false,
        order: 2,
      },
    ],
  };
  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#18181b',
        borderColor: '#39393f',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            // Espacio para el color, label y valor alineado a la derecha
            let label = ` ${context.dataset.label}`;
            let value = context.formattedValue;
            return `${label.padEnd(12)}${value.padStart(6)}`;
          },
        },
        padding: 12,
        caretSize: 6,
        cornerRadius: 8,
        boxPadding: 6,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#a1a1aa', font: { size: 12 } },
        border: { color: 'rgba(255,255,255,0.08)' },
      },
      y: {
        grid: { color: 'rgba(255,255,255,0.04)' },
        ticks: { color: '#a1a1aa', font: { size: 12 } },
        border: { color: 'rgba(255,255,255,0.08)' },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <Card className="bg-[#18181b] border border-[#23232b] w-full mb-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#23232b]">
        <div>
          <CardTitle className="text-white text-lg font-semibold">Total Visitors</CardTitle>
          <div className="text-xs text-[#a1a1aa] mt-1">Total for the last 3 months</div>
        </div>
        <Tabs value={range} onValueChange={setRange} className="">
          <TabsList className="bg-[#23232b] border border-[#39393f] rounded-md">
            <TabsTrigger value="3m">Last 3 months</TabsTrigger>
            <TabsTrigger value="30d">Last 30 days</TabsTrigger>
            <TabsTrigger value="7d">Last 7 days</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="h-64">
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
} 