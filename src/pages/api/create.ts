import { NextApiRequest, NextApiResponse } from 'next'
import { Lobby } from '../../types'

const create = (req: NextApiRequest, res: NextApiResponse): any => {
    const lobby: Lobby = req.body
    return res.send(lobby)
}

export default create
