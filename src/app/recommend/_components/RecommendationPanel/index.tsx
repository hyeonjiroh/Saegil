import { RecommendationResponse } from "@/lib/type";
import SpaceCard from "./SpaceCard";
import ErrorScreen from "@/components/ErrorScreen";
import SkeletonCard from "./SkeletonCard";

export default function RecommendationPanel({
  spaceData,
  isLoading,
  isError,
}: {
  spaceData: RecommendationResponse[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="pointer-events-auto mt-auto flex h-[50vh] rounded-tl-[20px] rounded-tr-[20px] bg-white px-4 py-5 sm:mt-0 sm:h-screen sm:w-[50vw] sm:max-w-[750px] sm:min-w-[500px] sm:rounded-tl-none sm:rounded-br-[20px] sm:p-10">
      <div className="scrollbar-hide flex w-full flex-col gap-4 overflow-x-auto sm:gap-10 sm:overflow-hidden">
        <div className="flex flex-col gap-2 sm:gap-4">
          <h2 className="sm:text-title-large text-title-small text-[#1F2229]">
            새길이 오늘 기분에 딱 맞는
            <br />
            장소를 추천해드릴게요!
          </h2>
          <p className="text-body-small sm:text-body-medium text-[#79839A]">
            오늘은 어디로 갈지 골라볼까요?
          </p>
        </div>
        <div className="h-0.5 border border-[#EEEFF2]"></div>

        {isError ? (
          <ErrorScreen />
        ) : isLoading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="scrollbar-overlay grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 sm:overflow-x-auto">
            {spaceData.map((space, index) => (
              <SpaceCard key={index} {...space} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
