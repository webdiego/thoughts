import React from 'react'
import FreedomIcon from './Icons/FreedomIcon'
import PenIcon from './Icons/PenIcon'
import SecureIcon from './Icons/SecureIcon'
import LeafIcon from './Icons/LeafIcon'
import { motion, useInView } from 'framer-motion'
const features = [
  {
    name: 'Write your ideas',
    description:
      'Write your ideas, sometimes you can forget them and you will never know if they were good or not.',
    icon: PenIcon,
    backgroundIcon: 'bg-[#FFB017]',
  },
  {
    name: 'Google authentication',
    description: 'Access your thoughts from anywhere with your Google account.',
    icon: SecureIcon,
    backgroundIcon: 'bg-red-500',
  },
  {
    name: 'Detox your mind',
    description:
      'Writing your thoughts is can detox your mind, sometimes you can feel overwhelmed by your thoughts.',
    icon: LeafIcon,
    backgroundIcon: 'bg-green-500',
  },
  {
    name: 'Write your dreams',
    description:
      'You can write whatever you want, you can write your thoughts, your ideas, your feelings, your goals, etc.',
    icon: FreedomIcon,
    backgroundIcon: 'bg-blue-500',
  },
]

export default function Example() {
  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  }

  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7  text-[#FFB017]">
            Save your thoughts
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A better way to write your thoughts
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Write your thoughts and save them in a secure place. <br /> You can
            access them from anywhere.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <motion.dl
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
          >
            {features.map((feature) => (
              <>
                <motion.div
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                  key={feature.name}
                  className="relative pl-16"
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div
                      className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg ${feature.backgroundIcon}`}
                    >
                      <feature.icon aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </motion.div>
              </>
            ))}
          </motion.dl>
        </div>
      </div>
    </div>
  )
}
