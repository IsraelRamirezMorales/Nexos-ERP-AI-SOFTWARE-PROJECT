const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || "API request failed");
  }

  return response.json();
}

export const authApi = {
  login: (credentials: any) => {
    const formData = new URLSearchParams();
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);
    
    return fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    }).then(async (res) => {
      if (!res.ok) throw new Error("Credenciales inválidas");
      return res.json();
    });
  },
  
  register: (data: any) => {
    return apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        company_name: data.companyName,
        admin_name: data.adminName,
        admin_email: data.adminEmail,
        admin_password: data.adminPassword,
      }),
    });
  },
};
