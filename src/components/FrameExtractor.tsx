import { useState, useEffect, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

interface Props {
  videoFile: File;
  selectedFrame: number;
  onFrameExtracted: (url: string) => void;
}

const FrameExtractor: React.FC<Props> = ({
  videoFile,
  selectedFrame,
  onFrameExtracted,
}) => {
  const [ffmpeg] = useState(new FFmpeg());
  const [loading, setLoading] = useState(false);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);
  const [frameTime, setFrameTime] = useState(selectedFrame);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Load FFmpeg once
  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.loaded) {
        try {
          await ffmpeg.load({
            coreURL:
              "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js",
          });
        } catch (error) {
          console.error("Failed to load FFmpeg:", error);
        }
      }
    };
    loadFFmpeg();
  }, [ffmpeg]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = frameTime; // Update video time
    }
  }, [frameTime]);

  const extractFrame = async () => {
    if (!videoFile || !ffmpeg.loaded || loading) return;

    setLoading(true);

    const inputFile = "input.mp4";
    const outputFile = `frame_${frameTime}.jpg`;

    try {
      await ffmpeg.writeFile(inputFile, await fetchFile(videoFile));
      await ffmpeg.exec([
        "-ss",
        frameTime.toString(),
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
      onFrameExtracted(url);
    } catch (error) {
      console.error("Failed to extract frame:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {videoFile && (
        <>
          {/* Video player */}
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

          {/* Single slider to control both video and frame */}
          <input
            type="range"
            min="0"
            max={videoRef.current?.duration || 100}
            value={frameTime}
            onChange={(e) => {
              const newTime = parseFloat(e.target.value);
              setFrameTime(newTime);
              if (videoRef.current) {
                videoRef.current.currentTime = newTime; // Update video in real-time
              }
            }}
            className="w-full mt-2"
          />

          {/* Button to extract frame */}
          <button
            onClick={extractFrame}
            disabled={!videoFile || loading}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            {loading ? "Extraherar..." : "Extrahera Frame"}
          </button>

          {/* Preview of extracted frame */}
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
