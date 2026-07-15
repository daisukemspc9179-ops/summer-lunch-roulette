import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "なつやすみ おひるルーレット",
  description: "くるっと回して今日のお昼を決める、夏休みのお昼ごはんルーレット。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
