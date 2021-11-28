import { axios } from '@/utils'
import React, { FormEvent, useState } from 'react'
import { Button, Checkbox, Form, Select } from 'semantic-ui-react'

interface Props {
    setUrl: any
    setIsCreating: any
}

const LobbyCreator: React.FC<Props> = (props) => {
    const [time, setTime] = useState(120)
    const [rounds, setRounds] = useState(6)
    const [players, setPlayers] = useState('9')
    const [isPrivate, setIsPrivate] = useState(true)

    const timesOptions = []
    for (let i = 30; i <= 180; i += 15) {
        timesOptions.push({
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
            <h1>Create a lobby</h1>
            <Form onSubmit={handleCreate}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Select
                            id='time'
                            placeholder='Select max round time'
                            options={timesOptions}
                            value={time}
                            onChange={(_event, data) =>
                                setTime(
                                    typeof data.value === 'number'
                                        ? data.value
                                        : 90
                                )
                            }
                        />
                    </Form.Field>
                    <Form.Field>
                        <Select
                            id='rounds'
                            placeholder='Select number of rounds'
                            options={roundsOptions}
                            value={rounds}
                            onChange={(_event, data) =>
                                setRounds(
                                    typeof data.value === 'number'
                                        ? data.value
                                        : 5
                                )
                            }
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Input
                    label='Max player count(up to 15)'
                    type='number'
                    max={15}
                    min={3}
                    value={players}
                    onChange={(_e, data) => setPlayers(data.value)}
                />

                <Form.Field>
                    <Checkbox
                        toggle
                        checked={isPrivate}
                        onChange={() => setIsPrivate((prev) => !prev)}
                        label='Private lobby'
                    />
                </Form.Field>
                <Button type='submit' primary>
                    Create
                </Button>
            </Form>
        </>
    )
}

export { LobbyCreator }
