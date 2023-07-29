import React from 'react'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@prisma/prisma.client'
import { Session } from 'next-auth'
import Profile from '@components/Dashboard/Profile'
import Navbar from '@components/Shared/Navbar'

export default function ProfilePage({ newSession }: { newSession: Session }) {
  let session = newSession
  return (
    <>
      <Navbar {...{ session }} />
      <Profile {...{ session }} />
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  console.log(session)
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signIn',
        permanent: false,
      },
    }
  }

  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      return {
        redirect: {
          destination: '/auth/signIn',
          permanent: false,
        },
      }
    }
  }

  return {
    props: {
      newSession: session,
    },
  }
}
