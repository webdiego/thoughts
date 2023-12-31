import React, { Dispatch } from 'react'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Session } from 'next-auth'
//Types
import { ThoughtType } from '@/types/dashboard'

const validationSchema = z.object({
  title: z.string().min(1, { message: 'Write a title of your thought' }),
  thought: z.string().min(1, { message: 'What are you thinking?' }),
  place: z.string().min(1, { message: 'Where are you?' }),
  feel: z.string().min(1, { message: 'How do you feel?' }),
})

type ValidationSchema = z.infer<typeof validationSchema>

export default function ThoughtForm({
  session,
  setThoughts,
  setToggleDrawer,
}: {
  session: Session
  setThoughts: Dispatch<ThoughtType> | any
  setToggleDrawer: Dispatch<boolean>
}) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted, isSubmitting, errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  })

  const submit = async (data: any) => {
    if (!session || !session.user) return

    const { title, thought, place, feel } = data

    await axios
      .post('/api/addThought', {
        title,
        thought,
        place,
        feel,
      })
      .then((res) => {
        let newThoughts = [...res.data.thoughts]
        setThoughts(newThoughts)
        setTimeout(() => {
          reset()
          setToggleDrawer(false)
        }, 2000)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          router.push('/api/auth/signIn')
        }
      })
  }

  return (
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
                placeholder="What's the title?"
              />
            </div>
            {errors.title && (
              <p className="text-xs italic text-red-500 mt-2">
                {' '}
                {errors.title?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Your thoughts
          </label>
          <div className="mt-2">
            <div className="input-container">
              <textarea
                className="textarea"
                {...register('thought')}
                placeholder="What's on your mind?"
              />
            </div>
            {errors.thought && (
              <p className="text-xs italic text-red-500 mt-2">
                {' '}
                {errors.thought?.message}
              </p>
            )}
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
            {errors.feel && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.feel?.message}
              </p>
            )}
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
                {...register('place')}
                placeholder="Where are you now?"
              />
            </div>
            {errors.place && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.place?.message}
              </p>
            )}
          </div>
        </div>
        {!isSubmitting && !isSubmitted && (
          <input className="btn-primary mt-5 cursor-pointer" type="submit" />
        )}
        {isSubmitting && (
          <button className="btn-primary mt-5 cursor-not-allowed" disabled>
            Saving...
          </button>
        )}
        {isSubmitted && (
          <button
            className="rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 mt-5 cursor-not-allowed"
            disabled
          >
            Saved!
          </button>
        )}
      </form>
    </main>
  )
}
