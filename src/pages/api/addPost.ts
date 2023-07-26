// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../prisma/prisma.client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { post, email } = req.body.data

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  await prisma.posts.create({
    data: {
      userId: user.id,
      post,
    },
  })

  res.status(200).json({ message: 'Post created' })
}
