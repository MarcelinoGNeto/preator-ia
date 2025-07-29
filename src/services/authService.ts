export type DecodedToken = {
  id: string;
  name: string;
  email: string;
  exp: number;
};

export async function getUser(): Promise<DecodedToken | null> {
  try {
    const res = await fetch("/api/user", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user || null;
  } catch {
    return null;
  }
}

export async function logoutUser() {
  await fetch("/api/logout", { method: "POST" });
}
