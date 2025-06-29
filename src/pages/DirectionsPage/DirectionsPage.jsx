"use client";

import dynamic from "next/dynamic";

// SSR 비활성화된 컴포넌트
const TmapDirections = dynamic(() => import("./components/TmapDirections"), {
  ssr: false,
});

export default function DirectionsPage() {
  return (
    <div>
      <TmapDirections />
    </div>
  );
}
