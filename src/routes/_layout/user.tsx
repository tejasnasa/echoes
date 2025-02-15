import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/user')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user"!</div>
}
