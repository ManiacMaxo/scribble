import Head from 'next/head'
import React, { ReactNode } from 'react'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({
    children,
    title = 'Scribble - Multiplayer Drawing Game'
}: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet='utf-8' />
            <meta
                name='viewport'
                content='initial-scale=1.0, width=device-width'
            />
        </Head>
        <div className='main'>{children}</div>
    </div>
)

export { Layout }
