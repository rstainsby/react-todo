import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/testing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/testing"!</div>
}
