import { EmptyMemories } from '@/components/EmptyMemories'
import { api } from '@/services/api'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

dayjs.locale(ptBr)

interface iMemory {
  id: string
  coverUrl: string
  excerpt: string
  createAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')
  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value

  const response = await api.get('/memories', {
    headers: { Authorization: `Bearer ${token}` },
  })
  const memories: iMemory[] = response.data
  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((elem) => {
        return (
          <div key={elem.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(elem.createAt).format(`D[ de ]MMMM[, ]YYYY`)}
            </time>
            <Image
              src={elem.coverUrl}
              alt="memory"
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
            <p className="text-lg leading-relaxed text-gray-100">
              {elem.excerpt}
            </p>
            <Link
              href={`/memories/${elem.id}`}
              className="hover: flex items-center gap-2 text-sm text-gray-100 text-gray-200"
            >
              Ler mais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
