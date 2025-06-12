import Button from "@/components/Button";

export default function ButtonArea({
  currentQuestion,
  totalQuestionCount,
  progress,
  handleQuestionChange,
  handleConfirmClick,
}) {
  const isProgressDone =
    progress === 100
      ? "bg-blue-200 hover:bg-blue-300 active:bg-blue-400 "
      : "bg-gray-200 hover:bg-gray-300 active:bg-gray-400 ";

  const handlePrevClick = () => {
    handleQuestionChange(-1);
  };

  const handleNextClick = () => {
    handleQuestionChange(1);
  };

  return (
    <div className="flex justify-end items-end gap-[16px] md:gap-[20px] xl:gap-[24px]">
      {currentQuestion > 0 ? (
        <Button text="이전" onClick={handlePrevClick} />
      ) : (
        <div />
      )}
      {currentQuestion + 1 !== totalQuestionCount ? (
        <Button styles="self-end" text="다음" onClick={handleNextClick} />
      ) : (
        <Button
          styles={`${isProgressDone}self-end`}
          text="완료"
          onClick={handleConfirmClick}
        />
      )}
    </div>
  );
}
