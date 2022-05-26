import { Avatar, Layout } from '@/components'
import { useUser } from '@/store/user'
import { axios } from '@/utils'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Home: NextPage = () => {
    const name = useUser((s) => s.name)
    const router = useRouter()

    const [error, setError] = useState<string | null>(null)

    const joinLobby: any = async () => {
        if (!name)
            axios
                .get('/api/word')
                .then((res) => useUser.setState({ name: res.data }))

        if (router.query.lobby) router.push(`/play/${router.query.lobby}`)

        axios.get('/api/find').then((res) => {
            if (res.status !== 200) return
            const lobby = res.data
            router.push(`/play/${lobby}`)
        })
    }

    return (
        <Layout>
            <div className='container'>
                <div className='default-card'>
                    <Avatar />
                    <div className='form-control'>
                        <input
                            className={`input ${
                                error ? 'input-error' : 'input-primary'
                            }`}
                            placeholder='Enter your name'
                            value={name ?? ''}
                            onChange={(event) => {
                                error && setError(null)
                                useUser.setState({ name: event.target.value })
                            }}
                            spellCheck='false'
                        />
                        {error && (
                            <span className='label text-error-content'>
                                {error}
                            </span>
                        )}
                    </div>
                    <div className='divider'>play</div>
                    <div className='btn-group'>
                        <Link href='/create' passHref>
                            <a
                                className='btn flex-1 focus:z-[1]'
                                tabIndex={0}
                                role='button'
                            >
                                Create lobby
                            </a>
                        </Link>
                        <button
                            className='btn btn-primary flex-1 focus:z-[1]'
                            onClick={joinLobby}
                            disabled={!name || !!error}
                        >
                            Join lobby
                        </button>
                        <Link href='/lobbies' passHref>
                            <a
                                className='btn flex-1 focus:z-[1]'
                                tabIndex={0}
                                role='button'
                            >
                                All lobbies
                            </a>
                        </Link>
                    </div>

                    <footer className='text-neutral group mx-auto mt-2 w-fit select-none text-center text-xs'>
                        Made with love by&nbsp;
                        <a
                            href='https://github.com/ManiacMaxo/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group-hover:underline'
                        >
                            ManiacMaxo
                        </a>
                    </footer>
                </div>
            </div>
        </Layout>
    )
}

export default Home
