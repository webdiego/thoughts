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

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  console.log('user', user)
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  })

  res.status(200).json({ message: 'Account Deleted' })
}
