import { ThemeContext } from '@/contexts'
import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import { BiHomeAlt, BiMoon, BiSun } from 'react-icons/bi'

type Props = {
    title?: string
}

const Layout: React.FC<Props> = (props) => {
    const { title = 'Scribble - Multiplayer Drawing Game' } = props

    const { theme, setTheme } = useContext(ThemeContext)
    const ThemeIcon = theme === 'light' ? BiMoon : BiSun

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Multiplayer Drawing Game' />
            </Head>
            <div className='absolute flex flex-row items-start gap-1 xl:flex-col top-4 left-4'>
                <Link href='/'>
                    <a className='py-1 btn btn-outline'>
                        <BiHomeAlt className='text-xl' />
                    </a>
                </Link>
                <button
                    className='btn btn-outline'
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                    <ThemeIcon className='text-xl' />
                </button>
            </div>

            <main className='flex flex-col items-center justify-center min-h-screen'>
                {props.children}
            </main>
        </>
    )
}

export { Layout }
