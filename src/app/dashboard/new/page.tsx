"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { postSchema, PostInput } from "@/lib/schemas"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function Page() {
  const { register, handleSubmit } = useForm<PostInput>({ resolver: zodResolver(postSchema) as any })
  const router = useRouter()

  async function onSubmit(data: PostInput) {
    await api.post("/posts", data)
    router.push("/dashboard")
  }

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
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
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
      </form>
    </main>
  )
}
