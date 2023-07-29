import * as React from 'react'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@prisma/prisma.client'
//Components
import Navbar from '@components/Shared/Navbar'
import Drawer from '@components/Dashboard/Drawer'
import Thoughts from '@/components/Dashboard/Thoughts/Thoughts'
import ThoughtForm from '@/components/Dashboard/Thoughts/ThoughtForm'
import Loading from '@components/Shared/Loading'
//Jotai
import { useAtom } from 'jotai'
import { toggleDrawerAtom, thoughtsAtom } from '../../jotai/atom'

export default function Dashboard({ allThoughts }: { allThoughts: any }) {
  const { data: session } = useSession() as { data: Session }
  const [loading, setLoading] = React.useState(true)
  const [, setToggleDrawer] = useAtom(toggleDrawerAtom)

  const [thoughts, setThoughts] = useAtom(thoughtsAtom)

  React.useEffect(() => {
    if (allThoughts) setThoughts(allThoughts)

    let loadingEffect = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => {
      clearTimeout(loadingEffect)
    }
  }, [allThoughts])

  return (
    <>
      <Navbar {...{ session }} />
      {loading && <Loading />}
      {!loading && (
        <div className="min-h-screen h-full relative w-full">
          <div className="bg-[url('/patterns-taieri/p-thought.svg')] bg-center bg-contain bg-repeat  absolute top-0 left-0 min-h-screen h-full hidden lg:block w-52 blur-sm -z-10" />
          <>
            <Thoughts {...{ thoughts, setToggleDrawer }} />
            <Drawer>
              <ThoughtForm
                {...{ session, thoughts, setThoughts, setToggleDrawer }}
              />
            </Drawer>
          </>
        </div>
      )}
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
        title: true,
        thought: true,
        createdAt: true,
        place: true,
        feel: true,
      },
    })
  }
  return {
    props: {
      allThoughts,
    },
  }
}
