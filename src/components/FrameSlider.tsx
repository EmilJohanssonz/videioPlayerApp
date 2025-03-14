import { useCallback } from "react";

type Props = {
  totalFrames: number;
  selectedFrame: number;
  onChange: (frame: number) => void;
};

const FrameSlider: React.FC<Props> = ({ totalFrames, selectedFrame, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  }, [onChange]);

  return (
    <div className="p-4 hidden">
      <label className="block text-sm font-medium">Välj frame: {selectedFrame}</label>
      <input
        type="range"
        min="0"
        max={Math.max(0, totalFrames - 1)}
        value={selectedFrame}
        onChange={handleChange}
        step={1}
        className="w-full cursor-pointer"
      />
    </div>
  );
};

export default FrameSlider;
