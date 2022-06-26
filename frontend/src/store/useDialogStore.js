import create from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { devtools } from 'zustand/middleware'

const useDialogStore = create(
  devtools(
    immer((set) => ({
      isOpen: false,
      data: null,
      callback: null,
      openDialog: (data, callback) =>
        set((state) => {
          state.isOpen = true
          state.data = data
          state.callback = callback
        }),
      closeDialog: () =>
        set((state) => {
          state.isOpen = false
          if (state.callback) {
            state.callback()
            state.callback = null
          }
        }),
    })),
  ),
)

export default useDialogStore
