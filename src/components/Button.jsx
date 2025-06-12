import { twMerge } from "tailwind-merge";

export default function Button({ styles, text, onClick }) {
  return (
    <button
      className={twMerge(
        "px-[12px] py-[8px] md:px-[16px] md:py-[12px] xl:px-[20px] xl:py-[16px] text-black text-[16px] md:text-[20px] xl:text-[24px] font-normal leading-none rounded-[8px] md:rounded-[10px] xl:rounded-[12px] bg-gray-200 hover:bg-gray-300 active:bg-gray-400 hover:cursor-pointer transition-colors duration-300 ease-in-out select-none",
        styles
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
