"use client"
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"

export function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } =
    useCartStore()

  const total = getTotalPrice()
  const itemCount = getTotalItems()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">Carrito</h2>
            {itemCount > 0 && <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">{itemCount}</Badge>}
          </div>
          <Button variant="ghost" size="sm" onClick={toggleCart} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-600 mb-6">Agrega algunos productos para comenzar</p>
              <Button
                onClick={toggleCart}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 rounded-full"
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    {(item.storage || item.color) && (
                      <p className="text-xs text-gray-500">
                        {item.storage && `${item.storage}`}
                        {item.storage && item.color && " • "}
                        {item.color && item.color}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-orange-600">${item.price.toLocaleString()}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 border-gray-200"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-gray-200"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-orange-600">${total.toLocaleString()}</span>
            </div>

            <div className="space-y-3">
              <Link href="/checkout" onClick={toggleCart}>
                <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-full font-semibold shadow-lg">
                  Finalizar Compra
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-full bg-transparent"
              >
                Vaciar Carrito
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">Envío gratis en compras superiores a $50.000</p>
          </div>
        )}
      </div>
    </>
  )
}
