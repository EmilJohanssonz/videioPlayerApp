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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.isLoaded()) {
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
      videoRef.current.currentTime = selectedFrame; // Update video time
    }
  }, [selectedFrame]);

  const extractFrame = async () => {
    if (!videoFile || !ffmpeg.isLoaded()) return;

    setLoading(true);
    const inputFile = "input.mp4";
    const outputFile = `frame_${selectedFrame}.jpg`;

    try {
      await ffmpeg.writeFile(inputFile, await fetchFile(videoFile));
      await ffmpeg.exec([
        "-ss",
        selectedFrame.toString(),
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
      <video
        ref={videoRef}
        src={URL.createObjectURL(videoFile)}
        controls
        className="w-full max-w-lg mx-auto mb-4"
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = selectedFrame;
          }
        }}
      />

      {/* Custom slider to control video playback */}
      <input
        type="range"
        min="0"
        max={videoRef.current?.duration || 100}
        value={selectedFrame}
        onChange={(e) => {
          const newTime = parseFloat(e.target.value);
          if (videoRef.current) {
            videoRef.current.currentTime = newTime; // Update video time
          }
          setFrameUrl(null); // Clear the previous frame URL
        }}
        className="w-full mt-2"
      />

      {/* Button to extract frame */}
      <button
        onClick={extractFrame}
        disabled={!videoFile || loading}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        {loading ? "Extracting..." : "Extract Frame"}
      </button>

      {loading && <p>Extraherar frame...</p>}
      {frameUrl && (
        <img src={frameUrl} alt="Extracted Frame" className="mt-2" />
      )}
    </div>
  );
};

export default FrameExtractor;
