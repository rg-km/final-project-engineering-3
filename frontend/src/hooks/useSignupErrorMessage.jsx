import { useEffect } from "react";
import useSignupStore from "../store/useSignupStore";

const useSignupErrorMessage = () =>{
    const errorMessage = useSignupStore((state) => state.errorMessage)
    const resetErrorMessage = useSignupStore((state) => state.resetErrorMessage)

    useEffect(() => {
        return () => {
            resetErrorMessage()
        }
    }, [resetErrorMessage])

    return errorMessage
}

export default useSignupErrorMessage