type Props = {
  frameURL: string | null;
};

const FramePreview: React.FC<Props> = ({ frameURL }) => {
  if (!frameURL) return null;

  const downloadFrame = () => {
    const link = document.createElement("a");
    link.href = frameURL;
    link.download = "frame.jpg";
    link.click();
  };

  return (
    <div>
      {frameURL && (
        <img src={frameURL} alt="Extracted Frame" className="w-full rounded" />
      )}
      <button
        onClick={downloadFrame}
        className="bg-green-500 text-white p-2 mt-2"
      >
        Ladda ner JPG
      </button>
    </div>
  );
};

export default FramePreview;
