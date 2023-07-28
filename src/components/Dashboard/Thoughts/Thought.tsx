import React from 'react'
import Image from 'next/image'

type SingleThoughtType = {
  id: string
  title: string
  thought: string
  place?: string
  createdAt: string
  feel?: string
}

export default function SingleThought({
  singleThought,
}: {
  singleThought: SingleThoughtType
}) {
  return (
    <article
      key={singleThought.id}
      className="flex max-w-xl flex-col items-start justify-between bg-gradient-to-br rounded-lg px-6 py-4 relative group
      transition-all duration-500 ease-in-out
      from-black/90 via-black/80 to-black/50 hover:from-red-200 hover:via-yellow-200 hover:to-blue-200 cursor-pointer"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={singleThought.createdAt} className="text-gray-500">
          {new Intl.DateTimeFormat('en-GB').format(
            singleThought.createdAt as any
          )}
        </time>
      </div>
      <div className="max-w-lg text-sm mr-auto group-hover:text-black text-white">
        <h3 className="mt-3 text-lg font-semibold">{singleThought.title}</h3>
        <p className="">{singleThought.thought}</p>
        <div className="mt-3  text-gray-400">
          I was in
          <span className="ml-1">
            {singleThought?.place} and {singleThought?.feel}
          </span>
        </div>
      </div>
      <div className="absolute -top-10 -right-2 transform rotate-90 grayscale group-hover:grayscale-0 drop-shadow-2xl">
        <Image
          src="/patterns-taieri/p-thought.svg"
          width={80}
          height={80}
          alt=""
        />
      </div>
    </article>
  )
}
