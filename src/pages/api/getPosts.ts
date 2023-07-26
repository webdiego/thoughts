// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma.client'
import { authOptions } from '../api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions)
  console.log('session', session)

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }
  const { email } = req.body
  console.log('email', email)
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  // Get all posts from the user
  const posts = await prisma.posts.findMany({
    where: {
      userId: user.id,
    },
  })

  res.status(200).json({ posts })
}
