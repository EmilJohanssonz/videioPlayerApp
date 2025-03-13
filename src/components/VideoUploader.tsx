import { useState } from "react";

interface Props {
  onFileSelect: (file: File) => void;
}

const VideoUploader: React.FC<Props> = ({ onFileSelect }) => {
  const [videoURL, setVideoURL] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setVideoURL(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  return (
    <div>
      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      {videoURL && <video controls className="w-full mt-2" src={videoURL} />}
    </div>
  );
};

export default VideoUploader;
