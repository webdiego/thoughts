import React from 'react'
import Image from 'next/image'
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image src="/loading.svg" width={60} height={60} alt="loading" />
    </div>
  )
}
