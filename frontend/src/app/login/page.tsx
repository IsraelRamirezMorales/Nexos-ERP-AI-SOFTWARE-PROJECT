"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const data = await authApi.login({ email, password });
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard");
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
          <div className="mx-auto h-16 w-16 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Bienvenido a Nexos ERP
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Gestiona tu negocio con la potencia de la nube
          </p>
        </div>

        <div className="mt-8 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300"
              >
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
                  placeholder="tu@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-400 hover:text-indigo-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-xl border-0 bg-zinc-800 py-3 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-xl bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 active:scale-[0.98]"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-transparent px-2 text-zinc-500">
                  ¿Nuevo en Nexos?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="flex w-full justify-center rounded-xl border border-zinc-700 bg-transparent px-3 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-all duration-200"
              >
                Registrar mi empresa
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center text-xs text-zinc-600">
          &copy; 2026 Nexos ERP. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
