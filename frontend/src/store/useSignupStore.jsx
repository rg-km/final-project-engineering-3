import create from "zustand"
import axiosClient from '../config/axiosClient'
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
import { useNavigate } from "react-router-dom";

const useSignupStore = create(
    devtools(
       immer(set =>({
        user: JSON.parse(localStorage.getItem('@funding-research/userData')),
        errorMessage: null,
        isLoading: false,
        signup: async (userData) =>{
            try{
                set((state)=>{
                    state.isLoading = true
                })
                const {data, status} = await axiosClient.post('/register', userData)

                if(status === 200){
                    set((state)=>{
                        state.user = data
                        state.errorMessage = null
                        state.isLoading = false
                    })
                    const stringData = JSON.stringify(data)
                    localStorage.setItem('@funding-research/userData', stringData)
                
                }
            }catch(err){
                console.log(err.response.data.error)
                set((state)=>{
                    state.errorMessage = err.response.data.error
                    state.isLoading = false
                })
            }
        },
        resetErrorMessage: () =>
        set((state) => {
          state.errorMessage = null
        }),
       })),
    ),
)

export default useSignupStore