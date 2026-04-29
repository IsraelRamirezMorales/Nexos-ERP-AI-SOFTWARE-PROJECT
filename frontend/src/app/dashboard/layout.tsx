"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Resumen", href: "/dashboard", icon: "📊" },
  { name: "Productos", href: "/dashboard/products", icon: "📦" },
  { name: "Categorías", href: "/dashboard/categories", icon: "🏷️" },
  { name: "Clientes", href: "/dashboard/clients", icon: "👥" },
  { name: "Ventas", href: "/dashboard/sales", icon: "💰" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 backdrop-blur-md hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Nexos ERP</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button className="flex w-full items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
            <span>🚪</span>
            <span className="font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-zinc-200">
            {navigation.find((n) => n.href === pathname)?.name || "Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-800 border border-zinc-700" />
            <span className="text-sm font-medium text-zinc-300">Admin Usuario</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">{children}</div>
      </main>
    </div>
  );
}
