"use client";

import Reading from "@/assets/icons/reading.png";
import Image from "next/image";
import { useEffect } from "react";

export default function LandingPage2({ routing }) {
  useEffect(() => {
    const userID = localStorage.getItem("USID");
    const isOnboardingComplete = localStorage.getItem("isOnboardingComplete");
    if (userID && isOnboardingComplete) {
      routing("RecommendPage");
    } else {
      setTimeout(() => {
        routing("TodayMoodPage");
      }, 1000);
    }
  }, []);

  return (
    <div className="flex items-center w-full h-screen bg-[#F7F9FD]">
      <div className="flex flex-col items-center gap-[40px] w-full">
        <Image src={Reading} alt="" />
        <div className="flex flex-col items-center gap-[24px] w-full">
          <h2 className="text-[#142448] text-center text-[36px] font-[700] leading-[120%]">
            이제 오늘의 기분을 <br />
            조금 더 들여다볼게요.
          </h2>
          <p className="text-[#7F9CDC] text-center text-[22px] font-[600] leading-[150%]">
            기분에 따라 추천도 달라질 수 있어요 :)
          </p>
        </div>
      </div>
    </div>
  );
}
