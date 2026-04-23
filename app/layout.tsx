import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Followy — Meetings that actually ship.",
  description:
    "An AI teammate that joins every call, files Jira tickets, Slacks the follow-ups, and books the next meeting.",
  openGraph: {
    title: "Followy — Meetings that actually ship.",
    description:
      "An AI teammate that joins every call, files Jira tickets, Slacks the follow-ups, and books the next meeting.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Followy&accent=orange&category=Productivity",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Followy&accent=orange&category=Productivity",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2032%2032'%3E%3Ccircle%20cx%3D'16'%20cy%3D'16'%20r%3D'14'%20fill%3D'%23f97316'%2F%3E%3C%2Fsvg%3E"
        />
        <script
          defer
          data-domain="followy.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
