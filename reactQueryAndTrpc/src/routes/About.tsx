import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/About')({
    component:About
})

export default function About() {
  return (
    <div>About</div>
  )
}
