"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Package,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Star,
  Search,
  Upload,
  X,
  Save,
  AlertCircle,
  CheckCircle,
  LogOut,
  RefreshCw,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useProductStore, type Product } from "@/lib/product-store"

const categories = [
  "iPhones",
  "Samsung",
  "Xiaomi",
  "Motorola",
  "MacBooks",
  "Apple Watch",
  "iPads",
  "AirPods",
  "Audio",
  "Gaming",
  "Smartwatchs",
  "Accesorios",
]

const badges = ["New", "Sale", "Bestseller", "Pro", "Limited"]

export default function AdminDashboard() {
  const router = useRouter()
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    initializeProducts,
    initialized,
    refreshStore,
    updateCategories,
  } = useProductStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    description: "",
    stock: "",
    rating: "4.5",
    reviews: "0",
    badge: "",
    featured: false,
    images: [] as string[],
  })

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth")
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    if (!initialized) {
      initializeProducts()
    }
  }, [router, initialized, initializeProducts])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    refreshStore()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      description: "",
      stock: "",
      rating: "4.5",
      reviews: "0",
      badge: "",
      featured: false,
      images: [],
    })
    setImageFiles([])
    setImageUrls([])
    setEditingProduct(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImageFiles(files)

    // Create preview URLs
    const urls = files.map((file) => URL.createObjectURL(file))
    setImageUrls(urls)

    // For demo purposes, we'll simulate uploaded URLs
    // In a real app, you would upload to a service like Cloudinary or AWS S3
    const simulatedUrls = files.map((file, index) => {
      // Create a more realistic URL structure
      const fileName = file.name.replace(/\s+/g, "-").toLowerCase()
      return `/uploads/${Date.now()}-${index}-${fileName}`
    })

    setFormData((prev) => ({ ...prev, images: simulatedUrls }))
  }

  const removeImage = (index: number) => {
    const newFiles = imageFiles.filter((_, i) => i !== index)
    const newUrls = imageUrls.filter((_, i) => i !== index)
    const newImages = formData.images.filter((_, i) => i !== index)

    setImageFiles(newFiles)
    setImageUrls(newUrls)
    setFormData((prev) => ({ ...prev, images: newImages }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      stock: Number.parseInt(formData.stock),
      rating: Number.parseFloat(formData.rating),
      reviews: Number.parseInt(formData.reviews),
      image: formData.images[0] || "/placeholder.svg?height=300&width=300",
      images: formData.images.length > 0 ? formData.images : ["/placeholder.svg?height=300&width=300"],
      condition: "Nuevo" as const,
      productType: "Gaming" as const, // Default, should be determined by category
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, productData)
    } else {
      addProduct(productData)
    }

    setIsDialogOpen(false)
    resetForm()

    // Refresh categories after adding/updating
    setTimeout(() => {
      updateCategories()
    }, 100)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description || "",
      stock: product.stock.toString(),
      rating: product.rating.toString(),
      reviews: product.reviews.toString(),
      badge: product.badge || "",
      featured: product.featured || false,
      images: product.images || [product.image],
    })
    // Set preview URLs for editing
    setImageUrls(product.images || [product.image])
    setImageFiles([]) // Clear file inputs when editing
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      deleteProduct(Number(id))
      setTimeout(() => {
        updateCategories()
      }, 100)
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`¿Estás seguro de que quieres eliminar ${selectedProducts.length} productos?`)) {
      selectedProducts.forEach((id) => deleteProduct(Number(id)))
      setSelectedProducts([])
      setTimeout(() => {
        updateCategories()
      }, 100)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    totalProducts: products.length,
    totalRevenue: products.reduce((sum, product) => sum + product.price * (100 - product.stock), 0),
    lowStock: products.filter((product) => product.stock <= 5).length,
    featuredProducts: products.filter((product) => product.featured).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <Image src="/logo-white.png" alt="AudioPhones Logo" width={24} height={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  <span className="text-gray-900">AUDIO</span>
                  <span className="text-red-500">PHONES</span>
                </h1>
                <p className="text-sm text-gray-600">Panel de Administración</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                variant="outline"
                className="border-gray-200 hover:border-red-500 hover:text-red-600 transition-colors bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                {isRefreshing ? "Actualizando..." : "Actualizar Stock"}
              </Button>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 px-3 py-1">
                <CheckCircle className="h-4 w-4 mr-1" />
                Sistema Activo
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-gray-200 hover:border-red-500 hover:text-red-600 transition-colors bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Productos</p>
                  <p className="text-3xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Ingresos Totales</p>
                  <p className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Stock Bajo</p>
                  <p className="text-3xl font-bold">{stats.lowStock}</p>
                </div>
                <AlertCircle className="h-12 w-12 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Destacados</p>
                  <p className="text-3xl font-bold">{stats.featuredProducts}</p>
                </div>
                <Star className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900">Gestión de Productos</CardTitle>
                <CardDescription className="text-gray-600">
                  Administra tu inventario de productos de AudioPhones
                </CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Nuevo Producto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">
                      {editingProduct ? "Editar Producto" : "Nuevo Producto"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      {editingProduct ? "Modifica los detalles del producto" : "Agrega un nuevo producto al inventario"}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                          Nombre del Producto
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="iPhone 15 Pro Max"
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                          Categoría
                        </Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full h-12 border border-gray-200 rounded-xl px-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        >
                          <option value="">Seleccionar categoría</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                          Precio
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="299999"
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="originalPrice" className="text-sm font-medium text-gray-700">
                          Precio Original (Opcional)
                        </Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                          placeholder="349999"
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                        Descripción
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descripción detallada del producto..."
                        className="min-h-[100px] border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                          Stock
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="10"
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="rating" className="text-sm font-medium text-gray-700">
                          Rating
                        </Label>
                        <Input
                          id="rating"
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reviews" className="text-sm font-medium text-gray-700">
                          Reviews
                        </Label>
                        <Input
                          id="reviews"
                          type="number"
                          value={formData.reviews}
                          onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                          placeholder="0"
                          className="h-12 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="badge" className="text-sm font-medium text-gray-700">
                          Badge (Opcional)
                        </Label>
                        <select
                          id="badge"
                          value={formData.badge}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          className="w-full h-12 border border-gray-200 rounded-xl px-3 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="">Sin badge</option>
                          {badges.map((badge) => (
                            <option key={badge} value={badge}>
                              {badge}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Opciones</Label>
                        <div className="flex items-center space-x-2 h-12">
                          <Checkbox
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                          />
                          <Label htmlFor="featured" className="text-sm text-gray-700">
                            Producto Destacado
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-4">
                      <Label className="text-sm font-medium text-gray-700">Imágenes del Producto</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-red-500 transition-colors">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 mb-2">Haz clic para subir imágenes o arrastra aquí</p>
                          <p className="text-sm text-gray-500">PNG, JPG, WEBP hasta 10MB cada una</p>
                        </label>
                      </div>

                      {/* Image Preview */}
                      {(imageUrls.length > 0 || formData.images.length > 0) && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {(imageUrls.length > 0 ? imageUrls : formData.images).map((url, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={
                                  url.startsWith("blob:")
                                    ? url
                                    : url.startsWith("/uploads/")
                                      ? `/placeholder.svg?height=150&width=150&text=Imagen+${index + 1}`
                                      : url
                                }
                                alt={`Preview ${index + 1}`}
                                width={150}
                                height={150}
                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              {index === 0 && (
                                <Badge className="absolute bottom-2 left-2 bg-red-500 text-white text-xs">
                                  Principal
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="px-6 py-3 border-gray-200 hover:border-gray-300 rounded-full"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {editingProduct ? "Actualizar" : "Crear"} Producto
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 border-gray-200 rounded-full focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-12 border border-gray-200 rounded-full px-4 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="all">Todas las categorías</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                {selectedProducts.length > 0 && (
                  <Button
                    onClick={handleBulkDelete}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 px-4 rounded-full bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar ({selectedProducts.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedProducts(filteredProducts.map((p) => p.id.toString()))
                          } else {
                            setSelectedProducts([])
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">Producto</TableHead>
                    <TableHead className="font-semibold text-gray-900">Categoría</TableHead>
                    <TableHead className="font-semibold text-gray-900">Precio</TableHead>
                    <TableHead className="font-semibold text-gray-900">Stock</TableHead>
                    <TableHead className="font-semibold text-gray-900">Rating</TableHead>
                    <TableHead className="font-semibold text-gray-900">Estado</TableHead>
                    <TableHead className="font-semibold text-gray-900">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <Checkbox
                          checked={selectedProducts.includes(product.id.toString())}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProducts([...selectedProducts, product.id.toString()])
                            } else {
                              setSelectedProducts(selectedProducts.filter((id) => id !== product.id.toString()))
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{product.name}</div>
                            {product.badge && (
                              <Badge
                                className={`text-xs ${
                                  product.badge === "Sale"
                                    ? "bg-red-100 text-red-800"
                                    : product.badge === "New"
                                      ? "bg-green-100 text-green-800"
                                      : product.badge === "Bestseller"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {product.badge}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-200 text-gray-700">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-gray-900">${product.price.toLocaleString()}</div>
                          {product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            product.stock === 0
                              ? "bg-red-100 text-red-800"
                              : product.stock <= 5
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {product.stock} unidades
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-sm text-gray-500">({product.reviews})</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {product.featured && <Badge className="bg-red-100 text-red-800 text-xs">Destacado</Badge>}
                          <Badge
                            className={`text-xs ${
                              product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock > 0 ? "Disponible" : "Agotado"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="border-gray-200 hover:border-red-500 hover:text-red-600 p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id.toString())}
                            className="border-gray-200 hover:border-red-500 hover:text-red-600 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "Intenta ajustar los filtros de búsqueda"
                    : "Comienza agregando tu primer producto"}
                </p>
                {!searchTerm && selectedCategory === "all" && (
                  <Button
                    onClick={() => {
                      resetForm()
                      setIsDialogOpen(true)
                    }}
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Primer Producto
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
