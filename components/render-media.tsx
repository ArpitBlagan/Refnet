import { isVideo } from "@/common";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import VideoPlayer from "./video-player";

const RenderMedia = ({ media }: any) => {
  console.log(media);
  return (
    <Carousel className="flex  items-center justify-center overflow-hidden border border-zinc-800 w-full relative p-2">
      <CarouselContent>
        {media.map((ele: string, index: number) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center "
          >
            <div className="relative w-full h-full">
              {isVideo(ele) ? (
                <video
                  controls
                  className="object-cover w-full h-full rounded-lg"
                  style={{ display: "block" }}
                >
                  <source src={ele} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={ele}
                  alt="media image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[2rem] top-1/2 transform -translate-y-1/2 z-10 bg-black" />

      <CarouselNext className="absolute right-[2rem] top-1/2 transform -translate-y-1/2 z-10 bg-black" />
    </Carousel>
  );
};

export default RenderMedia;
