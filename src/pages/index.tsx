import * as React from 'react'
import { useSession } from 'next-auth/react'
import Navbar from '../components/Shared/Navbar'
import Hero from '../components/Hero'
export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <Navbar {...{ session }} />
      <Hero />
    </>
  )
}
