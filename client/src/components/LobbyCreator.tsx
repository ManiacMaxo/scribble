import { Select } from '@/components'
import { axios } from '@/utils'
import React, { FormEvent, useMemo, useState } from 'react'

interface Props {
    setUrl: any
    setIsCreating: any
}

const MAX_PLAYER_COUNT = 16

const LobbyCreator: React.FC<Props> = (props) => {
    const [players, setPlayers] = useState('9')
    const [isPrivate, setIsPrivate] = useState(true)

    const timeOptions = useMemo(
        () =>
            [...Array(11)].map((_, i) => ({
                value: i * 15 + 30,
                text: `${i * 15 + 30} seconds`
            })),
        []
    )

    const roundsOptions = useMemo(
        () =>
            [...Array(10).keys()].map((val) => ({
                value: val + 1,
                text: `${val + 1} round${val + 1 > 1 ? 's' : ''}`
            })),
        []
    )

    const [time, setTime] = useState(timeOptions[3])
    const [rounds, setRounds] = useState(roundsOptions[5])

    const handleCreate = (e: FormEvent) => {
        e.preventDefault()

        axios
            .post('/api/create', {
                time: time.value,
                rounds: rounds.value,
                players: parseInt(players),
                isPrivate
            })
            .then((res) => {
                props.setUrl(res.data)
                props.setIsCreating(false)
            })
    }

    return (
        <>
            <h1 className='text-3xl'>Create a lobby</h1>
            <form onSubmit={handleCreate} className='flex flex-col gap-2'>
                <div className='flex gap-3'>
                    <Select
                        value={time}
                        onChange={setTime}
                        options={timeOptions}
                        optionText='text'
                        className='flex-1'
                    />

                    <Select
                        value={rounds}
                        onChange={setRounds}
                        options={roundsOptions}
                        optionText='text'
                        className='flex-1'
                    />
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>
                            Max player count (up to {MAX_PLAYER_COUNT})
                        </span>
                    </label>
                    <input
                        type='number'
                        className='input input-primary'
                        min={3}
                        max={MAX_PLAYER_COUNT}
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                    />
                </div>

                <div className='form-control w-max'>
                    <label className='gap-3 cursor-pointer label'>
                        <span className='label-text'>Private lobby</span>
                        <input
                            type='checkbox'
                            className='toggle toggle-primary'
                            checked={isPrivate}
                            onChange={() => setIsPrivate((prev) => !prev)}
                        />
                    </label>
                </div>

                <button type='submit' className='btn btn-primary'>
                    Create
                </button>
            </form>
        </>
    )
}

export { LobbyCreator }
