import QuestionItem from "./QuestionItem";

export default function QuestionItemList({
  items,
  selectedData,
  handleItemSelected,
}) {
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <div className="flex flex-col justify-between gap-[8px] md:gap-[10px] xl:gap-[12px]">
      {items?.map((item) => (
        <QuestionItem
          key={item}
          item={item}
          selectedData={selectedData}
          handleItemSelected={handleItemSelected}
        />
      ))}
    </div>
  );
}
