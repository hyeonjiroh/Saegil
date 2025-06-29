"use client";

import Walk from "@/assets/icons/walk.png";
import Image from "next/image";
import { useEffect } from "react";

export default function LandingPage3({ routing }) {
  useEffect(() => {
    setTimeout(() => {
      routing("RecommendPage");
    }, 1000);
  }, []);

  return (
    <div className="flex items-center w-full h-screen bg-[#F7F9FD]">
      <div className="flex flex-col items-center gap-[40px] w-full">
        <Image src={Walk} alt="" />
        <div className="flex flex-col items-center gap-[24px] w-full">
          <h2 className="text-[#142448] text-center text-[36px] font-[700] leading-[120%]">
            오늘의 기분에 딱 맞는
            <br />
            퇴근길을 고르는 중이이에요...
          </h2>
          <p className="text-[#7F9CDC] text-center text-[22px] font-[600] leading-[150%]">
            조금만 기다려주세요
          </p>
        </div>
      </div>
    </div>
  );
}
