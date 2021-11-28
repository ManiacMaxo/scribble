import Head from 'next/head'
import React from 'react'

type Props = {
    title?: string
}

const Layout: React.FC<Props> = (props) => {
    const { title = 'Scribble - Multiplayer Drawing Game' } = props

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Multiplayer Drawing Game' />
            </Head>
            {props.children}
        </>
    )
}

export { Layout }
