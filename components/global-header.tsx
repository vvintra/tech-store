"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingCart, Menu, X, Phone, Instagram, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"

const categories = [
  { name: "iPhones", href: "/iphones" },
  { name: "Samsung", href: "/samsung" },
  { name: "Xiaomi", href: "/xiaomi" },
  { name: "Motorola", href: "/motorola" },
  { name: "MacBooks", href: "/macbooks" },
  { name: "Apple Watch", href: "/apple-watch" },
  { name: "iPads", href: "/ipads" },
  { name: "AirPods", href: "/airpods" },
  { name: "Audio", href: "/audio" },
  { name: "Gaming", href: "/gaming" },
  { name: "Smartwatchs", href: "/smartwatchs" },
  { name: "Accesorios", href: "/accesorios" },
]

export function GlobalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items, toggleCart } = useCartStore()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-medium">3412774303 | 1127208960</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Rosario, Argentina</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Instagram className="h-4 w-4" />
                <span>@audio.phones</span>
              </div>
              <Badge className="bg-white/20 text-white hover:bg-white/30 px-3 py-1">🚚 Envío gratis +$50.000</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image src="https://audiophones.com.ar/src/img/logo-ap-white.png" alt="AudioPhones Logo" width={44} height={44} className="text-white" />
              </div>
              <div className="text-2xl font-bold">
                <span className="text-gray-900">AUDIO</span>
                <span className="text-red-500">PHONES</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Inicio
              </Link>
              <div className="relative group">
                <button className="text-gray-700 hover:text-red-600 font-medium transition-colors">Productos</button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link href="/ofertas" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Ofertas
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Contacto
              </Link>
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Buscar productos..."
                    className="pl-10 pr-4 py-2 w-64 border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cart */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleCart}
                className="relative border-gray-200 hover:border-red-500 hover:text-red-600 rounded-full px-4 py-2 bg-transparent"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="pl-10 pr-4 py-3 w-full border-gray-200 rounded-full"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">Productos</div>
                <div className="grid grid-cols-2 gap-1 px-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/ofertas"
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link
                href="/contacto"
                className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
