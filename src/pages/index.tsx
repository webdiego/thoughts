import Image from 'next/image'
import Hero from '../components/Hero'
import Stack from '../components/Stack'
import { prisma } from '../../prisma/prisma.client'

export default function Home() {
  const addUsers = async () => {
    await fetch('/api/addUser', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <button
        className="bg-red-600 z-10 px-2 py-1 rounded-lg text-white"
        onClick={addUsers}
      >
        Add User
      </button>
      <Hero />
      <Stack />
    </main>
  )
}
