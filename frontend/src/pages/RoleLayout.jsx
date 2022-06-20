import { Outlet } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

function RoleLayout({ role }) {
  const user = useUserStore((state) => state.user)

  if (user?.role === role) return <Outlet />
  return <p className="mt-10 text-center text-3xl">Page Not Found</p>
}

export default RoleLayout
