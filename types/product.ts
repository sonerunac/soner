export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: string
  tags: string[]
  inStock: boolean
  stock: number
  rating: number
  reviews: number
  features: string[]
  specifications?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customerInfo: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
  }
  paymentInfo: {
    method: string
    status: 'pending' | 'completed' | 'failed'
    transactionId?: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface CheckoutForm {
  customerInfo: {
    name: string
    email: string
    phone: string
    address: {
      street: string
      city: string
      postalCode: string
      country: string
    }
  }
  paymentMethod: 'card' | 'bank' | 'cash'
}