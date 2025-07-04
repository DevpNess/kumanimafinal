import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Line, Pie } from "react-chartjs-2";

const MangaAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<any[]>([]);
  const [barData, setBarData] = useState<any>(null);
  const [lineData, setLineData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);
  const [mangaBarData, setMangaBarData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/analytics?table=Manga")
      .then((res) => res.json())
      .then((data) => {
        setKpis(data.kpis || []);
        setBarData(data.barData);
        setLineData(data.lineData);
        setPieData(data.pieData);
        setMangaBarData(data.mangaBarData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando analíticas...</div>;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="bg-[#18181b]">
            <CardContent className="py-4">
              <div className="text-lg font-bold">{kpi.title}</div>
              <div className="text-2xl font-extrabold text-primary">{kpi.value}</div>
              <div className="text-xs text-muted-foreground">{kpi.description}</div>
              <div className={`text-xs mt-1 ${kpi.color === 'green' ? 'text-green-400' : 'text-red-400'}`}>{kpi.trendLabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Vistas de Manga por Mes</h3>
            {barData && <Bar data={barData} />}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Ingresos por Mes</h3>
            {lineData && <Line data={lineData} />}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Distribución de Dispositivos</h3>
            {pieData && <Pie data={pieData} />}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Top 10 Mangas Más Vistos</h3>
            {mangaBarData && <Bar data={mangaBarData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MangaAnalytics; 