import { NextApiRequest, NextApiResponse } from 'next'

const hello = (_req: NextApiRequest, res: NextApiResponse): any => {
    return res.send('hello world')
}

export default hello
