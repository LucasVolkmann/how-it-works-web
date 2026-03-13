"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterInput } from "@/lib/schemas"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export default function Page() {
  const { register, handleSubmit } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) as any })
  const router = useRouter()

  async function onSubmit(data: RegisterInput) {
    await api.post("/auth/register", data)
    router.push("/login")
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Name</label>
          <input className="w-full p-2 border" {...register("name")} />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full p-2 border" {...register("email")} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full p-2 border" {...register("password")} />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Create account</button>
      </form>
    </main>
  )
}
