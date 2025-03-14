import { useState } from "react";
import VideoUploader from "./VideoUploader";
import FrameExtractor from "./FrameExtractor";
import FramePreview from "./FramePreview";

const VideoFrameExtractor: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [frameURL, setFrameURL] = useState<string | null>(null);

  const handleFrameExtracted = (url: string) => {
    setFrameURL(url);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <VideoUploader onFileSelect={setVideoFile} />
      {videoFile && (
        <>
          <FrameExtractor
            videoFile={videoFile}
            selectedFrame={selectedFrame}
            onFrameExtracted={handleFrameExtracted}
            onFrameChange={setSelectedFrame} // Pass the setSelectedFrame function
          />
          <FramePreview frameURL={frameURL} />
        </>
      )}
    </div>
  );
};

export default VideoFrameExtractor;
