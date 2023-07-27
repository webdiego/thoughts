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
import { useAtom } from 'jotai'
import { toggleDrawerAtom } from '../../jotai/atom'

export default function Dashboard({ allThoughts }: { allThoughts: any }) {
  const [toggleDrawer, setToggleDrawer] = useAtom(toggleDrawerAtom)

  const { data: session } = useSession()
  const [thoughts, setThoughts] = React.useState<any>(allThoughts)
  const { register, handleSubmit } = useForm()

  const submit = async (dataSubmitted: any) => {
    if (!session || !session.user) return

    console.log(dataSubmitted)
    const data = {
      thought: dataSubmitted.thought,
    }
    // await axios
    //   .post('/api/addThought', {
    //     data,
    //   })
    //   .then((res) => {
    //     setThoughts(res.data)
    //   })
  }

  return (
    <>
      <Navbar {...{ session }} />

      <div className="text-xs">
        {thoughts && thoughts?.length > 0 ? (
          <div className="max-w-2xl mx-auto px-6 py-10">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center mb-10">
              These are your thoughts, only you can see them.
            </h1>
            <div>
              <button
                onClick={() => setToggleDrawer(true)}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 mt-5 cursor-pointer"
              >
                Add a thought
              </button>
            </div>
            {thoughts?.map(
              ({ id, thought }: { id: string; thought: string }) => (
                <div key={id} className="bg-slate-200 rounded-md px-4 py-2 m-1">
                  <p>post:{thought}</p>
                </div>
              )
            )}
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
      <Drawer>
        <main className={`flex min-h-screen flex-col max-w-7xl mx-auto`}>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col ">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your thoughts
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <textarea
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  {...register('thought')}
                  placeholder="What's on your mind?"
                />
              </div>
            </div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 mt-5"
            >
              Your feelings
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  className="relative block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  {...register('feel')}
                  placeholder="How do you feel?"
                />
                {/* <div className="absolute">
                  <InputEmoji
          value={text}
          onChange={setText}
          cleanOnEnter
          onEnter={handleOnEnter}
          placeholder="Type a message"
        />
                </div> */}
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
        thought: true,
      },
    })
  }

  return {
    props: {
      allThoughts,
    },
  }
}
