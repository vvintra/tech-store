"use client"

import { useEffect } from "react"
import {
  Star,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Gamepad2,
  Phone,
  Instagram,
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { useProductStore } from "@/lib/product-store"

const testimonials = [
  {
    name: "Carlos Mendoza",
    rating: 5,
    text: "Compré mi iPhone 15 Pro en AudioPhones y el servicio fue excepcional. La entrega fue rápida y el producto llegó en perfectas condiciones. Definitivamente volveré a comprar.",
    product: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Ana García",
    rating: 5,
    text: "Excelente atención al cliente y precios competitivos. Mi Samsung Galaxy funciona perfectamente y el proceso de compra fue muy sencillo. Los recomiendo 100%.",
    product: "Samsung Galaxy S24",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "Miguel Torres",
    rating: 5,
    text: "La mejor tienda de celulares online. Productos originales, garantía completa y soporte técnico de primera. Muy recomendado para todos.",
    product: "Xiaomi Redmi Note 13",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
  },
]

const features = [
  {
    icon: Shield,
    title: "Garantía Oficial",
    description: "Todos nuestros productos cuentan con garantía oficial del fabricante",
  },
  {
    icon: Truck,
    title: "Envío Gratis",
    description: "Envío gratuito en compras superiores a $50.000 en todo el país",
  },
  {
    icon: CreditCard,
    title: "Múltiples Pagos",
    description: "Aceptamos transferencias, efectivo y todos los medios de pago",
  },
  {
    icon: Users,
    title: "Soporte 24/7",
    description: "Atención personalizada y soporte técnico especializado",
  },
]

const iconMap = {
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Gamepad2,
}

export default function AudioPhonesStore() {
  const { addItem, toggleCart } = useCartStore()
  const { categories, getFeaturedProducts, initializeProducts, initialized } = useProductStore()

  useEffect(() => {
    if (!initialized) {
      initializeProducts()
    }
  }, [initialized, initializeProducts])

  // Obtener productos destacados dinámicamente
  const featuredProducts = getFeaturedProducts()

  const handleAddToCart = (product: any) => {
    if (product.stock > 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      // Abrir carrito después de agregar
      setTimeout(() => toggleCart(), 100)
    }
  }

  const getCategoryLink = (categoryId: string) => {
    const linkMap: { [key: string]: string } = {
      iphones: "/iphones",
      samsung: "/samsung",
      xiaomi: "/xiaomi",
      motorola: "/motorola",
      macbooks: "/macbooks",
      "apple-watch": "/apple-watch",
      ipads: "/ipads",
      airpods: "/airpods",
      accesorios: "/accesorios",
      audio: "/audio",
      smartwatchs: "/smartwatchs",
      gaming: "/gaming",
    }
    return linkMap[categoryId] || "#"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(249, 115, 22, 0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 px-4 py-2 text-sm font-medium">
                  ✨ Nuevos productos disponibles
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Los Mejores
                  <span className="block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                    Celulares
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Descubre la mejor selección de iPhones, Samsung, Xiaomi y más. Productos originales con garantía
                  oficial y el mejor servicio de Argentina.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/iphones">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Ver Productos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50 bg-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Celulares Usados
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-orange-100">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Clientes Felices</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">1000+</div>
                  <div className="text-sm text-gray-600">Productos Vendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Calificación</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=500&fit=crop"
                alt="AudioPhones - Celulares Premium"
                width={600}
                height={500}
                className="rounded-3xl shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explora por Categorías</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que buscas en nuestras categorías especializadas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Smartphone
              return (
                <Link key={category.id} href={getCategoryLink(category.id)}>
                  <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-white to-gray-50 hover:from-orange-50 hover:to-orange-100">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-orange-500 group-hover:to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-gray-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors">
                        {category.productCount} productos
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 px-4 py-2 text-sm font-medium mb-4">
              ⭐ Lo más vendido
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los productos más populares y mejor valorados por nuestros clientes
            </p>
          </div>

          {featuredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-gray-500 text-xl mb-6">No hay productos destacados configurados.</p>
              <Link href="/admin/login">
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 rounded-full">
                  Configurar Productos Destacados
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {product.badge && (
                      <Badge
                        className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold ${
                          product.badge === "Sale"
                            ? "bg-red-500 hover:bg-red-500"
                            : product.badge === "New"
                              ? "bg-green-500 hover:bg-green-500"
                              : product.badge === "Bestseller"
                                ? "bg-orange-500 hover:bg-orange-500"
                                : "bg-blue-500 hover:bg-blue-500"
                        } text-white shadow-lg`}
                      >
                        {product.badge}
                      </Badge>
                    )}

                    <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-500 text-white px-3 py-1 text-xs font-bold shadow-lg">
                      ★ Destacado
                    </Badge>

                    {product.stock <= 5 && product.stock > 0 && (
                      <Badge className="absolute bottom-4 right-4 bg-yellow-600 hover:bg-yellow-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
                        Últimas {product.stock}
                      </Badge>
                    )}

                    {product.stock === 0 && (
                      <Badge className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-600 text-white px-3 py-1 text-xs font-bold shadow-lg">
                        Sin Stock
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <p className="text-sm text-orange-600 font-medium mb-1">{product.category}</p>
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
                      )}
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

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Stock: {product.stock} unidades</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-500 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-4 py-2 text-sm font-medium mb-4">
              💬 Testimonios
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl text-gray-600">Basado en más de 500 reseñas verificadas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 border-0 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-orange-600">Compró: {testimonial.product}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl font-bold text-white mb-4">Mantente al día con las últimas ofertas</h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Suscríbete y recibe ofertas exclusivas, noticias sobre nuevos productos y descuentos especiales
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Tu email"
              className="flex-1 bg-white/90 backdrop-blur border-0 h-12 rounded-full px-6 focus:bg-white transition-all duration-300"
            />
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 h-12 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Suscribirse
            </Button>
          </div>
          <p className="text-orange-100 text-sm mt-4">No spam. Solo las mejores ofertas y noticias de AudioPhones.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div className="text-2xl font-bold">
                  <span className="text-white">AUDIO</span>
                  <span className="text-orange-500">PHONES</span>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Tu tienda de confianza para celulares y tecnología con garantía oficial. Más de 500 clientes satisfechos
                nos respaldan.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-medium">3412774303</div>
                    <div className="text-sm text-gray-400">1127208960</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Instagram className="h-5 w-5 text-orange-500" />
                  <div>
                    <div className="font-medium">@audio.phones</div>
                    <div className="text-sm text-gray-400">@iphones.audio</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Productos</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/iphones" className="hover:text-orange-500 transition-colors">
                    iPhones
                  </Link>
                </li>
                <li>
                  <Link href="/samsung" className="hover:text-orange-500 transition-colors">
                    Samsung
                  </Link>
                </li>
                <li>
                  <Link href="/xiaomi" className="hover:text-orange-500 transition-colors">
                    Xiaomi
                  </Link>
                </li>
                <li>
                  <Link href="/motorola" className="hover:text-orange-500 transition-colors">
                    Motorola
                  </Link>
                </li>
                <li>
                  <Link href="/macbooks" className="hover:text-orange-500 transition-colors">
                    MacBooks
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Soporte</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Garantías
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Devoluciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6">Empresa</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/admin/login" className="hover:text-orange-500 transition-colors">
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 AudioPhones. Todos los derechos reservados. | Rosario, Argentina
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
// This code is a React component for the AudioPhones store homepage.