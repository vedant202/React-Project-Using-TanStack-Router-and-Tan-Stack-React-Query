import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/About" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/Posts" className="[&.active]:font-bold">
          Posts
        </Link>
        <Link to="/AddPosts" className="[&.active]:font-bold">
          Add Post
        </Link>
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})