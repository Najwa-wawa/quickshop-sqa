// Mock initial data for QuickShop SQA Project
window.INITIAL_DATA = {
  users: [
    {
      id: "usr-001",
      name: "Budi Santoso",
      email: "customer@quickshop.id",
      phone: "081234567890",
      password: "Password123!", // Memenuhi validasi: >= 8 karakter, ada huruf kapital, angka, simbol
      address: "Jl. Bendungan Sutami No. 12, Malang",
      role: "Customer"
    }
  ],
  products: [
    {
      id: 1,
      name: "Wireless ANC Headphones Pro",
      category: "Electronics",
      price: 850000,
      stock: 25,
      rating: 4.8,
      reviewsCount: 42,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      description: "Headphone wireless dengan Active Noise Cancelling premium, daya tahan baterai 40 jam."
    },
    {
      id: 2,
      name: "Mechanical Keyboard RGB Tenkeyless",
      category: "Electronics",
      price: 650000,
      stock: 18,
      rating: 4.6,
      reviewsCount: 31,
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
      description: "Keyboard mekanikal switch tactile blue/red dengan backlit RGB dinamis dan kabel braided."
    },
    {
      id: 3,
      name: "Smart Watch Sport Waterproof",
      category: "Wearables",
      price: 499000,
      stock: 30,
      rating: 4.5,
      reviewsCount: 28,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      description: "Jam tangan pintar dengan sensor detak jantung, SpO2, pelacak tidur, dan tahan air IP68."
    },
    {
      id: 4,
      name: "Ergonomic Office Chair Mesh",
      category: "Furniture",
      price: 1250000,
      stock: 10,
      rating: 4.9,
      reviewsCount: 15,
      image: "https://images.unsplash.com/photo-1580481077195-c3f820c78a05?w=500&q=80",
      description: "Kursi kerja ergonomis dengan sandaran mesh breathable dan lumbal support fleksibel."
    },
    {
      id: 5,
      name: "Stainless Steel Thermal Tumbler 750ml",
      category: "Lifestyle",
      price: 185000,
      stock: 50,
      rating: 4.7,
      reviewsCount: 55,
      image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&q=80",
      description: "Tumbler isolasi vakum dinding ganda, menjaga minuman panas 12 jam atau dingin 24 jam."
    },
    {
      id: 6,
      name: "Canvas Minimalist Laptop Backpack 20L",
      category: "Lifestyle",
      price: 320000,
      stock: 40,
      rating: 4.4,
      reviewsCount: 19,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
      description: "Tas ransel kasual tahan percikan air muat laptop hingga 15.6 inch dengan kompartemen rapi."
    }
  ],
  vouchers: [
    {
      code: "DISKON10",
      type: "percentage",
      value: 10,
      minOrder: 100000,
      maxDiscount: 50000,
      description: "Diskon 10% min. belanja Rp 100.000 (Maks Rp 50.000)"
    },
    {
      code: "HEMAT50K",
      type: "fixed",
      value: 50000,
      minOrder: 300000,
      maxDiscount: 50000,
      description: "Potongan Rp 50.000 min. belanja Rp 300.000"
    },
    {
      code: "GRATISONGKIR",
      type: "shipping",
      value: 20000,
      minOrder: 150000,
      maxDiscount: 20000,
      description: "Potongan ongkir s.d Rp 20.000 min. belanja Rp 150.000"
    }
  ],
  orders: [
    {
      orderId: "QS-20260901-001",
      date: "2026-09-20 14:30",
      userId: "usr-001",
      customerName: "Budi Santoso",
      items: [
        { id: 1, name: "Wireless ANC Headphones Pro", price: 850000, qty: 1 }
      ],
      subtotal: 850000,
      discount: 50000,
      shippingCost: 15000,
      totalPayment: 815000,
      shippingAddress: "Jl. Bendungan Sutami No. 12, Malang",
      paymentMethod: "Bank Transfer (BCA)",
      status: "Completed",
      canCancel: false
    }
  ]
};
