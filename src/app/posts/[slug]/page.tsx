type Props = { params: { slug: string } }

export const revalidate = 0

async function getPost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json()
}

// `params` may be a Promise in some Next.js runtimes; await it before use.
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return <div className="p-6">Post not found.</div>
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-6">By {post.author?.name || post.authorName}</p>
      <article className="prose">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  )
}
