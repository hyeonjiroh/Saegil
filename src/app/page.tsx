"use client";

import LandingPage from "../pages/LandingPage/LandingPage";
import LandingPage2 from "../pages/LandingPage2/LandingPage2";
import LandingPage3 from "../pages/LandingPage3/LandingPage3";
import OnboardingPage from "../pages/OnboardingPage/OnboardingPage";
import TodayMoodPage from "../pages/TodayMoodPage/TodayMoodPage";
import RecommendPage from "../pages/RecommendPage/RecommendPage";
import DirectionsPage from "../pages/DirectionsPage/DirectionsPage";
import { useEffect, useState } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("LandingPage");

  const handleRouting = (page: string) => {
    setCurrentPage(page);
  };

  const pageMapping: any = {
    LandingPage: <LandingPage routing={handleRouting} />,
    LandingPage2: <LandingPage2 routing={handleRouting} />,
    LandingPage3: <LandingPage3 routing={handleRouting} />,
    OnboardingPage: <OnboardingPage routing={handleRouting} />,
    TodayMoodPage: <TodayMoodPage routing={handleRouting} />,
    RecommendPage: <RecommendPage />,
  };

  return <div>{pageMapping[currentPage]}</div>;
}
