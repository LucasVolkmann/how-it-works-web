"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"

type User = { id?: string; name?: string; email?: string }

type AuthContextValue = {
  user: User | null
  login: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function parseJwt(token: string | undefined): User | null {
  if (!token) return null
  try {
    const payload = token.split(".")[1]
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/")
    const json = decodeURIComponent(
      Array.prototype.map
        .call(atob(base64), (c: string) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    )
    const parsed = JSON.parse(json)
    return { id: parsed.sub, name: parsed.name, email: parsed.email }
  } catch (e) {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => parseJwt(Cookies.get("token")))
  const router = useRouter()

  useEffect(() => {
    const t = Cookies.get("token")
    setUser(parseJwt(t))
  }, [])

  async function login(data: any) {
    const res = await api.post("/auth/login", data)
    const token = res.data?.token || res.data
    if (typeof token === "string") {
      Cookies.set("token", token)
      setUser(parseJwt(token))
      router.push("/dashboard")
    }
  }

  function logout() {
    Cookies.remove("token")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
