import React, { Dispatch } from 'react'
import EmptyState from '../EmptyState'
import ThoughtCard from './ThoughtCard'

//Types
import { ThoughtType } from '@/types/dashboard'

import { sortByNewest, sortByOldest } from '@utils/index'

export default function Thoughts({
  thoughts,
  setToggleDrawer,
}: {
  thoughts: [] | ThoughtType[]
  setToggleDrawer: Dispatch<boolean>
}) {
  const [sort, setSort] = React.useState('descend')

  if (sort === 'descend') {
    sortByNewest(thoughts)
  } else {
    sortByOldest(thoughts)
  }

  return (
    <>
      {thoughts && thoughts?.length > 0 ? (
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="py-10 flex flex-col items-start md:items-center">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 ">
              These are your thoughts, only you can see them.
            </h1>
            <div>
              <button
                onClick={() => setToggleDrawer(true)}
                type="button"
                className="btn-primary mt-5"
              >
                + Add a new thought
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between w-max py-5">
              <button
                className={`mr-2 ${
                  sort === 'descend' ? 'btn-active' : 'btn-inactive'
                }`}
                onClick={() => setSort('descend')}
              >
                Newer
              </button>
              <button
                className={`${
                  sort === 'ascend' ? 'btn-active' : 'btn-inactive'
                }`}
                onClick={() => setSort('ascend')}
              >
                Oldest
              </button>
            </div>
          </div>

          <div className="space-y-10">
            {thoughts?.map((singleThought: ThoughtType, i: number) => (
              <div key={i}>
                <ThoughtCard {...{ singleThought }} />
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
