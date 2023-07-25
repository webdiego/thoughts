// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma.client'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await prisma.user.create({
    data: {
      email: 'diego@mail.com',
      name: 'Diego',
    },
  })
  res.status(200).json({ name: 'John Doe' })
}
