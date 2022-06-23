import { Navigate, useLocation } from 'react-router-dom'
import useUserStore from '../store/useUserStore'
import { ROLES } from '../helper/constants'

function PublicRoute({ children }) {
  const user = useUserStore((state) => state.user)
  const location = useLocation()

  const getDRedirectPath = () => {
    const dataCompeletePath = user?.role === ROLES.Mitra ? '/posted-challenges' : '/challenges'
    const dataNotCompletePath =
      user?.role === ROLES.Mitra ? '/mitra/information' : '/researcher/information'

    return user?.isDataComplete ? dataCompeletePath : dataNotCompletePath
  }

  const from = location.state?.from?.pathname || getDRedirectPath()

  if (user) return <Navigate to={from} />
  return children
}

export default PublicRoute
