import Image from 'next/image'
import { motion } from 'framer-motion'
import { Session } from 'next-auth'
export default function Hero({ session }: { session: Session | null }) {
  const variantsBlur = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  }
  return (
    <div className="px-6 pt-32 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative transition-all opacity-1"
      >
        <Image
          src="/patterns-taieri/p1.svg"
          alt="p1"
          width="0"
          height="0"
          className="w-full h-32"
        />
        <div className="h-2/3 bg-gradient-to-t from-white to-transparent absolute left-0 bottom-0 w-full" />
      </motion.div>
      <div className="mx-auto max-w-2xl py-20">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.3 }}
          variants={variantsBlur}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Don't share your thoughts with the world.
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-600">
            In a world where everyone is sharing their thoughts, we believe that
            you should keep your thoughts to yourself.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={session ? '/dashboard' : '/auth/signIn'}
              className="rounded-md bg-[#FFB017] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FFB017] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a
              href="/#features"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
