type ProgressBarProps = {
  progress: number;
};
const ProgressBar = ({ progress }: ProgressBarProps) => {
  const progressPhrases = [
    "Connecting",
    "Loading",
    "Processing",
    "Waiting",
    "Cleaning",
    "Finalizing",
  ];
  return (
    <div className="relative flex gap-4 justify-center items-start w-full h-10 bg-gray-200 rounded-full mt-10">
      <div
        style={{
          width: `${progress}%`,
        }}
        className={`h-10 bg-gray-800 rounded-full mr-auto transition-all`}
      ></div>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-gray-100 font-semibold flex gap-2">
        {progress}%
        <span>
          {progress < 100
            ? progressPhrases[Math.floor(progress / 20)]
            : "Completed!"}
        </span>
        {progress < 100 && (
          <div className="flex gap-1 items-center">
            <div className="animate-bounce size-2 rounded-full bg-gray-100  animate-delay-0" />
            <div className="animate-bounce size-2 rounded-full bg-gray-100  animate-delay-150" />
            <div className="animate-bounce size-2 rounded-full bg-gray-100  animate-delay-300" />
          </div>
        )}
      </span>
    </div>
  );
};

export default ProgressBar;
