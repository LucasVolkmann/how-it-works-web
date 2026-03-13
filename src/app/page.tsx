import Link from "next/link"

export const revalidate = 0

async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, { cache: "no-store" })
  if (!res.ok) return []
  return res.json()
}

export default async function Page() {
  const posts = await getPosts()
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <div className="space-y-4">
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((p: any) => (
            <article key={p.id} className="p-4 border rounded">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.excerpt || p.content?.slice(0, 140)}</p>
              <Link href={`/posts/${p.slug}`} className="text-blue-600">Read →</Link>
            </article>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>
    </main>
  )
}
