"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { api } from "@/lib/api"
import { useAuth } from "@/context/auth-context"

export default function Page() {
  const [posts, setPosts] = useState<any[]>([])
  const { logout } = useAuth()

  useEffect(() => {
    api.get("/posts").then((r) => setPosts(r.data || []))
  }, [])

  async function handleDelete(id: string) {
    await api.delete(`/posts/${id}`)
    setPosts((p) => p.filter((x) => x.id !== id))
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <Link href="/dashboard/new" className="px-3 py-1 bg-blue-600 text-white rounded">New</Link>
          <button onClick={logout} className="px-3 py-1 bg-gray-200 rounded">Logout</button>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">{p.slug}</div>
            </div>
            <div className="space-x-2">
              <Link href={`/dashboard/edit/${p.id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => handleDelete(p.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
