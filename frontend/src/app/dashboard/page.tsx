"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const data = [
  { name: "Lun", ventas: 4000 },
  { name: "Mar", ventas: 3000 },
  { name: "Mie", ventas: 2000 },
  { name: "Jue", ventas: 2780 },
  { name: "Vie", ventas: 1890 },
  { name: "Sab", ventas: 2390 },
  { name: "Dom", ventas: 3490 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalClients: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch stats from backend
    Promise.all([
      apiFetch("/catalog/products").catch(() => []),
      apiFetch("/clients/").catch(() => []),
      apiFetch("/sales/").catch(() => []),
    ]).then(([products, clients, sales]) => {
      setStats({
        totalProducts: products.length,
        totalClients: clients.length,
        totalSales: sales.reduce((acc: number, s: any) => acc + s.total, 0),
      });
    });
  }, [router]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Ventas Totales" value={`$${stats.totalSales.toLocaleString()}`} icon="💰" color="text-emerald-500" />
        <StatCard title="Productos" value={stats.totalProducts.toString()} icon="📦" color="text-indigo-500" />
        <StatCard title="Clientes" value={stats.totalClients.toString()} icon="👥" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Desempeño de Ventas</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="ventas" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVentas)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart or similar */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white mb-6">Ventas por Día</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: '#27272a'}}
                  contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "12px" }}
                />
                <Bar dataKey="ventas" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: string, color: string }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl backdrop-blur-xl group hover:border-zinc-700 transition-all">
      <div className="flex items-center justify-between">
        <div className={`h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12%</span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-400">{title}</p>
        <p className={`text-3xl font-bold text-white mt-1`}>{value}</p>
      </div>
    </div>
  );
}
