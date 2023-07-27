import React from 'react'
type SingleThoughtType = {
  id: string
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
      className="flex max-w-xl flex-col items-start justify-between bg-slate-200 rounded-lg  px-6 py-2"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={singleThought.createdAt} className="text-gray-500">
          {new Intl.DateTimeFormat('en-GB').format(
            singleThought.createdAt as any
          )}
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <div>
            <span className="absolute inset-0" />
            {singleThought.thought}
            {singleThought?.feel}
          </div>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {singleThought?.feel}
        </p>
      </div>
    </article>
  )
}
