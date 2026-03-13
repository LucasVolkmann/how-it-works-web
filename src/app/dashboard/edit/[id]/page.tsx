"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema, PostInput } from "@/lib/schemas"
import { api } from "@/lib/api"
import { useRouter, useParams } from "next/navigation"

export default function Page() {
  const params = useParams() as { id?: string }
  const id = params?.id as string
  const { register, handleSubmit, reset } = useForm<PostInput>({ resolver: zodResolver(postSchema) as any })
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    api.get(`/posts/${id}`).then((r) => {
      reset(r.data)
      setLoading(false)
    })
  }, [id, reset])

  async function onSubmit(data: PostInput) {
    await api.put(`/posts/${id}`, data)
    router.push("/dashboard")
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Title</label>
          <input className="w-full p-2 border" {...register("title")} />
        </div>
        <div>
          <label className="block text-sm">Content</label>
          <textarea className="w-full p-2 border" rows={8} {...register("content")} />
        </div>
        <div>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" {...register("published" as any)} /> Published
          </label>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </form>
    </main>
  )
}
