import { useEffect, useRef } from 'react'

function useClickOutside(callback) {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}

export default useClickOutside
