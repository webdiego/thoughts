import * as React from 'react'
import Navbar from '@components/Shared/Navbar'
import Hero from '@components/Hero'
import Feature from '@components/Feature'
import Footer from '@components/Shared/Footer'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

export default function Home({ newSession }: { newSession: Session | null }) {
  let session = newSession
  return (
    <>
      <Navbar {...{ session }} />
      <Hero {...{ session }} />
      <Feature />
      <Footer />
    </>
  )
}
export async function getServerSideProps(context: any) {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  return {
    props: {
      newSession: session,
    },
  }
}
