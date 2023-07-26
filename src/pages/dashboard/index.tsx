import * as React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { prisma } from '../../../prisma/prisma.client'
import Navbar from '../../components/Shared/Navbar'
export default function Dashboard({ allPosts }: { allPosts: any }) {
  const { data: session } = useSession()
  const [posts, setPosts] = React.useState<any>(allPosts)
  const { register, handleSubmit } = useForm()

  console.log('session', session)
  const getPosts = async () => {
    if (!session || !session.user) return
    await axios
      .post('/api/getPosts', {
        email: session.user.email,
      })
      .then((res) => {
        setPosts(res.data)
      })
  }

  const submit = async (dataSubmitted: any) => {
    if (!session || !session.user) return
    const data = {
      email: session.user.email,
      post: dataSubmitted.post,
    }
    await axios
      .post('/api/addPost', {
        data,
      })
      .then((res) => {
        setPosts(res.data)
      })
  }

  return (
    <>
      <Navbar {...{ session }} />
      <main className={`flex min-h-screen flex-col max-w-7xl mx-auto`}>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col space-y-5"
        >
          <textarea
            className="border-2 border-black"
            {...register('post')}
            placeholder="post"
          />

          <input type="submit" />
        </form>
        <div className="text-xs">
          {posts && posts?.length > 0 ? (
            posts?.map((post: any) => (
              <div key={post.id} className="bg-slate-200 rounded-md p-2 m-1">
                <h1>name:{post.name}</h1>
                <p>post:{post.post}</p>
              </div>
            ))
          ) : (
            <div className="bg-slate-200 rounded-md p-2 m-1">
              <h1>No posts</h1>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export async function getServerSideProps(context: any) {
  const { req, res } = context
  const session = await getServerSession(req, res, authOptions)

  let allPosts: any[] = []

  if (session && session.user && session.user.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })
    if (!user) return
    allPosts = await prisma.posts.findMany({
      where: {
        userId: user.id,
      },
    })
  }

  return {
    props: {
      allPosts,
    },
  }
}
