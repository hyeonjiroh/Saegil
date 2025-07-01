"use client";

import type { ReactNode } from "react";
import LandingPage from "../pages/LandingPage/LandingPage";
import LandingPage2 from "../pages/LandingPage2/LandingPage2";
import LandingPage3 from "../pages/LandingPage3/LandingPage3";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import TodayMoodPage from "../pages/TodayMoodPage/TodayMoodPage";
import RecommendPage from "../pages/RecommendPage/RecommendPage";
import PopupTestPage from "../pages/PopupTestPage/PopupTestPage";
import { useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("LandingPage");

  const handleRouting = (page: string) => {
    setCurrentPage(page);
  };

  const pageMapping: Record<string, () => ReactNode> = {
    LandingPage: () => <LandingPage routing={handleRouting} />,
    LandingPage2: () => <LandingPage2 routing={handleRouting} />,
    LandingPage3: () => <LandingPage3 routing={handleRouting} />,
    OnboardingPage: () => <OnboardingPage routing={handleRouting} />,
    TodayMoodPage: () => <TodayMoodPage routing={handleRouting} />,
    PopupTestPage: () => <PopupTestPage routing={handleRouting} />,
    RecommendPage: () => <RecommendPage routing={handleRouting} />,
  };

  return <div>{pageMapping[currentPage]?.()}</div>;
}
