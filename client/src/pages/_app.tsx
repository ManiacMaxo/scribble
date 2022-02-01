import { Layout } from '@/components'
import { LobbyContextProvider, UserContextProvider } from '@/contexts'
import { AppProps } from 'next/app'
import 'rc-slider/assets/index.css'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import 'semantic-ui-css/semantic.min.css'
import '@/styles/global.scss'

const AppWrapper: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <UserContextProvider>
            <LobbyContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <ToastContainer autoClose={4000} position='bottom-right' />
            </LobbyContextProvider>
        </UserContextProvider>
    )
}

export default AppWrapper
