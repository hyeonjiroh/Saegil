import { useEffect, useRef, useState } from "react";

export default function TmapDirections() {
  const mapRef = useRef(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Tmapv2) {
      initMap();
      return;
    }

    const existingScript = document.querySelector('script[src*="tmap/js"]');
    if (existingScript) {
      existingScript.addEventListener("load", initMap);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://apis.openapi.sk.com/tmap/js?version=1&appKey=VqMhcfR29p90wnyQM6IsS9jccnNyJfQF0DVa6do7";
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!window.Tmapv2 || mapRef.current) return;

    const map = new window.Tmapv2.Map("map_div", {
      center: new window.Tmapv2.LatLng(37.570028, 126.989072),
      width: "100%",
      height: "800px",
      zoom: 14,
    });
    mapRef.current = map;
  };

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
