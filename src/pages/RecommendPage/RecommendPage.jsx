"use client";

import Image from "next/image";
import Logo from "@/assets/icons/logo.png";
import LogoDev from "@/assets/icons/logo_dev.png";
import LogoKR from "@/assets/icons/logo_kr.png";
import Pin from "@/assets/icons/pin.png";
import Sliders from "@/assets/icons/sliders.png";
import BookMark from "@/assets/icons/bookmark.png";
import Temp from "@/assets/icons/temp.jpg";
import BookMarkDefault from "@/assets/icons/bookmark_default.png";
import BookMarkPressed from "@/assets/icons/bookmark_pressed.png";
import MapPin from "@/assets/icons/map_pin.png";
import ChevronLeft from "@/assets/icons/chevron-left.png";
import ChevronRight from "@/assets/icons/chevron-right.png";

export default function RecommendPage() {
  return (
    <div className="bg-[#0000FF]">
      <section className="flex">
        <SideMenu />
        <SideMenuRecommend />
      </section>
    </div>
  );
}

function SideMenu() {
  return (
    <div className="flex flex-col justify-between items-center w-[72px] h-screen pt-[13px] border-r-1 border-[#EEEFF2] bg-[#FFFFFF]">
      <Image src={Logo} alt="" width={40} height={50} />
      <div className="flex flex-col justify-between items-center gap-[48px]">
        <div className="flex flex-col justify-between items-center gap-[8px] px-[12px] py-[12px]">
          <Image src={Pin} alt="" />
          <p>추천</p>
        </div>
        <div className="flex flex-col justify-between items-center gap-[8px] px-[12px] py-[12px]">
          <Image src={Sliders} alt="" />
          <p>상태</p>
        </div>
        <div className="flex flex-col justify-between items-center gap-[8px] px-[12px] py-[12px]">
          <Image src={BookMark} alt="" />
          <p>찜</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center gap-[24px] py-[40px]">
        <Image src={LogoDev} alt="" width={32} height={32} />
        <Image src={LogoKR} alt="" width={32} height={32} />
      </div>
    </div>
  );
}

function SideMenuRecommend() {
  return (
    <div className="relative flex flex-col gap-[40px] w-[750px] h-screen rounded-tr-[20px] rounded-br-[20px] pl-[40px] pr-[20px] py-[40px] bg-[#FFFFFF]">
      <div className="absolute bg-[#FFFFFF] rounded-[9px] w-[40px] h-[40px] right-[-20px] top-[150px] p-[6px]">
        <Image src={ChevronLeft} width={28} height={28} />
      </div>
      <div className="flex flex-col gap-[16px]">
        <h2 className="text-[#1F2229] text-[24px] font-[700] leading-[150%]">
          새길이 오늘 기분에 딱 맞는
          <br />
          장소를 추천해드릴게요!
        </h2>
        <p className="text-[#79839A] text-[16px] font-[500] leading-[150%]">
          오늘은 어디로 갈지 골라볼까요? 도착 시간도 함께 알려드릴게요
        </p>
      </div>
      <div className="flex gap-[20px]">
        <button className="flex gap-[12px] px-[12px] py-[6px] bg-[#F6F7F8] rounded-[8px] border-1 border-[#EEEFF2]">
          <div className="w-[24px] h-[24px] bg-[#577DD1] rounded-[1000] text-[#FFFFFF] text-[16px] font-[500] leading-[150%]">
            A
          </div>
          <p className="text-[#969EB0] text-[16px] font-[500] leading-[150%]">
            새만금 → 군산
          </p>
        </button>
        <button className="flex gap-[12px] px-[12px] py-[6px] bg-[#F6F7F8] rounded-[8px] border-1 border-[#EEEFF2]">
          <div className="w-[24px] h-[24px] bg-[#53B3C0] rounded-[1000] text-[#FFFFFF] text-[16px] font-[500] leading-[150%]">
            B
          </div>
          <p className="text-[#969EB0] text-[16px] font-[500] leading-[150%]">
            새만금 → 김제
          </p>
        </button>
        <button className="flex gap-[12px] px-[12px] py-[6px] bg-[#F6F7F8] rounded-[8px] border-1 border-[#EEEFF2]">
          <div className="w-[24px] h-[24px] bg-[#4BC27E] rounded-[1000] text-[#FFFFFF] text-[16px] font-[500] leading-[150%]">
            C
          </div>
          <p className="text-[#969EB0] text-[16px] font-[500] leading-[150%]">
            새만금 → 부안
          </p>
        </button>
      </div>
      <div className="flex flex-wrap gap-[20px] w-[690px] overflow-x-auto scrollbar-overlay">
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
        <SpaceCard />
      </div>
    </div>
  );
}

function SpaceCard() {
  return (
    <div className="w-[325px]">
      <Image
        className="rounded-[6px] h-[180px]"
        src={Temp}
        alt=""
        width={325}
        height={180}
      />
      <div className="flex justify-between items-center mt-[12px]">
        <h2 className="text-[#3560C0] text-[20px] font-[600] leading-[150%]">
          아리울예술창고 아리울스토리
        </h2>
        <Image src={BookMarkDefault} alt="" width={24} height={24} />
      </div>
      <div className="flex justify-start items-center gap-[4px] mt-[4px]">
        <Image src={MapPin} alt="" width={16} height={16} />
        <p>전라북도 김제시 진봉면 새만금로 1500</p>
      </div>
      <div className="flex gap-[8px] mt-[8px]">
        <div className="px-[12px] py-[4px] bg-[#F7F9FD] rounded-[6px] text-[#3560C0] text-[14px] font-[500] leading-[150%]">
          카테고리
        </div>
        <div className="px-[12px] py-[4px] bg-[#E9F5F7] rounded-[6px] text-[#3C98A4] text-[14px] font-[500] leading-[150%]">
          지역
        </div>
      </div>
    </div>
  );
}
