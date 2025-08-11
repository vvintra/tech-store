"use client"

import { useState, useEffect } from "react"
import { Star, Grid, List, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from "@/lib/cart-store"
import { useProductStore } from "@/lib/product-store"

export default function AccesoriosPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [filterBy, setFilterBy] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const { addItem, toggleCart } = useCartStore()
  const { getProductsByCategory, initializeProducts, initialized } = useProductStore()

  useEffect(() => {
    if (!initialized) {
      initializeProducts()
    }
  }, [initialized, initializeProducts])

  // Obtener productos de Accesorios dinámicamente
  const allAccesorios = getProductsByCategory("accesorios")

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      setTimeout(() => toggleCart(), 100)
    }
  }

  const filteredProducts = allAccesorios.filter((product) => {
    if (filterBy === "all") return true
    if (filterBy === "new") return product.condition === "Nuevo"
    if (filterBy === "used") return product.condition === "Usado"
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Accesorios</h1>
                <p className="text-gray-600 mt-1">
                  Descubre la mejor selección de Accesorios ({allAccesorios.length} productos)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="new">Nuevos</SelectItem>
                <SelectItem value="used">Usados</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay accesorios disponibles.</p>
            <p className="text-gray-400 mt-2">Agrega productos desde el panel de administración</p>
            <Link href="/admin/login">
              <Button className="mt-4 bg-orange-600 hover:bg-orange-700">Ir al Panel de Admin</Button>
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "grid" ? "h-64" : "h-48"
                    }`}
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge === "Sale"
                          ? "bg-red-500"
                          : product.badge === "New"
                            ? "bg-green-500"
                            : product.badge === "Bestseller"
                              ? "bg-orange-500"
                              : "bg-blue-500"
                      }`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-gray-900">{product.condition}</Badge>
                  {product.stock <= 5 && product.stock > 0 && (
                    <Badge className="absolute bottom-3 right-3 bg-yellow-500">Últimas {product.stock}</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className={`${viewMode === "list" ? "flex justify-between items-start" : ""}`}>
                    <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      )}
                      <p className="text-sm text-gray-500 mb-2">
                        {product.storage && `${product.storage} • `}
                        {product.color}
                      </p>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Stock: {product.stock} unidades</p>
                        </div>
                      </div>
                    </div>

                    <div className={`${viewMode === "list" ? "ml-4" : "mt-4"}`}>
                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700 w-full"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
