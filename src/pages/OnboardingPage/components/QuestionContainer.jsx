import QuestionInfo from "./QuestionInfo";
import QuestionItemList from "./QuestionItemList";
import ButtonArea from "./ButtonArea";

export default function QuestionContainer({
  question,
  currentQuestion,
  selectedData,
  totalQuestionCount,
  progress,
  handleItemSelected,
  handleQuestionChange,
  handleConfirmClick,
}) {
  return (
    <div className="flex justify-between flex-col gap-[32px] md:gap-[48px] xl:gap-[64px] max-w-[800px] w-[80%]">
      <QuestionInfo
        title={question?.title ?? ""}
        contents={question?.contents ?? ""}
      />
      <QuestionItemList
        items={question?.items ?? ""}
        selectedData={selectedData}
        handleItemSelected={handleItemSelected}
      />
      <ButtonArea
        currentQuestion={currentQuestion}
        totalQuestionCount={totalQuestionCount}
        progress={progress}
        handleQuestionChange={handleQuestionChange}
        handleConfirmClick={handleConfirmClick}
      />
    </div>
  );
}
