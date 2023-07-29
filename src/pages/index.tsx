import * as React from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '@components/Shared/Navbar'
import Hero from '@components/Hero'
import Feature from '@components/Feature'
export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Navbar {...{ session }} />
      <Hero />
      <Feature />
    </>
  )
}
