import Link from 'next/link'
import React from 'react'

interface iButtonProps {
  children: React.ReactNode
}

export const Button = ({ children }: iButtonProps) => {
  return (
    <Link
      className="font-alt inline-block rounded-full bg-green-500 px-5 py-3 text-center text-sm uppercase leading-none text-black hover:bg-green-600"
      href="/memories/new"
    >
      {children}
    </Link>
  )
}
