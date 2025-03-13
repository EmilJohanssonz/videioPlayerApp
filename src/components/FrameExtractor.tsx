import { useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

type Props = {
  videoFile: File | null;
};

const FrameExtractor = ({ videoFile }: Props) => {
  const [ffmpeg] = useState(new FFmpeg());
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [frameTime, setFrameTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ffmpeg.loaded) {
      ffmpeg.load({
        coreURL:
          "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js",
      });
    }
  }, [ffmpeg]);

  const extractFrame = async (time: number) => {
    if (!videoFile || !ffmpeg.loaded()) return;

    setLoading(true);

    const inputFile = "input.mp4";
    const outputFile = `frame_${time}.jpg`;

    await ffmpeg.writeFile(inputFile, await fetchFile(videoFile));

    // Viktigt: -ss måste vara före -i
    await ffmpeg.exec([
      "-ss",
      time.toString(),
      "-i",
      inputFile,
      "-frames:v",
      "1",
      outputFile,
    ]);

    const data = await ffmpeg.readFile(outputFile);
    const url = URL.createObjectURL(
      new Blob([data.buffer], { type: "image/jpeg" }),
    );

    setFrameUrl(url);
    setLoading(false);
  };

  return (
    <div className="p-4">
      {videoFile && (
        <>
          <video
            ref={videoRef}
            src={URL.createObjectURL(videoFile)}
            controls
            className="w-full max-w-lg mx-auto mb-4"
            onTimeUpdate={(e) =>
              setFrameTime(
                Math.floor((e.target as HTMLVideoElement).currentTime),
              )
            }
          />

          <input
            type="range"
            min="0"
            max={videoRef.current?.duration || 100}
            value={frameTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              setFrameTime(newTime);
              if (videoRef.current) {
                videoRef.current.currentTime = newTime;
              }
            }}
            className="w-full mt-2"
          />

          <button
            onClick={() => extractFrame(frameTime)}
            disabled={!videoFile || loading}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            {loading ? "Extraherar..." : "Extrahera Frame"}
          </button>

          {loading && <p>Extraherar frame... {progress}%</p>}

          {frameUrl && (
            <div className="mt-4">
              <p>Vald Frame ({frameTime}s):</p>
              <img src={frameUrl} alt="Selected Frame" className="mt-2" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FrameExtractor;
