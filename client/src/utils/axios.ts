import Axios from 'axios'
import { toast } from 'react-toastify'

export const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT
})

axios.interceptors.response.use(
    (res) => {
        if (process.env.NODE_ENV === 'development') console.log(res.data)
        return res
    },
    (error) => {
        toast.error(error.message ?? 'Network error')
    }
)
