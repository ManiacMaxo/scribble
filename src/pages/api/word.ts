import { NextApiRequest, NextApiResponse } from 'next'
import words from './words.json'

const word = (_req: NextApiRequest, res: NextApiResponse): any => {
    const random = Math.round(Math.random() * words.length)
    return res.send(words[random])
}

export default word
