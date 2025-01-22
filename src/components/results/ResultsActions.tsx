import { ShareResults } from "../ShareResults";

type ResultsActionsProps = {
  onStartOver: () => void;
  containerRef: React.RefObject<HTMLDivElement>;
};

export const ResultsActions = ({ onStartOver, containerRef }: ResultsActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
      <button
        onClick={onStartOver}
        className="bg-gradient-to-r from-[#17BEBB] to-[#00D4FF] text-white px-8 py-4 rounded-xl text-lg font-semibold
          transition-all duration-300 hover:shadow-lg hover:scale-105 min-w-[200px]"
      >
        Start Over
      </button>
      <ShareResults containerRef={containerRef} />
    </div>
  );
};