import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma.client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user || !session.user.email) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  const { thought, place, feel } = req.body.data
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  await prisma.thoughts.create({
    data: {
      userId: user.id,
      thought,
      place,
      feel,
    },
  })

  res.status(200).json({ message: 'Post created' })
}
