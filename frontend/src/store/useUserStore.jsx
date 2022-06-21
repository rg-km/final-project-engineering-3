import create from 'zustand'
import axiosClient from '../config/axiosClient'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'
const useUserStore = create(
  devtools(
    immer((set) => ({
      user: null,
      errorMessage: null,
      isLoading: false,
      login: async (userData) => {
        try {
          set((state) => {
            state.isLoading = true
          })
          const { data, status } = await axiosClient.post('/login', userData)

          if (status === 200) {
            set((state) => {
              state.user = data
              state.errorMessage = null
              state.isLoading = false
            })

            const stringData = JSON.stringify(data)
            localStorage.setItem('@funding-research/userData', stringData)
          }
        } catch (err) {
          console.error(err)
          set((state) => {
            state.errorMessage = 'Username / password salah!'
            state.isLoading = false
          })
        }
      },
      logout: () => {
        set((state) => {
          state.user = null
          state.errorMessage = null
        })
        localStorage.removeItem('@funding-research/userData')
        window.location.href = '/'
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
  ),
)

export default useUserStore
