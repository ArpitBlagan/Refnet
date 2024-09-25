import React, { useEffect, useRef } from "react";
import "video.js/dist/video-js.css"; // Video.js CSS
import videojs from "video.js";
interface VideoPlayerProps {
  src: string;
  poster?: string;
  width?: string | number;
  height?: string | number;
}
const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    console.log("src", src);
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src,
          },
        ],
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [src]);

  return (
    <div>
      <VideoPlayer src="https://pirooo.s3.ap-southeast-2.amazonaws.com/back.mp4" />
    </div>
  );
};

export default VideoPlayer;
