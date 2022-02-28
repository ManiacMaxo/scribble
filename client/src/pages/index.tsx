import { Avatar, Layout } from '@/components'
import { UserContext } from '@/contexts'
import { axios } from '@/utils'
import Filter from 'bad-words'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

const Home: React.FC = () => {
    const { name, setName } = useContext(UserContext)
    const router = useRouter()

    const profanityFilter = React.useRef(new Filter())
    const [error, setError] = useState<string | null>(null)

    const joinLobby: any = async () => {
        if (!name) axios.get('/api/word').then((res) => setName(res.data))

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
                                setName(event.target.value)
                            }}
                            onBlur={() => {
                                if (!name) return
                                profanityFilter.current.isProfane(name) &&
                                    setError('Profanity is not allowed')
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
                        <Link href='/create'>
                            <a className='flex-1 btn' role='button'>
                                Create lobby
                            </a>
                        </Link>
                        <button
                            className='flex-1 btn btn-primary'
                            onClick={joinLobby}
                            disabled={!name || !!error}
                        >
                            Join lobby
                        </button>
                        <Link href='/lobbies'>
                            <a className='flex-1 btn' role='button'>
                                All lobbies
                            </a>
                        </Link>
                    </div>

                    <span className='mx-auto mt-2 text-xs text-center select-none w-fit text-neutral group'>
                        Made with love by&nbsp;
                        <a
                            href='https://github.com/ManiacMaxo/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group-hover:underline'
                        >
                            ManiacMaxo
                        </a>
                    </span>
                </div>
            </div>
        </Layout>
    )
}

export default Home
