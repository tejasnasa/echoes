import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login"!</div>
}
