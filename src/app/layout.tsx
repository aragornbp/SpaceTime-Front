/* eslint-disable camelcase */
import './globals.css'
import { ReactNode } from 'react'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import { Button } from '@/components/Button'
import { Login } from '@/components/Login'
import { Profile } from '@/components/Profile'
import { cookies } from 'next/headers'
import Image from 'next/image'
import nlwLogo from '../assets/nlw-spacetime-logo.svg'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai',
})

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo com NEXT e TailwindCSS',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="flex min-h-screen w-screen flex-col md:flex-row">
          {/* esquerda */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-10 py-16 md:w-1/2 md:px-28">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2  translate-x-1/2  rounded-full bg-purple-700 opacity-50 blur-full"></div>
            <div className="absolute right-2 top-0 w-3 bg-stripes"></div>

            {isAuthenticated ? <Profile /> : <Login />}

            <div className="mt-4 space-y-6">
              <Image src={nlwLogo} alt="NLW Spacetime" />

              <div className="max-w-[420px] space-y-1">
                <h1 className="text-5xl font-bold leading-tight text-gray-50">
                  Sua cápsula do tempo
                </h1>
                <p className="text-lg leading-relaxed">
                  Colecione momentos marcantes da sua jornada e compartilhe (se
                  quiser) com o mundo!
                </p>
              </div>

              <Button>Cadastrar Lembrança</Button>
            </div>
            <Copyright />
          </div>

          {/* direita */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover px-10 py-16 md:w-1/2 md:px-16">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
