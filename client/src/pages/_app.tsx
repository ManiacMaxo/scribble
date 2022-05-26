import { ThemeProvider } from '@/contexts'
import '@/styles/global.css'
import { AppProps } from 'next/app'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const AppWrapper: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
            <ToastContainer autoClose={4000} position='bottom-right' />
        </ThemeProvider>
    )
}

export default AppWrapper
