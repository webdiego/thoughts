import React from 'react'
import { Session } from 'next-auth'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import ThinkIcon from 'public/think.svg'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar({ session }: { session: Session | null }) {
  const [open, setOpen] = React.useState(false)
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
          {!session && (
            <div className="flex items-center space-x-5">
              <a
                className="bg-orange-400 text-sm font-medium px-3 py-1 rounded-lg text-white"
                href="/auth/signIn"
              >
                Sign in
              </a>
            </div>
          )}
          {session && session.user && (
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div
                  onClick={() => setOpen(!open)}
                  className="focus:outline-none focus:ring focus:ring-violet-300 rounded-full border-2 border-black/70"
                >
                  <Image
                    src={session.user.image ?? ''}
                    width={40}
                    height={40}
                    alt="user"
                    className="rounded-full cursor-pointer"
                  />
                </div>
                <div
                  className={`${
                    open ? 'absolute' : 'hidden'
                  } w-72 mt-1 min-w-auto border-2 bg-black/90 right-0 py-2 rounded-lg px-2`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-200">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {session.user.email}
                      </p>
                    </div>
                    <Link href="/dashboard/profile">
                      <Cog6ToothIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                  <button
                    className="bg-red-400 text-sm font-medium px-3 py-1 rounded-md text-white w-full mt-2"
                    onClick={() =>
                      signOut({
                        callbackUrl: 'http://localhost:3000',
                      })
                    }
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
