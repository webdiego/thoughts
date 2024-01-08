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
    return res.status(401).json({ message: 'Unauthenticated' })
  }

  const { title, thought, place, feel } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  await prisma.thoughts.create({
    data: {
      userId: user.id,
      title,
      thought,
      place,
      feel,
    },
  })

  let thoughts = await prisma.thoughts.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      thought: true,
      createdAt: true,
      place: true,
      feel: true,
    },
  })

  res.status(200).json({ message: 'Post created', thoughts })
}
