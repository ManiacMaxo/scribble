import { AppProps } from 'next/app'
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Layout } from '../components'
import LobbyContextProvider from '../contexts/Lobby'
import UserContextProvider from '../contexts/User'
import '../styles/global.scss'

const AppWrapper = ({ Component, pageProps }: AppProps) => {
    return (
        <UserContextProvider>
            <LobbyContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LobbyContextProvider>
        </UserContextProvider>
    )
}

export default AppWrapper
