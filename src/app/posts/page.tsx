import { redirect } from "next/navigation"

export default function Page() {
  // Redirect `/posts` (no slug) to the public posts list (root)
  redirect("/")
}
