import create from 'zustand'
import axiosClient from '../config/axiosClient'
import { immer } from 'zustand/middleware/immer'

const useUserStore = create(
  immer((set) => ({
    user: null,
    errorMessage: null,
    login: async (userData) => {
      try {
        const { data, status } = await axiosClient.post('/login', userData)

        if (status === 200) {
          set((state) => {
            state.user = data
            state.errorMessage = null
          })

          const stringData = JSON.stringify(data)
          localStorage.setItem('@funding-research/userData', stringData)
        }
      } catch (err) {
        console.error(err)
        set((state) => {
          state.errorMessage = 'Login gagal!'
        })
      }
    },
    getUserData: () =>
      set((state) => {
        state.user = JSON.parse(localStorage.getItem('@funding-research/userData'))
      }),
    resetErrorMessage: () =>
      set((state) => {
        state.errorMessage = null
      }),
  })),
)

export default useUserStore
