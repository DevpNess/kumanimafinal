// Copio todo el contenido de page.tsx aquí, pero exporto como AnalyticsPanel en vez de default page
'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Kpi {
  title: string;
  value: string;
  trend: string;
  trendLabel: string;
  description: string;
  color?: 'green' | 'red' | 'yellow';
}
interface AnalyticsData {
  kpis: Kpi[];
  barData: any;
  lineData: any;
  pieData: any;
  mangaBarData: any;
  userLineData: any;
}

function KpiCard({ title, value, trend, trendLabel, description, color = 'green' }: Kpi) {
  const colorMap: Record<'green' | 'red' | 'yellow', string> = {
    green: 'text-green-400 bg-green-900/20',
    red: 'text-red-400 bg-red-900/20',
    yellow: 'text-yellow-400 bg-yellow-900/20',
  };
  return (
    <Card className="bg-[#18181b] border border-[#23232b] w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-white text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${colorMap[color]}`}>↗ {trend}</span>
        </div>
        <div className="text-xs text-[#a1a1aa] mt-2">{trendLabel}</div>
        <div className="text-xs text-[#a1a1aa] mt-1">{description}</div>
      </CardContent>
    </Card>
  );
}

const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export function AnalyticsPanel() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let url = `/api/analytics?month=${selectedMonth}`;
    if (dateRange.from && dateRange.to) {
      url += `&from=${dateRange.from}&to=${dateRange.to}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, [selectedMonth, dateRange]);

  return (
    <div className="p-6 w-full min-h-screen bg-[#18181b]">
      <h1 className="text-2xl font-bold text-white mb-6">Panel de Analytics</h1>
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-8 items-end">
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Filtrar por mes</label>
          <select
            className="bg-[#23232b] text-white rounded px-3 py-2 border border-[#39393f]"
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Desde</label>
          <input
            type="date"
            className="bg-[#23232b] text-white rounded px-3 py-2 border border-[#39393f]"
            value={dateRange.from}
            onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-xs text-[#a1a1aa] mb-1">Hasta</label>
          <input
            type="date"
            className="bg-[#23232b] text-white rounded px-3 py-2 border border-[#39393f]"
            value={dateRange.to}
            onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))}
          />
        </div>
      </div>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {(data?.kpis || []).map((kpi: Kpi, i: number) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#18181b] border border-[#23232b] w-full">
          <CardHeader>
            <CardTitle className="text-white">Visitas por mes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {data?.barData && <Bar data={data.barData} options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
              },
              responsive: true,
              maintainAspectRatio: false,
            }} />}
          </CardContent>
        </Card>
        <Card className="bg-[#18181b] border border-[#23232b] w-full">
          <CardHeader>
            <CardTitle className="text-white">Ingresos por mes</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {data?.lineData && <Line data={data.lineData} options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
              },
              responsive: true,
              maintainAspectRatio: false,
            }} />}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#18181b] border border-[#23232b] w-full">
          <CardHeader>
            <CardTitle className="text-white">Mangas más vistos (Top 10)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {data?.mangaBarData && <Bar data={data.mangaBarData} options={{
              plugins: { legend: { display: false } },
              indexAxis: 'y',
              scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
              },
              responsive: true,
              maintainAspectRatio: false,
            }} />}
          </CardContent>
        </Card>
        <Card className="bg-[#18181b] border border-[#23232b] w-full">
          <CardHeader>
            <CardTitle className="text-white">Nuevos usuarios por día</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {data?.userLineData && <Line data={data.userLineData} options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#a1a1aa' } },
              },
              responsive: true,
              maintainAspectRatio: false,
            }} />}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#18181b] border border-[#23232b] w-full">
          <CardHeader>
            <CardTitle className="text-white">Distribución de dispositivos</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            {data?.pieData && <Pie data={data.pieData} options={{
              plugins: { legend: { labels: { color: '#a1a1aa', font: { size: 14 } } } },
              responsive: true,
              maintainAspectRatio: false,
            }} />}
          </CardContent>
        </Card>
        {/* Puedes agregar más gráficos aquí */}
      </div>
      {loading && <div className="text-center text-white mt-8">Cargando datos...</div>}
    </div>
  );
} 