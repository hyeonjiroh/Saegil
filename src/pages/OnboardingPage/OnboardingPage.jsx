"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "../../components/ProgressBar";
import QuestionContainer from "./components/QuestionContainer";

const questionsData = [
  {
    title: "연령대",
    contents: "연령대를 알려주세요.",
    items: ["① 10대", "② 20대", "③ 30대", "④ 40대", "⑤ 50대 이상"],
  },
  {
    title: "성별",
    contents: "성별을 알려주세요.",
    items: ["① 남성", "② 여성"],
  },
  {
    title: "주거 위치",
    contents: "어디에 살고 계세요?",
    items: ["① 새만금", "② 군산", "③ 김제", "④ 부안", "⑤ 기타"],
  },
  {
    title: "시간",
    contents: "몇시쯤 퇴근하세요?",
    items: [
      "① 오후 5시 이전",
      "② 오후 5-6시",
      "③ 오후 6-7시",
      "④ 오후 7시 이후",
      "⑤ 매일 달라요",
    ],
  },
  {
    title: "관심 지역 파악",
    contents: "어떤 지역의 퇴근길을 알아볼까요?",
    items: ["① 새만금", "② 군산", "③ 김제", "④ 부안"],
  },
  {
    title: "퇴근 후 패턴",
    contents: "퇴근 후 가장 기다려지는 순간은?",
    items: [
      "① 조용히 혼자 쉬기",
      "② 가볍게 산책하기",
      "③ 친구나 연인과 대화하기",
      "④ 책, 문화 콘텐츠 즐기기",
      "⑤ 맛있는 음식 먹기",
      "⑥ 특별한 경험 or 힐링하기",
      "⑦ 기타",
    ],
  },
  {
    title: "성향",
    contents: "평소 어떤 분위기를 좋아하세요?",
    items: [
      "① 혼자만의 고요모드",
      "② 텐션 업! 에너지 충전",
      "③ 감성 한 스푼",
      "④ 도심 탈출! 자연속으로",
      "⑤ 요즘 느낌 그대로 트렌디",
      "⑥ 동네 구석구석, 소소한",
    ],
  },
  {
    title: "상태",
    contents: "오늘도 고생했어요. 지금 기분은 어때요?",
    items: [
      "① 최고에요",
      "② 좋은 편이에요",
      "③ 조금 지쳐요",
      "④ 많이 지쳐요",
      "⑤ 우울해요",
      "⑥ 기타",
    ],
  },
  {
    title: "퇴근길 경로 시간",
    contents: "퇴근길 기분전환 시간! 얼마나 보낼까요?",
    items: [
      "① 15분 이내",
      "② 15분에서 30분",
      "③ 30분에서 1시간",
      "④ 1시간 이상",
    ],
  },
];

const totalQuestionCount = questionsData.length;

export default function OnboardingPage() {
  const [progress, setProgress] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestionCount, setAnsweredQuestionCount] = useState(0);
  const [selectedData, setSelectedData] = useState({});
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setProgress(Math.round((answeredQuestionCount / totalQuestionCount) * 100));
  }, [totalQuestionCount, answeredQuestionCount]);

  const handleItemSelected = (item) => {
    const isCurrentSelectedItem = item === selectedData[currentQuestion];
    const isCurrentStateSelected = !selectedData[currentQuestion];
    const nextSelectedData = isCurrentSelectedItem ? "" : item;
    const progress = isCurrentSelectedItem ? -1 : isCurrentStateSelected;

    setSelectedData((prev) => ({
      ...prev,
      [currentQuestion]: nextSelectedData,
    }));

    if (currentQuestion + 1 < questionsData.length) {
      handleQuestionChange(!isCurrentSelectedItem);
    }

    setAnsweredQuestionCount((prev) => prev + progress);
  };

  const handleQuestionChange = (next) => {
    setDirection(next);
    setTimeout(() => {
      setCurrentQuestion((prev) => prev + next);
    }, 50);
  };

  const handleConfirmClick = () => {};

  return (
    <div className="flex flex-col justify-between items-center h-screen overflow-hidden">
      <ProgressBar progress={progress} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentQuestion}
          initial={{ x: direction * 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex justify-center items-center"
        >
          <QuestionContainer
            question={questionsData[currentQuestion]}
            currentQuestion={currentQuestion}
            selectedData={selectedData[currentQuestion]}
            totalQuestionCount={totalQuestionCount}
            progress={progress}
            handleItemSelected={handleItemSelected}
            handleQuestionChange={handleQuestionChange}
            handleConfirmClick={handleConfirmClick}
          />
        </motion.div>
      </AnimatePresence>
      <div></div>
    </div>
  );
}
