import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  originalPrice?: number
  stock: number
  category: string
  categoryId: string
  productType: "Celular" | "Computadora" | "Accesorio" | "Audio" | "Gaming" | "Smartwatch" | "Tablet"
  condition: "Nuevo" | "Usado" | "Descatalogado"
  image: string
  images?: string[]
  storage?: string
  color?: string
  rating: number
  reviews: number
  badge?: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
}

interface ProductStore {
  products: Product[]
  categories: Category[]
  initialized: boolean
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void
  getProductById: (id: number) => Product | undefined
  getProductsByCategory: (categoryId: string) => Product[]
  getProductsByType: (productType: string) => Product[]
  getFeaturedProducts: () => Product[]
  updateStock: (id: number, quantity: number) => void
  initializeProducts: () => void
  updateCategories: () => void
  getActiveProducts: () => Product[]
  refreshStore: () => void
}

const initialCategories: Category[] = [
  { id: "iphones", name: "iPhones", slug: "iphones", icon: "Smartphone", productCount: 0 },
  { id: "samsung", name: "Samsung", slug: "samsung", icon: "Smartphone", productCount: 0 },
  { id: "xiaomi", name: "Xiaomi | Redmi", slug: "xiaomi", icon: "Smartphone", productCount: 0 },
  { id: "motorola", name: "Motorola", slug: "motorola", icon: "Smartphone", productCount: 0 },
  { id: "apple-watch", name: "Apple Watch", slug: "apple-watch", icon: "Watch", productCount: 0 },
  { id: "macbooks", name: "MacBooks", slug: "macbooks", icon: "Laptop", productCount: 0 },
  { id: "ipads", name: "iPads", slug: "ipads", icon: "Laptop", productCount: 0 },
  { id: "airpods", name: "AirPods", slug: "airpods", icon: "Headphones", productCount: 0 },
  { id: "accesorios", name: "Accesorios", slug: "accesorios", icon: "Camera", productCount: 0 },
  { id: "audio", name: "Audio", slug: "audio", icon: "Headphones", productCount: 0 },
  { id: "smartwatchs", name: "Smartwatchs", slug: "smartwatchs", icon: "Watch", productCount: 0 },
  { id: "gaming", name: "Gaming", slug: "gaming", icon: "Gamepad2", productCount: 0 },
]

// Función para mapear categorías del admin a categoryId
const mapCategoryToId = (category: string): string => {
  const mapping: { [key: string]: string } = {
    iPhones: "iphones",
    Samsung: "samsung",
    Xiaomi: "xiaomi",
    Motorola: "motorola",
    MacBooks: "macbooks",
    "Apple Watch": "apple-watch",
    iPads: "ipads",
    AirPods: "airpods",
    Audio: "audio",
    Gaming: "gaming",
    Smartwatchs: "smartwatchs",
    Accesorios: "accesorios",
  }
  return mapping[category] || category.toLowerCase()
}

