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

//Types
import { ThoughtType } from '@/types/dashboard'

export default function Dashboard({
  allThoughts,
}: {
  allThoughts: ThoughtType[] | []
}) {
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
  }, [allThoughts, setThoughts])

  return (
    <>
      <Navbar {...{ session }} />
      {loading && <Loading />}
      {!loading && (
        <div className="min-h-screen h-full relative w-full">
          <div className="bg-[url('/patterns-taieri/p-thought.svg')] bg-center bg-contain bg-repeat  absolute top-0 left-0 min-h-screen h-full hidden lg:block w-52  -z-10 -translate-x-10">
            <div className="h-full bg-gradient-to-l from-white to-transparent absolute left-0 bottom-0 w-full" />
          </div>

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
        destination: '/auth/signIn',
        permanent: false,
      },
    }
  }

  let allThoughts: ThoughtType | ThoughtType[] = []

  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) return

    allThoughts = (await prisma.thoughts.findMany({
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
    })) as ThoughtType[] | []
  }
  return {
    props: {
      allThoughts,
    },
  }
}
