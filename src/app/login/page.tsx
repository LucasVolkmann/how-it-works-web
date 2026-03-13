"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginInput } from "@/lib/schemas"
import { useAuth } from "@/context/auth-context"

export default function Page() {
  const { register, handleSubmit } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) as any })
  const { login } = useAuth()

  async function onSubmit(data: LoginInput) {
    await login(data)
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input className="w-full p-2 border" {...register("email")} />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" className="w-full p-2 border" {...register("password")} />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Sign in</button>
      </form>
    </main>
  )
}
