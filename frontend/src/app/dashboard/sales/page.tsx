import React, { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{id: number, nombre: string, precio: number, cantidad: number}[]>([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    apiFetch("/catalog/products")
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);
  
  const addToCart = (product: any) => {
    if (product.stock <= 0) return alert("Producto sin stock");
    
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.cantidad >= product.stock) return alert("No hay más stock disponible");
      setCart(cart.map(item => 
        item.id === product.id ? {...item, cantidad: item.cantidad + 1} : item
      ));
    } else {
      setCart([...cart, {...product, cantidad: 1}]);
    }
  };

  const finalizeSale = async () => {
    setProcessing(true);
    try {
      await apiFetch("/sales/", {
        method: "POST",
        body: JSON.stringify({
          cliente_id: null, // Opcional por ahora
          total: total,
          detalles: cart.map(item => ({
            producto_id: item.id,
            cantidad: item.cantidad,
            precio: item.precio
          }))
        })
      });
      alert("Venta realizada con éxito");
      setCart([]);
      // Refresh products to see updated stock
      const updatedProducts = await apiFetch("/catalog/products");
      setProducts(updatedProducts);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  return (
    <div className="flex h-[calc(100vh-120px)] gap-8 animate-in fade-in duration-500">
      {/* Product Selection */}
      <div className="flex-1 space-y-6 overflow-auto pr-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Nueva Venta</h2>
          <div className="relative w-64">
             <input
              type="text"
              placeholder="Buscar producto..."
              className="w-full bg-zinc-900 border-zinc-800 rounded-xl py-2 pl-4 text-sm text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-zinc-500 col-span-full">Cargando productos...</p>
          ) : products.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              disabled={product.stock <= 0}
              className={`bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-left transition-all group ${
                product.stock <= 0 ? 'opacity-50 grayscale' : 'hover:border-indigo-500'
              }`}
            >
              <div className="text-sm text-zinc-500 mb-1">ID: #{product.id}</div>
              <div className="font-bold text-white group-hover:text-indigo-400 transition-colors">{product.nombre}</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-white">${product.precio.toFixed(2)}</span>
                <span className={`text-xs px-2 py-1 rounded-lg ${product.stock <= 5 ? 'bg-red-500/10 text-red-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  Stock: {product.stock}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart / Checkout */}
      <div className="w-96 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-white">Carrito de Venta</h3>
          <span className="bg-indigo-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">POS</span>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-2">
              <span className="text-4xl">🛒</span>
              <p className="text-sm font-medium">El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between group animate-in slide-in-from-right-2">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="text-sm font-bold text-white truncate">{item.nombre}</div>
                  <div className="text-xs text-zinc-500">{item.cantidad} x ${item.precio.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-white">${(item.precio * item.cantidad).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 space-y-4">
          <div className="flex items-center justify-between text-zinc-400">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xl font-bold text-white">
            <span>Total</span>
            <span className="text-indigo-400">${total.toFixed(2)}</span>
          </div>
          
          <button 
            disabled={cart.length === 0 || processing}
            onClick={finalizeSale}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {processing ? "Procesando..." : "Finalizar Venta"}
          </button>
        </div>
      </div>
    </div>
  );
}
