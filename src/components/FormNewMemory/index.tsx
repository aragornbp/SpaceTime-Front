'use client'
import React, { FormEvent } from 'react'
import Cookie from 'js-cookie'
import { MidiaPicker } from '../MidiaPicker'
import { Camera } from 'lucide-react'
import { api } from '@/services/api'
import { useRouter } from 'next/navigation'

export const FormNewMemory = () => {
  const router = useRouter()
  async function handleCreateMemory(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''
    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const { data } = await api.post('/upload', uploadFormData)

      coverUrl = data.fileUrl
    }

    const token = Cookie.get('token')
    try {
      await api.post(
        '/memories',
        {
          coverUrl,
          content: formData.get('content'),
          isPublic: formData.get('isPublic'),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      )
    } catch (error) {
      console.log(error)
    }

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>
        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memória pública
        </label>
      </div>
      <MidiaPicker />
      <textarea
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        name="content"
        spellCheck={false}
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre"
      />
      <button
        type="submit"
        className="font-alt inline-block self-end rounded-full bg-green-500 px-5 py-3 text-center text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
