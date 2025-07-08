"use client";

import { useEffect } from "react";
import { transitionData } from "@/constants/transitionData";
import Image from "next/image";

interface TransitionScreenProps {
  type: "toMood" | "toRecommend";
  routing?: (page: string) => void;
}

export default function TransitionScreen({
  type,
  routing,
}: TransitionScreenProps) {
  const transitionContent = transitionData[type];

  useEffect(() => {
    if (routing) {
      setTimeout(() => {
        routing("TodayMoodSurvey");
      }, 1000);
    }
  }, [transitionContent, routing]);

  return (
    <div className="flex h-screen w-full items-center bg-[#F7F9FD]">
      <div className="flex w-full flex-col items-center gap-[40px]">
        <Image src={transitionContent.image} alt="" />
        <div className="flex w-full flex-col items-center gap-[24px]">
          <h2 className="text-heading-large text-center whitespace-pre-line text-[#142448]">
            {transitionContent.title}
          </h2>
          <p className="text-title-medium text-center text-[#7F9CDC]">
            {transitionContent.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
