import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
export default function Navbar({ session }: { session: any }) {
  return (
    <div className="bg-[#007AA0] py-3 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 ">
        <div className="w-[40px] h-[40px] rounded-full bg-orange-400" />
        <div>
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
              <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-violet-100">
                <svg
                  className="h-full w-full text-violet-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <button
                className="bg-orange-500 text-sm font-medium px-3 py-1 rounded-lg text-white"
                onClick={() =>
                  signIn('google', {
                    callbackUrl: 'http://localhost:3000/dashboard',
                  })
                }
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
