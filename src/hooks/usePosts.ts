import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const usePosts = () =>
  useQuery({ queryKey: ["posts"], queryFn: () => api.get("/posts").then((r) => r.data) })

export const usePost = (slug: string) =>
  useQuery({ queryKey: ["posts", slug], queryFn: () => api.get(`/posts/${slug}`).then((r) => r.data) })

export const useCreatePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.post("/posts", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  })
}

export const useDeletePost = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => api.delete(`/posts/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  })
}
