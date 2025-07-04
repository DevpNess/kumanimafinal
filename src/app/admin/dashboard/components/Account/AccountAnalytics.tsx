import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";

const AccountAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<any[]>([]);
  const [pieData, setPieData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    fetch("/api/analytics?table=Account")
      .then((res) => res.json())
      .then((data) => {
        setKpis(data.kpis || []);
        setPieData(data.pieData);
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
      {/* Gráfico de pastel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Distribución de Proveedores de Autenticación</h3>
            {pieData && <Pie data={pieData} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountAnalytics; 