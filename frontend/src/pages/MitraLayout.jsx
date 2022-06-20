import { Navigate } from 'react-router-dom'
import useUserStore from '../store/useUserStore'

function MitraLayout({ children }) {
  const user = useUserStore((state) => state.user)

  if (user?.role !== 'industry') return <Navigate to="/" />
  return children
}

export default MitraLayout
