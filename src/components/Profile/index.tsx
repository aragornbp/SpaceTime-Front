import React from 'react'
import { getUser } from '@/services/auth'
import Image from 'next/image'

export const Profile = () => {
  const { name, avatarUrl } = getUser()
  return (
    <div className="flex items-center gap-3 text-left transition-colors hover:text-gray-50">
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt="perfil"
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero Sair
        </a>
      </p>
    </div>
  )
}