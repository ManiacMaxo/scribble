import { Layout } from '@/components'
import { axios } from '@/utils'
import { Lobby } from '@/utils/types'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FaMapMarker } from 'react-icons/fa'

interface Props {
    lobbies: Lobby[]
}

const Lobbies: NextPage<Props> = ({ lobbies }) => {
    const router = useRouter()

    return (
        <Layout>
            <div className='default-card'>
                {lobbies.length ? (
                    <ul className='flex flex-col gap-5'>
                        {lobbies.map((lobby) => (
                            <li
                                key={lobby.id}
                                className='flex items-center gap-4'
                            >
                                <FaMapMarker className='text-3xl' />
                                <div className='flex-1'>
                                    <h3>{lobby.name}</h3>
                                    <span>
                                        players: {lobby.users}/{lobby.maxUsers}{' '}
                                        round: {lobby.round}/{lobby.maxRounds}
                                    </span>
                                </div>
                                <button
                                    className='btn btn-sm'
                                    onClick={() =>
                                        router.push(`/play/${lobby.id}`)
                                    }
                                    disabled={lobby.users === lobby.maxUsers}
                                >
                                    {lobby.users === lobby.maxUsers ? (
                                        <strong>Full</strong>
                                    ) : (
                                        'Join'
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <h3 className='text-lg'>
                            There are currently no active public lobbies
                        </h3>
                        <Link href='/create'>
                            <a
                                className='btn btn-primary w-max self-end'
                                role='button'
                            >
                                Create a lobby
                            </a>
                        </Link>
                    </>
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try {
        const { data } = await axios.get<Array<Lobby>>('/api/lobbies', {
            params: { n: 20 }
        })

        return {
            props: {
                lobbies: data
            }
        }
    } catch (error) {
        return {
            props: {
                lobbies: [
                    // {
                    //     id: 'something',
                    //     name: 'Something went wrong',
                    //     users: 1,
                    //     maxUsers: 2,
                    //     round: 1,
                    //     maxRounds: 2
                    // },
                    // {
                    //     id: 'something',
                    //     name: 'Something went wrong',
                    //     users: 1,
                    //     maxUsers: 2,
                    //     round: 1,
                    //     maxRounds: 2
                    // }
                ]
            }
        }
    }
}

export default Lobbies
