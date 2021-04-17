import React, { FormEvent, useState } from 'react'
import { Button, Checkbox, Form, Select, Step } from 'semantic-ui-react'

const Create = (): JSX.Element => {
    const [isCreating, setIsCreating] = useState<boolean>(true)
    const [time, setTime] = useState<number>(90)
    const [rounds, setRounds] = useState<number>(5)
    const [isPrivate, setIsPrivate] = useState<boolean>(true)
    const timesOptions = []
    const roundsOptions = []

    for (let i = 30; i <= 180; i += 15) {
        timesOptions.push({
            value: i,
            text: `${i} seconds`
        })
    }

    for (let i = 3; i <= 12; i++) {
        roundsOptions.push({
            value: i,
            text: `${i} rounds`
        })
    }

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault()
        setIsCreating(false)
        console.log(time, rounds, isPrivate)
        const res = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                time,
                rounds,
                isPrivate
            })
        })
        console.log(res)
    }
    return (
        <>
            <Step.Group ordered>
                <Step active={isCreating} completed={!isCreating}>
                    <Step.Content>
                        <Step.Title>Settings</Step.Title>
                        <Step.Description>
                            Choose your game options
                        </Step.Description>
                    </Step.Content>
                </Step>

                <Step active={!isCreating}>
                    <Step.Content>
                        <Step.Title>Invite players</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            <div className='default-card'>
                <h1>Create a lobby</h1>
                <Form onSubmit={handleCreate}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <Select
                                placeholder='Select max round time'
                                options={timesOptions}
                                value={time}
                                onChange={(e, data) =>
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
                                placeholder='Select number of rounds'
                                options={roundsOptions}
                                value={rounds}
                                onChange={(e, data) =>
                                    setRounds(
                                        typeof data.value === 'number'
                                            ? data.value
                                            : 5
                                    )
                                }
                            />
                        </Form.Field>
                    </Form.Group>
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
            </div>
        </>
    )
}

export default Create
