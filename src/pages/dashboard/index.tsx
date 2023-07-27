import * as React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@prisma/prisma.client'
import Navbar from '@components/Shared/Navbar'
import Drawer from '@/components/Dashboard/Drawer'
import EmptyState from '@components/Dashboard/EmptyState'
import Thoughts from '@/components/Dashboard/SingleThought'
import { useAtom } from 'jotai'
import { toggleDrawerAtom } from '../../jotai/atom'

export default function Dashboard({ allThoughts }: { allThoughts: any }) {
  const [toggleDrawer, setToggleDrawer] = useAtom(toggleDrawerAtom)

  const { data: session } = useSession()
  const [thoughts, setThoughts] = React.useState<any>(allThoughts)
  const { register, handleSubmit, reset } = useForm()

  const submit = async (dataSubmitted: any) => {
    if (!session || !session.user) return
    const data = {
      thought: dataSubmitted.thought,
      feel: dataSubmitted.feel,
      place: dataSubmitted.place,
    }
    await axios
      .post('/api/addThought', {
        data,
      })
      .then((res) => {
        setThoughts([...thoughts, data])
        reset()
        setTimeout(() => {
          setToggleDrawer(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Navbar {...{ session }} />
      <Thoughts {...{ thoughts, setToggleDrawer }} />
      <Drawer>
        <main className={`flex min-h-screen flex-col max-w-7xl mx-auto`}>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col ">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 mt-5"
              >
                Title of your thought
              </label>
              <div className="mt-2">
                <div className="input-container">
                  <input
                    className="input"
                    {...register('title')}
                    placeholder="What's on your mind?"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your thoughts
              </label>
              <div className="mt-2">
                <div className="input-container">
                  <textarea
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    {...register('thought')}
                    placeholder="What's on your mind?"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your feelings
              </label>
              <div className="mt-4">
                <div className="input-container">
                  <input
                    className="input"
                    {...register('feel')}
                    placeholder="How do you feel?"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Your location
              </label>
              <div className="mt-2">
                <div className="input-container">
                  <input
                    className="input"
                    {...register('feel')}
                    placeholder="Where are you now?"
                  />
                </div>
              </div>
            </div>
            <input
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 mt-5 cursor-pointer"
              type="submit"
            />
          </form>
        </main>
      </Drawer>
    </>
  )
}
export async function getServerSideProps(context: any) {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let allThoughts: any[] = []

  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) return

    allThoughts = await prisma.thoughts.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        thought: true,
        createdAt: true,
        place: true,
        feel: true,
      },
    })
  }
  console.log(allThoughts)
  return {
    props: {
      allThoughts,
    },
  }
}
