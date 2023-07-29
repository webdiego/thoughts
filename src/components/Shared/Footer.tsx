import React from 'react'
import Link from 'next/link'
export default function Footer() {
  return (
    <div className="border-t max-w-2xl mx-auto text-center">
      <p className="py-5 text-sm  ">
        Made with 🖤 by{' '}
        <Link
          href="https://diego-massarini.vercel.app/"
          className="underline decoration-dotted"
        >
          Diego Massarini
        </Link>
      </p>
    </div>
  )
}
