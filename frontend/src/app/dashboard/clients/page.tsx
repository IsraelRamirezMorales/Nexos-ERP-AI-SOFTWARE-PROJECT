import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/clients/")
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Directorio de Clientes</h2>
          <p className="text-zinc-400">Gestiona los contactos comerciales de tu empresa</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center gap-2">
          <span>➕</span> Nuevo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-zinc-500 col-span-full text-center py-12">Cargando clientes...</p>
        ) : clients.length === 0 ? (
          <p className="text-zinc-500 col-span-full text-center py-12">No hay clientes registrados</p>
        ) : clients.filter(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
          <div key={client.id} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl hover:border-emerald-500/50 transition-all group backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-2xl group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                👤
              </div>
              <div className="flex gap-2">
                <button className="text-zinc-500 hover:text-white transition-colors">📝</button>
                <button className="text-zinc-500 hover:text-red-400 transition-colors">🗑️</button>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{client.nombre}</h3>
              <p className="text-zinc-500 text-sm mt-1">{client.email}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>📞</span> {client.telefono}
              </div>
              <button className="text-xs font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors">
                Ver historial
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
