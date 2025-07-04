import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Line, Pie } from "react-chartjs-2";

const UserAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<any[]>([]);
  const [barData, setBarData] = useState<any>(null);
  const [lineData, setLineData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);
  const [userLineData, setUserLineData] = useState<any>(null);
  const [topUsuarios, setTopUsuarios] = useState<any[]>([]); // Puedes poblarlo con otro endpoint si lo deseas

  useEffect(() => {
    setLoading(true);
    fetch("/api/analytics?table=User")
      .then((res) => res.json())
      .then((data) => {
        setKpis(data.kpis || []);
        setBarData(data.barData);
        setLineData(data.lineData);
        setPieData(data.pieData);
        setUserLineData(data.userLineData);
        // setTopUsuarios(data.topUsuarios || []); // Si lo agregas al endpoint
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
            <h3 className="font-bold mb-2">Crecimiento de Usuarios</h3>
            {lineData && <Line data={lineData} />}
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-bold mb-2">Usuarios Activos (Visitas)</h3>
            {barData && <Bar data={barData} />}
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
            <h3 className="font-bold mb-2">Nuevos Usuarios por Día</h3>
            {userLineData && <Line data={userLineData} />}
          </CardContent>
        </Card>
      </div>
      {/* Breakdown: Top Usuarios (puedes poblarlo con otro endpoint) */}
      {/* <Card>
        <CardContent>
          <h3 className="font-bold mb-2">Top 10 Usuarios Activos</h3>
          <ul>
            {topUsuarios.map((u, i) => (
              <li key={i}>{u.name} - {u.metric}</li>
            ))}
          </ul>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default UserAnalytics; 