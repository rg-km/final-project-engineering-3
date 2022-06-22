import { useState } from 'react'
import { useEffect } from 'react'
import axiosClient from '../config/axiosClient'

function useFetchData(defaultValue, endpoint) {
  const [data, setData] = useState(defaultValue)
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true)
        const { data } = await axiosClient.get(endpoint)
        setIsFetching(false)
        setData(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsFetching(false)
      }
    }
    fetchData()
  }, [endpoint])

  return {
    data,
    isFetching,
  }
}

export default useFetchData
