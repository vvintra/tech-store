"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, CreditCard, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useCartStore } from "@/lib/cart-store"
import { useProductStore } from "@/lib/product-store"

export default function CheckoutPage() {
  const { items, clearCart, getTotalPrice } = useCartStore()
  const { updateStock } = useProductStore()

  const [formData, setFormData] = useState({
    // Datos personales
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Dirección (única para facturación y envío)
    country: "Argentina",
    state: "",
    city: "",
    address: "",
    postalCode: "",

    // Notas
    notes: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  const subtotal = getTotalPrice()
  const shipping = 15000 // Envío fijo
  const total = subtotal + shipping

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento
    setTimeout(() => {
      // Actualizar stock de productos
      items.forEach((item) => {
        updateStock(item.id, item.quantity)
      })

      setIsProcessing(false)
      setOrderCompleted(true)

      // Aquí se enviaría el email automático
      sendOrderEmail()
    }, 2000)
  }

  const sendOrderEmail = () => {
    // En producción, esto sería una llamada a API para enviar el email
    console.log("Enviando email con datos de pago...")
  }

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0 && !orderCompleted) {
      // Opcional: redirigir a la tienda si no hay productos
    }
  }, [items, orderCompleted])

  if (orderCompleted) {
    return <OrderCompletedPage formData={formData} total={total} items={items} onComplete={() => clearCart()} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la tienda
            </Link>
            <div className="ml-8">
              <h1 className="text-2xl font-bold text-gray-900">Finalizar Compra</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Datos Personales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Datos Personales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Dirección de Facturación y Envío */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Dirección de Facturación y Envío
                  </CardTitle>
                  <CardDescription>La dirección será utilizada tanto para facturación como para envío</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="country">País / Región *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección de la calle *</Label>
                    <Input
                      id="address"
                      placeholder="Número de la casa y nombre de la calle"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">Región / Provincia *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Elegir una opción..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                          <SelectItem value="CABA">CABA</SelectItem>
                          <SelectItem value="Córdoba">Córdoba</SelectItem>
                          <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                          <SelectItem value="Mendoza">Mendoza</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Código postal / ZIP *</Label>
                      <Input
                        id="postalCode"
                        value={formData.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notas del pedido */}
              <Card>
                <CardHeader>
                  <CardTitle>Notas del pedido (opcional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                  />
                </CardContent>
              </Card>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tu Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Productos */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío:</span>
                    <span>${shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Método de pago */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Método de pago</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Una vez confirmado el pedido, te enviaremos un email con los datos bancarios para realizar la
                      transferencia.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                  disabled={isProcessing || items.length === 0}
                  onClick={handleSubmit}
                >
                  {isProcessing ? "Procesando..." : "REALIZAR EL PEDIDO"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Algunos precios pueden estar sujetos a cambios. Despachamos los Martes y Viernes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderCompletedPage({ formData, total, items, onComplete }: any) {
  const orderNumber = Math.floor(Math.random() * 100000) + 10000

  useEffect(() => {
    // Limpiar carrito cuando se complete la orden
    onComplete()
  }, [onComplete])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <CardTitle className="text-2xl text-green-600">¡Gracias! Tu pedido ha sido recibido.</CardTitle>
          <CardDescription>Número de pedido: #{orderNumber}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Detalles del pedido */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Detalles del pedido</h3>
            <div className="space-y-2">
              {items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t">
              <div>
                <span className="text-gray-600">Total:</span>
                <p className="font-medium">${total.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Fecha:</span>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Correo electrónico:</span>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <span className="text-gray-600">Método de pago:</span>
                <p className="font-medium">Transferencia Bancaria</p>
              </div>
            </div>
          </div>

          {/* Información de pago */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-blue-800">Información de Pago</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Banco:</span> Banco Nación
              </div>
              <div>
                <span className="font-medium">CBU:</span> 0110599520000012345678
              </div>
              <div>
                <span className="font-medium">Alias:</span> AUDIOPHONES.PAGO
              </div>
              <div>
                <span className="font-medium">Titular:</span> AudioPhones SRL
              </div>
              <div>
                <span className="font-medium">CUIT:</span> 30-12345678-9
              </div>
            </div>
            <p className="text-blue-700 text-sm mt-3">
              También hemos enviado esta información a tu correo electrónico.
            </p>
          </div>

          {/* Dirección */}
          <div>
            <h4 className="font-semibold mb-2">Dirección de facturación y envío</h4>
            <div className="text-sm text-gray-600">
              <p>
                {formData.firstName} {formData.lastName}
              </p>
              <p>{formData.address}</p>
              <p>
                {formData.city}, {formData.state}
              </p>
              <p>{formData.postalCode}</p>
              <p>{formData.email}</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <Button className="bg-orange-600 hover:bg-orange-700">Continuar Comprando</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
