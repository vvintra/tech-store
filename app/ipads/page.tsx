"use client"

import { useState, useEffect } from "react"
import { Star, Grid, List, ArrowLeft, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCartStore } from "@/lib/cart-store"
import { useProductStore } from "@/lib/product-store"

export default function iPadsPage() {
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

  const allIPads = getProductsByCategory("ipads")

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        storage: product.storage,
        color: product.color,
      })
      setTimeout(() => toggleCart(), 100)
    }
  }

  const filteredProducts = allIPads.filter((product) => {
    if (filterBy === "all") return true
    if (filterBy === "new") return product.condition === "Nuevo"
    if (filterBy === "used") return product.condition === "Usado"
    if (filterBy === "sale") return product.badge === "Sale"
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
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-orange-600 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver al inicio
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">iPads</h1>
                <p className="text-gray-600 mt-1">
                  Descubre la mejor selección de iPads ({allIPads.length} productos disponibles)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-40 h-10 border-gray-200 rounded-full">
                <SelectValue placeholder="Filtrar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="new">Nuevos</SelectItem>
                <SelectItem value="used">Usados</SelectItem>
                <SelectItem value="sale">En Oferta</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-10 border-gray-200 rounded-full">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-10 px-4 rounded-full"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-10 px-4 rounded-full"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/placeholder.svg?height=48&width=48" alt="No products" width={48} height={48} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay productos disponibles</h3>
            <p className="text-gray-600 mb-6">
              {filterBy !== "all" || sortBy !== "featured"
                ? "Intenta ajustar los filtros de búsqueda"
                : "Agrega productos desde el panel de administración"}
            </p>
            <Link href="/admin/login">
              <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 rounded-full">
                Ir al Panel de Admin
              </Button>
            </Link>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
            {sortedProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white"
              >
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
                      className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold ${
                        product.badge === "Sale"
                          ? "bg-red-500 hover:bg-red-500"
                          : product.badge === "New"
                            ? "bg-green-500 hover:bg-green-500"
                            : product.badge === "Bestseller"
                              ? "bg-orange-500 hover:bg-orange-500"
                              : product.badge === "Pro"
                                ? "bg-purple-500 hover:bg-purple-500"
                                : "bg-blue-500 hover:bg-blue-500"
                      } text-white shadow-lg`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                  <Badge className="absolute top-4 right-4 bg-gray-900 hover:bg-gray-900 text-white px-3 py-1 text-xs font-bold">
                    {product.condition}
                  </Badge>
                  {product.stock <= 5 && product.stock > 0 && (
                    <Badge className="absolute bottom-4 right-4 bg-yellow-500 hover:bg-yellow-500 text-white px-3 py-1 text-xs font-bold">
                      Últimas {product.stock}
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-600 text-white px-3 py-1 text-xs font-bold">
                      Sin Stock
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className={`${viewMode === "list" ? "flex justify-between items-start" : ""}`}>
                    <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        {product.storage && <span>{product.storage}</span>}
                        {product.storage && product.color && <span className="mx-2">•</span>}
                        {product.color && <span>{product.color}</span>}
                      </div>

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

                      <div className="space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Stock: {product.stock} unidades</p>
                      </div>
                    </div>

                    <div className={`${viewMode === "list" ? "ml-6" : "mt-4"}`}>
                      <Button
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
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
