import React from 'react'
import { Session } from 'next-auth'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import ThinkIcon from 'public/think.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar({ session }: { session: Session | null }) {
  const router = useRouter()
  return (
    <div className="bg-white py-3 z-[200] border-b shadow-sm fixed w-full top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 ">
        <div className="w-1/3 flex items-center justify-start">
          <Link href="/">
            <Image src={ThinkIcon} width={32} height={32} alt="think" />
          </Link>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          {session && session.user && router.pathname !== '/dashboard' && (
            <Link href="/dashboard" className="font-semibold">
              Dashboard
            </Link>
          )}
        </div>
        <div className="w-1/3 flex items-center justify-end">
          {session && session.user ? (
            <div className="flex items-center space-x-5">
              {/* <p className="text-sm">{session.user.email}</p> */}
              <Image
                src={session.user.image ?? ''}
                width={40}
                height={40}
                alt="user"
                className="rounded-full"
              />
              <button
                className="bg-red-400 text-sm font-medium px-3 py-1 rounded-lg text-white"
                onClick={() =>
                  signOut({
                    callbackUrl: 'http://localhost:3000',
                  })
                }
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <a
                className="bg-orange-400 text-sm font-medium px-3 py-1 rounded-lg text-white"
                href="/auth/signIn"
              >
                Sign in
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
