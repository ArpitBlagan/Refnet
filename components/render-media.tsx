import { isVideo } from '@/common'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Image from 'next/image'

const RenderMedia = ({ media }: any) => {
  return (
    <Carousel className="flex  items-center justify-center overflow-hidden border border-zinc-800 rounded-xl w-full relative p-2">
      <CarouselContent>
        {media.map((ele: string, index: number) => (
          <CarouselItem key={index} className="flex items-center justify-center ">
            <div className="relative w-full h-[70%] ">
              {isVideo(ele) ? (
                <video controls className="object-contain w-full h-full rounded-lg">
                  <source src={ele} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={ele}
                  alt="media image"
                  className="object-contain w-full h-full rounded-lg"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 z-10 " />

      <CarouselNext className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 z-10 " />
    </Carousel>
  )
}

export default RenderMedia
