import Axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
})

interface AxiosErrorResponse {
    message: string
}

axios.interceptors.response.use(
    (res) => {
        if (process.env.NODE_ENV === 'development') console.log(res.data)
        return res
    },
    (error: AxiosError<AxiosErrorResponse>) => {
        toast.error(error.response?.data.message ?? 'Network error')
    }
)
