import type { MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-8">Welcome to Remix!</h1>
      <Outlet />
    </>
  )
}
