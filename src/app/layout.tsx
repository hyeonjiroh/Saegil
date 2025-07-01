import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "새길",
  description: "새만금 새길",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=fbf06b0205944d050daafc37e1714483&autoload=false`}
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
