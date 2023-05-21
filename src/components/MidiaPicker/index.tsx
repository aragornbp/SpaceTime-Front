'use client'
import React, { ChangeEvent, useState } from 'react'

export const MidiaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null)
  function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])

    setPreview(previewURL)
  }
  return (
    <>
      <input
        onChange={onFileSelected}
        name="coverUrl"
        type="file"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="preview"
          className="aspect-video h-[280px] rounded-lg object-cover"
        />
      )}
    </>
  )
}
