import { useState } from 'react'
import Image from 'next/image'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="">
      <div className="px-6 pt-14 lg:px-8 relative">
        <div>
          <Image
            src="/patterns-taieri/p1.svg"
            alt="p1"
            width="0"
            height="0"
            className="w-full h-32 "
          />
        </div>
        <div className="mx-auto max-w-2xl py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Don't share your thoughts with the world.
            </h1>
            <p className="mt-6 text-lg leading-7 text-gray-600">
              In a world where everyone is sharing their thoughts, we believe
              that you should keep your thoughts to yourself. <br /> We are a
              subscription based service that allows you to keep your thoughts
              to yourself.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-[#FFB017] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FFB017] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
