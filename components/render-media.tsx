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
  return (
    <Carousel className="w-full max-w-xs flex items-center">
      <CarouselContent className=" w-full">
        {media.map((ele: string, index: number) => {
          if (isVideo(ele)) {
            return (
              <CarouselItem
                key={index}
                className="border rounded-xl border-zinc-800"
              >
                <VideoPlayer src={ele} />
              </CarouselItem>
            );
          } else {
            return (
              <CarouselItem
                key={index}
                className="border rounded-xl border-zinc-800"
              >
                <Image src={ele} alt="media image" />
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RenderMedia;
