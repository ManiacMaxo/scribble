import { AppProps } from 'next/app'
import React from 'react'
import UserContextProvider from '../contexts/User'
import 'semantic-ui-css/semantic.min.css'
import '../styles/global.scss'
import { Layout } from '../components'

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <UserContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserContextProvider>
    )
}

export default MyApp
