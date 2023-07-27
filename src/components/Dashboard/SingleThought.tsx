import React from 'react'
import EmptyState from './EmptyState'
import SingleThought from './Thought'

type SingleThoughtType = {
  id: string
  thought: string
  place?: string
  createdAt: string
  feel?: string
}

export default function Thoughts({
  thoughts,
  setToggleDrawer,
}: {
  thoughts: any
  setToggleDrawer: any
}) {
  return (
    <>
      {thoughts && thoughts?.length > 0 ? (
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="py-10 flex flex-col items-start">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
              These are your thoughts, only you can see them.
            </h1>
            <div>
              <button
                onClick={() => setToggleDrawer(true)}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 mt-5"
              >
                Add a thought
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {thoughts?.map((singleThought: SingleThoughtType, i: number) => (
              <div key={i}>
                <SingleThought {...{ singleThought }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  )
}
