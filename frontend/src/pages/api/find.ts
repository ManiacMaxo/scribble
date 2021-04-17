import { NextApiRequest, NextApiResponse } from 'next'

const findLobby = (req: NextApiRequest, res: NextApiResponse): any => {
    return res.json({
        lobby: '123'
    })
}

export default findLobby
