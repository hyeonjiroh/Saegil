import { RecommendationResponse } from "@/lib/type";
import { getCity } from "@/utils/getCity";
import { CATEGORY } from "@/constants/spaceData";
import Image from "next/image";
import LocationIcon from "@/assets/icons/location.svg";
import Temp from "@/assets/icons/temp.jpg";

export default function SpaceCard({
  spaceData,
}: {
  spaceData: RecommendationResponse;
}) {
  const city = getCity(spaceData.position);
  return (
    <div className="flex h-full w-full gap-2 sm:flex-col sm:gap-3">
      <Image
        className="size-40 rounded-[6px] object-cover sm:h-[180px] sm:w-full"
        src={spaceData.image || Temp}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
      />
      <div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center">
            <h2 className="text-title-small text-[#1F2229]">
              {spaceData.title}
            </h2>
          </div>
          <div className="flex items-start gap-1">
            <Image
              src={LocationIcon}
              width={16}
              height={16}
              className="py-0.5"
              alt=""
            />
            <div className="text-body-small text-[#616A80]">
              {spaceData.position}
            </div>
          </div>
        </div>
        <div className="mt-[8px] flex gap-[8px]">
          <div className="text-body-small rounded-[6px] bg-[#F7F9FD] px-[12px] py-[4px] text-[#3560C0]">
            {CATEGORY[spaceData.category]}
          </div>
          {city && (
            <div className="text-body-small rounded-[6px] bg-[#E9F5F7] px-[12px] py-[4px] text-[#3C98A4]">
              {city}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
