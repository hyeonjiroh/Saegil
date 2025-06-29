"use client";

import { useEffect, useRef, useState } from "react";
const { Tmapv2 } = window;
console.log(window);

export default function TmapDirections() {
  const mapRef = useRef(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  // Tmap JS API 로딩 및 지도 초기화
  useEffect(() => {
    // 이미 로드된 상태라면 바로 initMap 호출
    if (window.Tmapv2) {
      initMap();
      return;
    }

    // 스크립트 로드가 진행 중이면 이벤트 리스너 등록
    const existingScript = document.querySelector('script[src*="tmap/js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        initMap();
      });
      return;
    } // 스크립트 없으면 새로 추가
    const script = document.createElement("script");
    script.src =
      "https://apis.openapi.sk.com/tmap/js?version=1&appKey=VqMhcfR29p90wnyQM6IsS9jccnNyJfQF0DVa6do7";
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);
  }, []);

  // 지도 초기화 함수
  const initMap = () => {
    if (!window.Tmapv2) {
      console.error("Tmapv2 라이브러리를 불러오지 못했습니다.");
      return;
    }
    if (mapRef.current) return;
    const map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(37.570028, 126.989072),
      width: "100%",
      height: "800px",
      zoom: 14,
    });
    mapRef.current = map;
  };

  // 주소를 좌표로 변환하는 함수
  const geocode = async (address) => {
    const url = `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?version=1&format=json&appKey=VqMhcfR29p90wnyQM6IsS9jccnNyJfQF0DVa6do7&fullAddr=${encodeURIComponent(
      address
    )}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Geocode API 응답 실패: ${res.status}`);
      const json = await res.json();

      if (
        !json.coordinateInfo ||
        !json.coordinateInfo.coordinate ||
        json.coordinateInfo.coordinate.length === 0
      )
        throw new Error("좌표 정보를 찾을 수 없습니다.");

      const location = json.coordinateInfo.coordinate[0];

      return {
        lat: parseFloat(location.newLat || location.lat),
        lng: parseFloat(location.newLon || location.lon),
      };
    } catch (error) {
      alert(`주소 변환 실패: ${address}\n${error.message}`);
      return null;
    }
  };

  // 길찾기 버튼 클릭 핸들러
  const handleSearch = async () => {
    if (!start || !end) {
      alert("출발지와 도착지를 입력해주세요.");
      return;
    }

    const startCoord = await geocode(start);
    if (!startCoord) return;

    const endCoord = await geocode(end);
    if (!endCoord) return;

    drawRoute(startCoord, endCoord);
  };

  // 길찾기 경로 요청 및 지도에 경로 그리기
  const drawRoute = async (startCoord, endCoord) => {
    if (!window.Tmapv2) {
      console.log(window);
      console.error("Tmapv2가 로드되지 않았습니다.");
      return;
    }

    try {
      const url =
        "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&appKey=VqMhcfR29p90wnyQM6IsS9jccnNyJfQF0DVa6do7";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          appKey: "VqMhcfR29p90wnyQM6IsS9jccnNyJfQF0DVa6do7",
        },
        body: JSON.stringify({
          startX: startCoord.lng.toString(),
          startY: startCoord.lat.toString(),
          endX: endCoord.lng.toString(),
          endY: endCoord.lat.toString(),
          reqCoordType: "WGS84GEO",
          resCoordType: "WGS84GEO",
          startName: "출발지",
          endName: "도착지",
        }),
      });

      if (!res.ok) throw new Error(`길찾기 API 실패: ${res.status}`);

      const json = await res.json();
      console.log("TMAP 길찾기 응답:", json);

      if (!json.features) {
        alert("경로를 찾을 수 없습니다. 출발지와 도착지를 다시 확인해주세요.");
        return;
      }

      const linePath = json.features
        .filter((feat) => feat.geometry.type === "LineString")
        .flatMap((feat) =>
          feat.geometry.coordinates.map(
            ([lon, lat]) => new window.Tmapv2.LatLng(lat, lon)
          )
        );

      if (!linePath.length) {
        alert("경로 좌표를 찾을 수 없습니다.");
        return;
      }

      const map = mapRef.current;

      new window.Tmapv2.Polyline({
        path: linePath,
        strokeColor: "#ff0000",
        strokeWeight: 6,
        map,
      });

      map.setCenter(linePath[0]);
    } catch (error) {
      alert("길찾기 중 오류가 발생했습니다:\n" + error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>🗺️ Tmap 길찾기</h1>
      <input
        value={start}
        onChange={(e) => setStart(e.target.value)}
        placeholder="출발지"
      />
      <input
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        placeholder="도착지"
      />
      <button onClick={handleSearch}>길찾기</button>
      <div id="map_div" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
}
