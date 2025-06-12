export default function ProgressBar({progress}) {

  return <div className="w-full h-[12px] bg-gray-300">
    <div className="h-[12px] bg-gray-400 transition-all duration-300"
        style={{ width: `${progress}%` }}
></div>
  </div>;
}
