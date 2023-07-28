import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export default function ThoughtForm({
  session,
  thoughts,
  setThoughts,
  setToggleDrawer,
}: {
  session: any
  thoughts: any
  setThoughts: any
  setToggleDrawer: any
}) {
  const { register, handleSubmit, reset } = useForm()

  const submit = async (dataSubmitted: any) => {
    if (!session || !session.user) return
    const data = {
      title: dataSubmitted.title,
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
        }, 500)
      })
      .catch((err) => {
        console.log(err)
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
                {...register('place')}
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
  )
}
