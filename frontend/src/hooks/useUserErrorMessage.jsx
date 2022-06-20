import { useEffect } from 'react'
import useUserStore from '../store/useUserStore'

const useUserErrorMessage = () => {
  const errorMessage = useUserStore((state) => state.errorMessage)
  const resetErrorMessage = useUserStore((state) => state.resetErrorMessage)

  useEffect(() => {
    return () => {
      resetErrorMessage()
    }
  }, [resetErrorMessage])

  return errorMessage
}

export default useUserErrorMessage
