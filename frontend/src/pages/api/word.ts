import { NextApiRequest, NextApiResponse } from 'next'
import wordsJson from '../../words.json'

const word = (_req: NextApiRequest, res: NextApiResponse): any => {
    const randomWord = wordsJson[Math.round(Math.random() * wordsJson.length)]
    return res.send(randomWord)
}

export default word
