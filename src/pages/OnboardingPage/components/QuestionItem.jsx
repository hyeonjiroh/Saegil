import CheckIcon from "@/assets/icons/check.png";
import Image from "next/image";

export default function QuestionItem({
  item,
  selectedData,
  handleItemSelected,
}) {
  const handleItemClick = () => {
    handleItemSelected(item);
  };

  const isSelected =
    item === selectedData
      ? "bg-blue-200 hover:bg-blue-300 active:bg-blue-400"
      : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400";

  return (
    <div
      className={`flex justify-between items-center max-w-[800px] h-[56px] md:h-[60px] xl:h-[65px] px-[20px] py-[8px] md:px-[24px] md:py-[16px] xl:px-[40px] xl:py-[16px] rounded-[8px] md:rounded-[10px] xl:rounded-[12px] hover:cursor-pointer transition-colors duration-300 ease-in-out select-none ${isSelected}`}
      onClick={handleItemClick}
    >
      <p className="text-black text-[16px] md:text-[20px] xl:text-[24px] font-normal leading-none select-none">
        {item}
      </p>
      <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px] xl:w-[24px] xl:h-[24px]">
        <Image src={CheckIcon} alt="checkIcon" fill />
      </div>
    </div>
  );
}
