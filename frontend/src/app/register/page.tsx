"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await authApi.register(formData);
      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Registra tu Empresa
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Únete a Nexos ERP y digitaliza tu operación
          </p>
        </div>

        <div className="mt-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
          <div className="flex justify-between mb-8">
            <div className={`h-1 w-full rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-zinc-800'} transition-all`} />
            <div className="w-4" />
            <div className={`h-1 w-full rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-zinc-800'} transition-all`} />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-medium text-white">Datos de la Empresa</h3>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-zinc-300">
                    Nombre comercial
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                    placeholder="Ej. Invernadero San José"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all active:scale-[0.98]"
                >
                  Siguiente
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-medium text-white">Cuenta de Administrador</h3>
                <div>
                  <label htmlFor="adminName" className="block text-sm font-medium text-zinc-300">
                    Nombre completo
                  </label>
                  <input
                    id="adminName"
                    name="adminName"
                    type="text"
                    required
                    value={formData.adminName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="adminEmail" className="block text-sm font-medium text-zinc-300">
                    Correo electrónico
                  </label>
                  <input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    required
                    value={formData.adminEmail}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                    placeholder="admin@empresa.com"
                  />
                </div>
                <div>
                  <label htmlFor="adminPassword" className="block text-sm font-medium text-zinc-300">
                    Contraseña
                  </label>
                  <input
                    id="adminPassword"
                    name="adminPassword"
                    type="password"
                    required
                    value={formData.adminPassword}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-emerald-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 rounded-xl border border-zinc-700 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-all"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="flex-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all active:scale-[0.98]"
                  >
                    Finalizar Registro
                  </button>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-zinc-500">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
