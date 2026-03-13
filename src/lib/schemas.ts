import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
})

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Name is required"),
})

export const postSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content is too short"),
  published: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type PostInput = z.infer<typeof postSchema>
