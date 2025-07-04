import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";

const SesionAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/analytics?table=Sesion")
      .then((res) => res.json())
      .then((data) => {
        setKpis(data.kpis || []);
        setLineData(data.lineData);
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
              <div className={`text-xs mt-1 ${kpi.color === 'green' ? 'text-green-400' : 'text-blue-400'}`}>{kpi.trendLabel}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Gráfico de líneas: Sesiones creadas por día */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Sesiones creadas por día</h3>
            {lineData && <Line data={lineData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SesionAnalytics; 