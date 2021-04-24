import { NextApiRequest, NextApiResponse } from 'next'

const lobbies = (_req: NextApiRequest, res: NextApiResponse): any => {
    return res.send('hello world')
}

export default lobbies
