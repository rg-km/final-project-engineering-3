import React from 'react'
import { Outlet } from 'react-router-dom'
import Modal from '../components/shared/Modal'
import useUserStore from '../store/useUserStore'
import { ROLES } from '../helper/constants'

function DataCompletedRoute() {
  const user = useUserStore((state) => state.user)
  const path = user.role === ROLES.Mitra ? '/mitra/information' : '/researcher/information'

  if (!user.isDataComplete) return <Modal path={path} />
  return <Outlet />
}

export default DataCompletedRoute
