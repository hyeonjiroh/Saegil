export default function QuestionInfo({ title, contents }) {
  return (
    <div className="flex justify-between flex-col gap-[12px] md:gap-[16px] xl:gap-[20px]">
      <h2 className="text-black text-[24px] md:text-[28px] xl:text-[32px] font-bold leading-none">
        Q. {title}
      </h2>
      <p className="text-black text-[16px] md:text-[20px] xl:text-[24px] font-normal leading-none">
        {contents}
      </p>
    </div>
  );
}
