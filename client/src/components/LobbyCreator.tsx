import { axios } from '@/utils'
import React, { FormEvent, useState } from 'react'

interface Props {
    setUrl: any
    setIsCreating: any
}

const LobbyCreator: React.FC<Props> = (props) => {
    const [time, setTime] = useState(120)
    const [rounds, setRounds] = useState(6)
    const [players, setPlayers] = useState('9')
    const [isPrivate, setIsPrivate] = useState(true)

    const timeOptions = []
    for (let i = 30; i <= 180; i += 15) {
        timeOptions.push({
            value: i,
            text: `${i} seconds`
        })
    }

    const roundsOptions = []
    for (let i = 1; i <= 10; i++) {
        roundsOptions.push({
            value: i,
            text: `${i} round${i !== 1 ? 's' : ''}`
        })
    }

    const handleCreate = (e: FormEvent) => {
        e.preventDefault()

        axios
            .post('/api/create', {
                time,
                rounds,
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
                    <select
                        name='time'
                        id='time'
                        className='select select-primary flex-1'
                        placeholder='Select max round time'
                        value={time}
                        onChange={(e) => setTime(e.target.value as any)}
                    >
                        {timeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>

                    <select
                        className='select select-primary flex-1'
                        name='rounds'
                        id='rounds'
                        placeholder='Select number of rounds'
                        value={rounds}
                        onChange={(e) => setRounds(e.target.value as any)}
                    >
                        {roundsOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='form-control'>
                    <label className='label'>
                        <span className='label-text'>
                            Max player count(up to 15)
                        </span>
                    </label>
                    <input
                        type='number'
                        className='input input-primary'
                        min={3}
                        max={15}
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                    />
                </div>

                <div className='form-control w-max'>
                    <label className='cursor-pointer label gap-3'>
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
