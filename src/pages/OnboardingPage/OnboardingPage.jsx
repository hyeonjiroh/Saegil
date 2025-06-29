"use client";

import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import questionsData from "@/constants/questionsData";
import check from "@/assets/icons/check.png";
import checkCurrent from "@/assets/icons/check_current.png";
import Image from "next/image";

const questionData = questionsData.onboarding;

export default function OnboardingPage({ routing }) {
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const savedAnswers =
      JSON.parse(localStorage.getItem("onboardingAnswers")) || [];
    setAnswers(savedAnswers);
    handleProgress(savedAnswers);
  }, []);

  const handleProgress = (answer) => {
    const currentProgress =
      ((questionData.length -
        answer.filter((element) => "" === element).length) /
        questionData.length) *
      100;

    setProgress(currentProgress);
  };

  const handleAnswerClick = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = answer;

    localStorage.setItem("onboardingAnswers", JSON.stringify(updatedAnswers));
    setAnswers(updatedAnswers);
    handleProgress(updatedAnswers);

    if (currentQuestion < questionData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevClick = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleNextClick = () => {
    if (currentQuestion === questionData.length - 1) {
      routing("LandingPage2");
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col justify-between items-center w-full h-screen">
      <ProgressBar progress={progress} />
      <div className="flex flex-col justify-between gap-[64px] w-[700px]">
        <div className="flex flex-col justify-between gap-[12px]">
          <h2 className="text-[#1F2229] text-[28px] font-[600] leading-[120%]">
            {questionData[currentQuestion].title}
          </h2>
          <p className="text-[#79839A] text-[20px] font-[600] leading-[150%]">
            {questionData[currentQuestion].contents}
          </p>
        </div>
        <div className="flex flex-col justify-between gap-[12px] w-[700px]">
          {questionData[currentQuestion].items.map((item, index) => {
            const onboardingAnswers = JSON.parse(
              localStorage.getItem("onboardingAnswers")
            );
            if (item === onboardingAnswers[currentQuestion]) {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center pl-[22px] pr-[38px] py-[14px] bg-[#F7F9FD] border-[2px] border-[#577DD1] rounded-[12px]"
                  onClick={() => handleAnswerClick(item)}
                >
                  <p className="text-[#3560C0] text-[20px] font-[600] leading-[150%]">
                    {item}
                  </p>
                  <Image src={checkCurrent} alt="" />
                </div>
              );
            }

            return (
              <div
                className="flex justify-between items-center pl-[24px] pr-[40px] py-[16px] bg-[#F7F9FD] rounded-[12px]"
                onClick={() => handleAnswerClick(item)}
              >
                <p className="text-[#B3B9C6] text-[20px] font-[600] leading-[150%]">
                  {item}
                </p>
                <Image src={check} alt="" />
              </div>
            );
          })}
        </div>
        <div className="flex gap-[12px] items-center self-end">
          {currentQuestion > 0 && (
            <button
              className="w-[120px] h-[62px] rounded-[12px] bg-[#EEEFF2] text-[#79839A] text-[20px] font-[600] leading-[150%] cursor-pointer"
              onClick={handlePrevClick}
            >
              이전
            </button>
          )}
          {answers[currentQuestion] ? (
            <button
              className="w-[120px] h-[62px] rounded-[12px] bg-[#3560C0] text-[#F7F9FD] text-[20px] font-[600] leading-[150%] cursor-pointer"
              onClick={handleNextClick}
            >
              다음
            </button>
          ) : (
            <button className="w-[120px] h-[62px] rounded-[12px] bg-[#EEEFF2] text-[#79839A] text-[20px] font-[600] leading-[150%]">
              다음
            </button>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}