const initialProducts: Product[] = [
  // iPhones
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description:
      "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y diseño en titanio. Pantalla Super Retina XDR de 6.7 pulgadas.",
    price: 1299000,
    originalPrice: 1399000,
    stock: 15,
    category: "iPhones",
    categoryId: "iphones",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    ],
    storage: "256GB",
    color: "Titanio Natural",
    rating: 4.9,
    reviews: 234,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    description:
      "iPhone 15 Pro con diseño en titanio y cámara profesional de 48MP. Sistema de cámaras Pro con teleobjetivo.",
    price: 1099000,
    originalPrice: 1199000,
    stock: 8,
    category: "iPhones",
    categoryId: "iphones",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop"],
    storage: "128GB",
    color: "Azul Titanio",
    rating: 4.8,
    reviews: 189,
    badge: "Sale",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "iPhone 14",
    description:
      "iPhone 14 con chip A15 Bionic y sistema de cámara dual avanzado. Pantalla Super Retina XDR de 6.1 pulgadas.",
    price: 799000,
    originalPrice: 899000,
    stock: 12,
    category: "iPhones",
    categoryId: "iphones",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&h=400&fit=crop",
    storage: "128GB",
    color: "Púrpura",
    rating: 4.7,
    reviews: 445,
    badge: "Sale",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "iPhone 13",
    description: "iPhone 13 con chip A15 Bionic, sistema de cámara dual y pantalla Super Retina XDR de 6.1 pulgadas.",
    price: 699000,
    originalPrice: 799000,
    stock: 20,
    category: "iPhones",
    categoryId: "iphones",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&h=400&fit=crop",
    storage: "128GB",
    color: "Rosa",
    rating: 4.6,
    reviews: 567,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Samsung
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    description: "Galaxy S24 Ultra con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X de 6.8 pulgadas.",
    price: 1199000,
    originalPrice: 1299000,
    stock: 12,
    category: "Samsung",
    categoryId: "samsung",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Titanio Gris",
    rating: 4.8,
    reviews: 189,
    badge: "New",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Samsung Galaxy S24+",
    description: "Samsung Galaxy S24+ con pantalla Dynamic AMOLED 2X de 6.7 pulgadas y cámara triple de 50MP.",
    price: 899000,
    stock: 18,
    category: "Samsung",
    categoryId: "samsung",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Violeta",
    rating: 4.7,
    reviews: 156,
    badge: "Bestseller",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Samsung Galaxy A54 5G",
    description: "Samsung Galaxy A54 5G con triple cámara de 50MP, batería de 5000mAh y pantalla Super AMOLED.",
    price: 449000,
    stock: 25,
    category: "Samsung",
    categoryId: "samsung",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    storage: "128GB",
    color: "Violeta Awesome",
    rating: 4.4,
    reviews: 267,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Xiaomi
  {
    id: 8,
    name: "Xiaomi Redmi Note 13 Pro",
    description:
      "Xiaomi Redmi Note 13 Pro con cámara de 200MP, carga rápida de 67W y pantalla AMOLED de 6.67 pulgadas.",
    price: 399000,
    originalPrice: 449000,
    stock: 20,
    category: "Xiaomi",
    categoryId: "xiaomi",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Azul Océano",
    rating: 4.6,
    reviews: 312,
    badge: "Sale",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Xiaomi 13T Pro",
    description: "Xiaomi 13T Pro con procesador Dimensity 9200+, cámara Leica de 50MP y carga rápida de 120W.",
    price: 699000,
    stock: 15,
    category: "Xiaomi",
    categoryId: "xiaomi",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Negro Meadow",
    rating: 4.7,
    reviews: 189,
    badge: "New",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Xiaomi Redmi 12",
    description: "Xiaomi Redmi 12 con pantalla de 6.79 pulgadas, cámara de 50MP y batería de 5000mAh.",
    price: 249000,
    stock: 30,
    category: "Xiaomi",
    categoryId: "xiaomi",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    storage: "128GB",
    color: "Azul",
    rating: 4.3,
    reviews: 445,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Motorola
  {
    id: 11,
    name: "Motorola Edge 40 Pro",
    description:
      "Motorola Edge 40 Pro con pantalla curva de 6.67 pulgadas, carga inalámbrica de 125W y cámara de 50MP.",
    price: 699000,
    stock: 15,
    category: "Motorola",
    categoryId: "motorola",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Negro Lunar",
    rating: 4.5,
    reviews: 189,
    badge: "New",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 12,
    name: "Motorola G84 5G",
    description: "Motorola G84 5G con pantalla pOLED de 6.55 pulgadas, cámara de 50MP y batería de 5000mAh.",
    price: 349000,
    stock: 22,
    category: "Motorola",
    categoryId: "motorola",
    productType: "Celular",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Azul Medianoche",
    rating: 4.3,
    reviews: 156,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // MacBooks
  {
    id: 13,
    name: "MacBook Air M3",
    description:
      "MacBook Air con chip M3, 8GB RAM, pantalla Liquid Retina de 13.6 pulgadas y hasta 18 horas de batería.",
    price: 1499000,
    stock: 6,
    category: "MacBooks",
    categoryId: "macbooks",
    productType: "Computadora",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    storage: "256GB SSD",
    color: "Gris Espacial",
    rating: 4.9,
    reviews: 123,
    badge: "Pro",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 14,
    name: "MacBook Pro 14 M3",
    description: "MacBook Pro de 14 pulgadas con chip M3 Pro, pantalla Liquid Retina XDR y hasta 22 horas de batería.",
    price: 2299000,
    stock: 4,
    category: "MacBooks",
    categoryId: "macbooks",
    productType: "Computadora",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    storage: "512GB SSD",
    color: "Gris Espacial",
    rating: 4.9,
    reviews: 89,
    badge: "Pro",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // iPads
  {
    id: 15,
    name: "iPad Air M2",
    description: "iPad Air con chip M2, pantalla Liquid Retina de 10.9 pulgadas y compatibilidad con Apple Pencil Pro.",
    price: 899000,
    stock: 10,
    category: "iPads",
    categoryId: "ipads",
    productType: "Tablet",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    storage: "128GB",
    color: "Azul",
    rating: 4.8,
    reviews: 156,
    badge: "New",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 16,
    name: "iPad Pro 12.9 M2",
    description:
      "iPad Pro de 12.9 pulgadas con chip M2, pantalla Liquid Retina XDR y compatibilidad con Magic Keyboard.",
    price: 1399000,
    stock: 5,
    category: "iPads",
    categoryId: "ipads",
    productType: "Tablet",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    storage: "256GB",
    color: "Gris Espacial",
    rating: 4.9,
    reviews: 78,
    badge: "Pro",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // AirPods
  {
    id: 17,
    name: "AirPods Pro 2",
    description:
      "AirPods Pro de 2da generación con cancelación de ruido activa, audio espacial personalizado y estuche MagSafe.",
    price: 249000,
    originalPrice: 279000,
    stock: 25,
    category: "AirPods",
    categoryId: "airpods",
    productType: "Audio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 456,
    badge: "Sale",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 18,
    name: "AirPods 3",
    description: "AirPods de 3ra generación con audio espacial, resistencia al agua y hasta 30 horas de batería total.",
    price: 189000,
    stock: 30,
    category: "AirPods",
    categoryId: "airpods",
    productType: "Audio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 234,
    badge: "",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Apple Watch
  {
    id: 19,
    name: "Apple Watch Series 9",
    description:
      "Apple Watch Series 9 con chip S9, pantalla Always-On Retina más brillante y nuevos gestos con doble toque.",
    price: 449000,
    stock: 12,
    category: "Apple Watch",
    categoryId: "apple-watch",
    productType: "Smartwatch",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    storage: "64GB",
    color: "Rosa",
    rating: 4.8,
    reviews: 189,
    badge: "New",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 20,
    name: "Apple Watch SE",
    description: "Apple Watch SE con funciones esenciales de salud y fitness, resistencia al agua y GPS integrado.",
    price: 299000,
    stock: 18,
    category: "Apple Watch",
    categoryId: "apple-watch",
    productType: "Smartwatch",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    storage: "32GB",
    color: "Luz de las Estrellas",
    rating: 4.6,
    reviews: 267,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Audio
  {
    id: 21,
    name: "Sony WH-1000XM5",
    description:
      "Auriculares inalámbricos Sony con cancelación de ruido líder en la industria y hasta 30 horas de batería.",
    price: 399000,
    stock: 15,
    category: "Audio",
    categoryId: "audio",
    productType: "Audio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    color: "Negro",
    rating: 4.8,
    reviews: 345,
    badge: "Bestseller",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 22,
    name: "JBL Charge 5",
    description:
      "Altavoz Bluetooth portátil JBL con sonido potente, resistencia al agua IP67 y hasta 20 horas de reproducción.",
    price: 149000,
    stock: 20,
    category: "Audio",
    categoryId: "audio",
    productType: "Audio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    color: "Azul",
    rating: 4.6,
    reviews: 278,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Gaming
  {
    id: 23,
    name: "PlayStation 5",
    description: "Consola PlayStation 5 con procesador AMD Zen 2, GPU RDNA 2 y almacenamiento SSD ultrarrápido.",
    price: 699000,
    stock: 8,
    category: "Gaming",
    categoryId: "gaming",
    productType: "Gaming",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
    storage: "825GB SSD",
    color: "Blanco",
    rating: 4.9,
    reviews: 456,
    badge: "New",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 24,
    name: "Xbox Series X",
    description: "Consola Xbox Series X con procesador AMD Zen 2, 12 teraflops de potencia gráfica y Quick Resume.",
    price: 649000,
    stock: 10,
    category: "Gaming",
    categoryId: "gaming",
    productType: "Gaming",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop",
    storage: "1TB SSD",
    color: "Negro",
    rating: 4.8,
    reviews: 389,
    badge: "Pro",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Smartwatchs (otras marcas)
  {
    id: 25,
    name: "Samsung Galaxy Watch 6",
    description: "Samsung Galaxy Watch 6 con monitoreo avanzado de salud, GPS integrado y hasta 40 horas de batería.",
    price: 349000,
    stock: 14,
    category: "Smartwatchs",
    categoryId: "smartwatchs",
    productType: "Smartwatch",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    storage: "16GB",
    color: "Dorado",
    rating: 4.5,
    reviews: 156,
    badge: "",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 26,
    name: "Xiaomi Watch S1",
    description: "Xiaomi Watch S1 con pantalla AMOLED de 1.43 pulgadas, GPS dual y más de 117 modos deportivos.",
    price: 199000,
    stock: 18,
    category: "Smartwatchs",
    categoryId: "smartwatchs",
    productType: "Smartwatch",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    storage: "4GB",
    color: "Negro",
    rating: 4.3,
    reviews: 234,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Accesorios
  {
    id: 27,
    name: "MagSafe Charger",
    description: "Cargador inalámbrico MagSafe de Apple para iPhone con alineación magnética perfecta y carga rápida.",
    price: 49000,
    stock: 35,
    category: "Accesorios",
    categoryId: "accesorios",
    productType: "Accesorio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
    color: "Blanco",
    rating: 4.4,
    reviews: 567,
    badge: "Bestseller",
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 28,
    name: "Anker PowerBank 10000mAh",
    description: "Batería portátil Anker de 10000mAh con carga rápida PowerIQ y diseño compacto ultra delgado.",
    price: 79000,
    stock: 40,
    category: "Accesorios",
    categoryId: "accesorios",
    productType: "Accesorio",
    condition: "Nuevo",
    image: "https://images.unsplash.com/photo-1609592806596-4b8b5b1b8b1b?w=400&h=400&fit=crop",
    color: "Negro",
    rating: 4.6,
    reviews: 789,
    badge: "Bestseller",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      categories: initialCategories,
      initialized: false,

      initializeProducts: () => {
        const state = get()
        if (!state.initialized) {
          if (state.products.length === 0) {
            set({ products: initialProducts, initialized: true })
          } else {
            set({ initialized: true })
          }
          const updatedState = get()
          updatedState.updateCategories()
        }
      },

      updateCategories: () => {
        const state = get()
        const products = state.products.filter((product) => product.condition !== "Descatalogado" && product.stock > 0)
        const updatedCategories = state.categories.map((category) => ({
          ...category,
          productCount: products.filter((product) => product.categoryId === category.id).length,
        }))
        set({ categories: updatedCategories })
      },

      addProduct: (product) => {
        const state = get()
        const newId = Math.max(...state.products.map((p) => p.id), 0) + 1
        const now = new Date().toISOString()

        // Mapear la categoría a categoryId
        const categoryId = mapCategoryToId(product.category)

        const newProduct: Product = {
          ...product,
          id: newId,
          categoryId: categoryId,
          createdAt: now,
          updatedAt: now,
        }

        set({ products: [...state.products, newProduct] })
        setTimeout(() => get().updateCategories(), 0)
      },

      updateProduct: (id, updatedProduct) => {
        const state = get()
        const now = new Date().toISOString()

        // Si se actualiza la categoría, también actualizar categoryId
        const updates = { ...updatedProduct, updatedAt: now }
        if (updatedProduct.category) {
          updates.categoryId = mapCategoryToId(updatedProduct.category)
        }

        set({
          products: state.products.map((product) => (product.id === id ? { ...product, ...updates } : product)),
        })
        setTimeout(() => get().updateCategories(), 0)
      },

      deleteProduct: (id) => {
        const state = get()
        set({
          products: state.products.filter((product) => product.id !== id),
        })
        setTimeout(() => get().updateCategories(), 0)
      },

      getProductById: (id) => {
        return get().products.find((product) => product.id === id)
      },

      getProductsByCategory: (categoryId) => {
        const state = get()
        return state.products
          .filter((product) => product.condition !== "Descatalogado" && product.stock > 0)
          .filter((product) => product.categoryId === categoryId)
      },

      getProductsByType: (productType) => {
        const state = get()
        return state.products
          .filter((product) => product.condition !== "Descatalogado" && product.stock > 0)
          .filter((product) => product.productType === productType)
      },

      getFeaturedProducts: () => {
        const state = get()
        return state.products
          .filter((product) => product.condition !== "Descatalogado" && product.stock > 0)
          .filter((product) => product.featured)
          .slice(0, 8)
      },

      getActiveProducts: () => {
        return get().products.filter((product) => product.condition !== "Descatalogado" && product.stock > 0)
      },

      updateStock: (id, quantity) => {
        const state = get()
        const now = new Date().toISOString()
        set({
          products: state.products.map((product) =>
            product.id === id ? { ...product, stock: Math.max(0, product.stock - quantity), updatedAt: now } : product,
          ),
        })
        setTimeout(() => get().updateCategories(), 0)
      },

      refreshStore: () => {
        const state = get()
        state.updateCategories()
        // Forzar re-render
        set({ initialized: false })
        setTimeout(() => set({ initialized: true }), 100)
      },
    }),
    {
      name: "product-storage",
    },
  ),
)
