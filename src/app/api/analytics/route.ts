import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get('table');
  const month = searchParams.get('month');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  // Construir rango de fechas
  let dateFilter: any = {};
  if (from && to) {
    dateFilter = {
      gte: new Date(from),
      lte: new Date(to),
    };
  } else if (month) {
    const year = new Date().getFullYear();
    const firstDay = new Date(year, Number(month), 1);
    const lastDay = new Date(year, Number(month) + 1, 0, 23, 59, 59);
    dateFilter = {
      gte: firstDay,
      lte: lastDay,
    };
  }

  if (table === 'Account') {
    // KPIs Account
    const [totalAccounts, accountsByProvider, accountsByProviderAgg] = await Promise.all([
      prisma.account.count(),
      prisma.account.groupBy({
        by: ['provider'],
        _count: { provider: true },
      }),
      prisma.account.findMany({
        select: { provider: true },
      }),
    ]);
    // KPIs
    const kpis = [
      {
        title: 'Cuentas Vinculadas',
        value: totalAccounts,
        trend: '+2.1%',
        trendLabel: 'Crecimiento mensual',
        description: 'Total de cuentas autenticadas',
        color: 'green',
      },
    ];
    // Gráfico de pastel: distribución de proveedores
    const providerLabels = accountsByProvider.map((a) => a.provider);
    const providerData = accountsByProvider.map((a) => a._count.provider);
    const pieData = {
      labels: providerLabels,
      datasets: [
        {
          label: 'Proveedores',
          data: providerData,
          backgroundColor: ['#6366f1', '#fbbf24', '#22d3ee', '#f472b6', '#34d399'],
          borderWidth: 0,
        },
      ],
    };
    return Response.json({ kpis, pieData });
  }

  if (table === 'Sesion') {
    // KPIs para Sesion
    const [totalSesiones, sesionesActivas, sesionesPorDia] = await Promise.all([
      prisma.sesion.count(),
      prisma.sesion.count({ where: { expires: { gte: new Date() } } }),
      prisma.sesion.groupBy({
        by: ['createdAt'],
        _count: { createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
    ]);
    const kpis = [
      {
        title: 'Total de Sesiones',
        value: totalSesiones,
        trend: '+2.1%',
        trendLabel: 'Crecimiento mensual',
        description: 'Total de sesiones registradas',
        color: 'green',
      },
      {
        title: 'Sesiones Activas',
        value: sesionesActivas,
        trend: '+1.2%',
        trendLabel: 'Activas ahora',
        description: 'Sesiones con expiración futura',
        color: 'blue',
      },
    ];
    // Gráfico de líneas: sesiones creadas por día
    const lineData = {
      labels: sesionesPorDia.map(s => new Date(s.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })),
      datasets: [
        {
          label: 'Sesiones creadas',
          data: sesionesPorDia.map(s => s._count.createdAt),
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
    return Response.json({ kpis, lineData });
  }

  // KPIs y breakdowns
  const [pageStats, users, newUsers, errors, sessions, mangaViews, mangas, mangaViewAgg, newUsersAgg] = await Promise.all([
    prisma.pageStats.findMany({
      where: from && to || month ? { date: dateFilter } : {},
      orderBy: { date: 'desc' },
      take: 6,
    }),
    prisma.user.count(),
    prisma.user.count({ where: from && to || month ? { createdAt: dateFilter } : {} }),
    prisma.errorTecnico.count({ where: from && to || month ? { timestamp: dateFilter } : {} }),
    prisma.sesion.count({ where: from && to || month ? { inicio: dateFilter } : {} }),
    prisma.mangaView.count({ where: from && to || month ? { timestamp: dateFilter } : {} }),
    prisma.manga.findMany({ select: { id: true, title: true } }),
    // Vistas por manga (top 10)
    prisma.mangaView.groupBy({
      by: ['mangaId'],
      _count: { mangaId: true },
      where: from && to || month ? { timestamp: dateFilter } : {},
      orderBy: { _count: { mangaId: 'desc' } },
      take: 10,
    }),
    // Nuevos usuarios por día
    prisma.user.groupBy({
      by: ['createdAt'],
      _count: { createdAt: true },
      where: from && to || month ? { createdAt: dateFilter } : {},
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  // KPIs dinámicos
  const kpis = [
    {
      title: 'Ingresos Totales',
      value: pageStats[0]?.totalRevenue ? `$${pageStats[0].totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '$0.00',
      trend: '+12.5%',
      trendLabel: 'En alza este mes',
      description: 'Ingresos de los últimos 6 meses',
      color: 'green',
    },
    {
      title: 'Usuarios Activos',
      value: users.toLocaleString('es-ES'),
      trend: '+8.2%',
      trendLabel: 'Más usuarios este mes',
      description: 'Usuarios únicos en el periodo',
      color: 'green',
    },
    {
      title: 'Nuevos Registros',
      value: newUsers.toLocaleString('es-ES'),
      trend: '+5.1%',
      trendLabel: 'Tendencia positiva',
      description: 'Nuevos usuarios en el periodo',
      color: 'green',
    },
    {
      title: 'Errores Críticos',
      value: errors.toLocaleString('es-ES'),
      trend: '-2.1%',
      trendLabel: 'Menos errores',
      description: 'Errores técnicos reportados',
      color: 'red',
    },
    {
      title: 'Sesiones',
      value: sessions.toLocaleString('es-ES'),
      trend: '+3.2%',
      trendLabel: 'Sesiones en el periodo',
      description: 'Total de sesiones de usuario',
      color: 'green',
    },
    {
      title: 'Vistas de Manga',
      value: mangaViews.toLocaleString('es-ES'),
      trend: '+4.7%',
      trendLabel: 'Vistas en el periodo',
      description: 'Total de vistas de manga',
      color: 'green',
    },
  ];

  // Gráfico de barras: visitas por mes
  const barLabels = pageStats.map(ps => ps.date.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' }));
  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Visitas',
        data: pageStats.map(ps => ps.activeAccounts),
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };

  // Gráfico de líneas: ingresos por mes
  const lineData = {
    labels: barLabels,
    datasets: [
      {
        label: 'Ingresos',
        data: pageStats.map(ps => ps.totalRevenue),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Gráfico de pastel: distribución de dispositivos (mock, puedes conectar a datos reales si los tienes)
  const pieData = {
    labels: ['Móvil', 'Escritorio', 'Tablet'],
    datasets: [
      {
        label: 'Dispositivos',
        data: [62, 30, 8],
        backgroundColor: ['#fbbf24', '#6366f1', '#22d3ee'],
        borderWidth: 0,
      },
    ],
  };

  // Breakdown: mangas más vistos (top 10)
  const mangaIdToTitle = Object.fromEntries(mangas.map(m => [m.id, m.title]));
  const mangaBarData = {
    labels: mangaViewAgg.map(mv => mangaIdToTitle[mv.mangaId] || `Manga ${mv.mangaId}`),
    datasets: [
      {
        label: 'Vistas',
        data: mangaViewAgg.map(mv => mv._count.mangaId),
        backgroundColor: '#f472b6',
        borderRadius: 6,
      },
    ],
  };

  // Breakdown: nuevos usuarios por día
  const userLineData = {
    labels: newUsersAgg.map(u => new Date(u.createdAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })),
    datasets: [
      {
        label: 'Nuevos usuarios',
        data: newUsersAgg.map(u => u._count.createdAt),
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251,191,36,0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Puedes agregar breakdowns por país, dispositivo real, etc. si tienes esos datos en la base.

  return Response.json({ kpis, barData, lineData, pieData, mangaBarData, userLineData });
} 