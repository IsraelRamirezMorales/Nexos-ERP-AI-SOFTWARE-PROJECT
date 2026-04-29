import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/catalog/products")
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Inventario de Productos</h2>
          <p className="text-zinc-400">Gestiona el catálogo de tu empresa</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center gap-2">
          <span>➕</span> Nuevo Producto
        </button>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-zinc-800 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span>
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full bg-zinc-800 border-0 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 rounded-xl border border-zinc-700 transition-all">
              Filtrar
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-3 rounded-xl border border-zinc-700 transition-all">
              Exportar
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30">
                <th className="p-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Producto</th>
                <th className="p-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Categoría</th>
                <th className="p-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Precio</th>
                <th className="p-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider">Stock</th>
                <th className="p-6 text-sm font-semibold text-zinc-400 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center text-zinc-500">Cargando productos...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-zinc-500">No hay productos registrados</td></tr>
              ) : products.filter(p => p.nombre.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="p-6">
                    <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                      {product.nombre}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">ID: #{product.id.toString().padStart(4, '0')}</div>
                  </td>
                  <td className="p-6 text-zinc-300 font-medium">
                    <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs border border-zinc-700">
                      {product.categoria_id}
                    </span>
                  </td>
                  <td className="p-6 text-white font-semibold">
                    ${product.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-zinc-300 font-medium">{product.stock} unidades</span>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-zinc-500 hover:text-white transition-colors mr-4">📝</button>
                    <button className="text-zinc-500 hover:text-red-400 transition-colors">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-sm text-zinc-500">Mostrando {products.length} productos</p>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg hover:bg-zinc-800 disabled:opacity-50 text-zinc-400" disabled>◀️</button>
            <button className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400">▶️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
