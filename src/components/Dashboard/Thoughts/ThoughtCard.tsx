import React from 'react'
import Image from 'next/image'
//Types
import { ThoughtType } from '@/types/dashboard'

export default function ThoughtCard({
  singleThought,
}: {
  singleThought: ThoughtType
}) {
  return (
    <article
      key={singleThought.id}
      className="flex max-w-xl flex-col items-start justify-between rounded-lg px-6 py-4 relative bg-gradient-to-br from-black to-slate-700"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={singleThought.createdAt} className="text-gray-500">
          {/* {new Intl.DateTimeFormat('en-GB').format(
            singleThought.createdAt as unknown as Date
          )} */}
        </time>
      </div>
      <div className="max-w-lg text-sm mr-auto group-hover:text-black text-white w-full">
        <h3 className="mt-3 text-lg font-semibold">{singleThought.title}</h3>
        <p className="">{singleThought.thought}</p>
        <div className="mt-3 text-gray-400 flex justify-between w-full">
          <p>
            I was in
            <span className="ml-1">
              {singleThought.place.toLocaleLowerCase()} and felt{' '}
              {singleThought.feel.toLocaleLowerCase()}
            </span>
          </p>
        </div>
      </div>
      <div className="absolute -top-5 -right-2 transform rotate-90 grayscale group-hover:grayscale-0 drop-shadow-2xl">
        <Image
          src="/patterns-taieri/p-thought.svg"
          width={60}
          height={60}
          alt=""
        />
      </div>
    </article>
  )
}
