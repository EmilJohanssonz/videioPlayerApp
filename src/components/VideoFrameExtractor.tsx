import { useState, useEffect } from "react";
import VideoUploader from "./VideoUploader";
import FrameSlider from "./FrameSlider";
import FrameExtractor from "./FrameExtractor";
import FramePreview from "./FramePreview";

const VideoFrameExtractor: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [totalFrames, setTotalFrames] = useState<number>(100);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [frameURL, setFrameURL] = useState<string | null>(null);

  const handleFrameExtracted = (url: string) => {
    setFrameURL(url);
  };

  // 🔹 Extrahera frame automatiskt när `selectedFrame` ändras
  useEffect(() => {
    if (videoFile) {
      console.log("Extracting frame at:", selectedFrame);
    }
  }, [selectedFrame, videoFile]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <VideoUploader onFileSelect={setVideoFile} />
      {videoFile && (
        <>
          <FrameSlider
            totalFrames={totalFrames}
            selectedFrame={selectedFrame}
            onChange={setSelectedFrame}
          />
          <FrameExtractor
            videoFile={videoFile}
            selectedFrame={selectedFrame}
            onFrameExtracted={setFrameURL}
          />
          <FramePreview frameURL={frameURL} />
        </>
      )}
    </div>
  );
};

export default VideoFrameExtractor;
