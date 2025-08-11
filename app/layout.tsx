import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GlobalHeader } from "@/components/global-header"
import { CartSidebar } from "@/components/cart-sidebar"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AudioPhones - Los Mejores Celulares de Argentina",
  description:
    "Descubre la mejor selección de iPhones, Samsung, Xiaomi y más. Productos originales con garantía oficial y el mejor servicio de Argentina.",
  keywords: "celulares, iphones, samsung, xiaomi, motorola, audiophones, argentina",
  authors: [{ name: "AudioPhones" }],
  creator: "AudioPhones",
  publisher: "AudioPhones",
  robots: "index, follow",
  openGraph: {
    title: "AudioPhones - Los Mejores Celulares de Argentina",
    description:
      "Descubre la mejor selección de iPhones, Samsung, Xiaomi y más. Productos originales con garantía oficial.",
    url: "https://audiophones.com.ar",
    siteName: "AudioPhones",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AudioPhones - Los Mejores Celulares de Argentina",
    description: "Descubre la mejor selección de iPhones, Samsung, Xiaomi y más.",
    creator: "@audio.phones",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <GlobalHeader />
          <main>{children}</main>
          <CartSidebar />
        </ThemeProvider>
      </body>
    </html>
  )
}
