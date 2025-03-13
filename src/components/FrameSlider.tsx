type Props = {
  totalFrames: number;
  selectedFrame: number;
  onChange: (frame: number) => void;
};

const FrameSlider: React.FC<Props> = ({
  totalFrames,
  selectedFrame,
  onChange,
}) => {
  return (
    <div>
      <label>Välj frame: {selectedFrame}</label>
      <input
        type="range"
        min="0"
        max={totalFrames}
        value={selectedFrame}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default FrameSlider;
