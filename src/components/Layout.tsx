import Head from 'next/head'
import React from 'react'

type Props = {
    title?: string
}

const Layout: React.FC<Props> = (props) => (
    <div className='main'>
        <Head>
            <title>
                {props.title ?? 'Scribble - Multiplayer Drawing Game'}
            </title>
        </Head>
        {props.children}
    </div>
)

export { Layout }
