'use client'
import { uploadFiles } from '@/app/actions/upload'
import { trimText } from '@/common'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ImageIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { RiCloseLine, RiEmojiStickerLine } from '@remixicon/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import EmojiPicker from 'emoji-picker-react'
import { useRef, useState } from 'react'

import { toast } from 'sonner'
const MAX_CHARS = 350
const MAX_MEDIA = 4
export type MediaFile = {
  file: File
  preview: string
  type: 'image' | 'video'
}
const page = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [emojiVisi, setEmojiVisi] = useState(false)
  const [type, setType] = useState('WORK')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, MAX_CHARS))
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, MAX_MEDIA - mediaFiles.length)
      const newMediaFiles = newFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'video'
      }))
      //@ts-ignore
      setMediaFiles((prevFiles) =>
        //@ts-ignore
        [...prevFiles, ...newMediaFiles].slice(0, MAX_MEDIA)
      )
    }
  }

  const handleRemoveMedia = (index: number) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handlePost = async () => {
    const tt = trimText(text)
    if (!tt.length) {
      toast.error('Please provide a description about you work 🥲.')
      return
    }
    const formdata = new FormData()
    formdata.append('text', text)
    formdata.append('type', type)
    mediaFiles.forEach((ele) => {
      formdata.append('files[]', ele.file)
    })
    toast.promise(
      async () => {
        setLoading(true)
        const res = await uploadFiles(formdata)
        if (res.message) {
          return res
        }
        throw new Error(res.error)
      },
      {
        loading: 'Loading...',
        success: (res) => {
          setLoading(false)
          router.push('/posts')
          return `${res.message}`
        },
        error: (error) => {
          setLoading(false)
          return `${error}`
        }
      }
    )
  }
  return (
    <div
      className="flex-1 mx-7 overflow-y-scroll 
      flex flex-col justify-start min-h-full  mt-7 mb-10 "
    >
      <div className="mb-5">
        <h1 className="font-semibold text-3xl text-center">Post about your project </h1>
      </div>
      <div className="max-w-2xl mx-auto p-4  rounded-lg shadow w-full relative">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full mb-4 border border-zinc-800 bg-slate-900">
            <SelectValue placeholder="Select a type" className="text-bold " />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 text-white border-zinc-800">
            <SelectGroup>
              <SelectLabel>Types of post</SelectLabel>
              <SelectItem value="WORK">About your Work</SelectItem>
              <SelectItem value="REFERAL">About Referal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="What's happening?"
          value={text}
          onChange={handleTextChange}
          className="w-full border-zinc-800 mb-2 resize-none bg-slate-900 py-4 font-semibold px-4 h-[150px]"
        />
        <p className="text-gray-700 my-4 text-sm font-semibold">
          Try to provide proper information about you work like proper description, deployed link,
          code link etc and try to upload images/videos related to it.
        </p>
        <div className="flex justify-between items-center mb-2 relative">
          <div className="flex space-x-2 ">
            <Button variant="outline" size="icon" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="h-4 w-4" />
            </Button>
            <input
              type="file"
              hidden
              multiple
              ref={fileInputRef}
              onChange={handleMediaUpload}
              accept="image/*,video/mp4"
            />
            {!emojiVisi && (
              <Button
                className=" hidden md:flex"
                variant={'outline'}
                onClick={(e) => {
                  e.preventDefault()
                  setEmojiVisi(true)
                }}
              >
                <RiEmojiStickerLine className="h-4 w-4" />
              </Button>
            )}
            {emojiVisi && (
              <Button
                variant={'outline'}
                className=" hidden md:flex"
                onClick={(e) => {
                  e.preventDefault()
                  setEmojiVisi(false)
                }}
              >
                <RiCloseLine />
              </Button>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {text.length}/{MAX_CHARS}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 bg-black">
          {emojiVisi && <EmojiPicker className="mt-10" />}
        </div>
        <div className="grid grid-cols-2 gap-3 w-full my-4 overflow-y-scroll overflow-hidden ">
          {mediaFiles.length > 0 &&
            mediaFiles.map((media, index) => (
              <div key={index} className="relative">
                {media.type === 'image' ? (
                  <img
                    src={media.preview}
                    alt={`Uploaded media ${index + 1}`}
                    className="w-full h-40 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-40  rounded flex items-center justify-center">
                    <video src={media.preview} autoPlay loop />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1"
                  onClick={() => handleRemoveMedia(index)}
                >
                  <RiCloseLine className="h-4 w-4" />
                </Button>
              </div>
            ))}
        </div>
        <Button
          onClick={handlePost}
          disabled={text.length === 0 || loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Post
        </Button>
      </div>
    </div>
  )
}

export default page
