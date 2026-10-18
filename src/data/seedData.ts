import { Product, Order, AdminUser, StoreSettings } from '../types';

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: "JYOTI INFOMEDIA",
  tagline: "Your Premier Hub for Apple, Samsung, Vivo & Modern Computing in Kishanganj",
  addressLine: "Mahavir Marg, Main Road",
  marketArea: "Kochadhaman",
  city: "Kochadhaman, Kishanganj",
  district: "Kishanganj",
  state: "Bihar",
  pincode: "855115",
  phonePrimary: "+91 94312 88421",
  phoneSecondary: "+91 82921 54790",
  whatsappNumber: "+919431288421",
  email: "contact@jyotiinfomedia.com",
  operatingHoursWeekday: "Mon - Sat: 9:00 AM - 8:30 PM",
  operatingHoursSunday: "Sunday: 10:00 AM - 4:30 PM",
  gstin: "10AAACJ4892Q1ZT",
  announcementText: "✨ Special Dhanteras & Festive Offers Live at JYOTI INFOMEDIA Kochadhaman! 0% EMI on Apple, Samsung & Vivo with Instant Store Exchange Bonus.",
  freeDeliveryThreshold: 2000,
};

export const INITIAL_PRODUCTS: Product[] = [
  // --- APPLE ---
  {
    id: "prod-apple-1",
    name: "Apple iPhone 16 Pro Max (256GB - Desert Titanium)",
    brand: "Apple",
    category: "Smartphones",
    price: 144900,
    originalPrice: 154900,
    discountPercent: 6,
    stock: 7,
    inStock: true,
    rating: 4.9,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    description: "The pinnacle of iPhone performance with A18 Pro chip, Grade 5 Titanium design, Camera Control button, and 48MP Fusion camera system with 5x telephoto optical zoom.",
    specs: {
      "Display": "6.9-inch Super Retina XDR OLED 120Hz ProMotion",
      "Processor": "A18 Pro Bionic with 6-core GPU",
      "Camera": "48MP Main + 48MP Ultra-Wide + 12MP 5x Telephoto",
      "Storage": "256GB NVMe",
      "Battery": "Up to 33 hours video playback",
      "Security": "Face ID with Ceramic Shield front"
    },
    featured: true,
    isNew: true,
    warranty: "1 Year Official Apple India Warranty + GST Bill",
    sku: "APL-IP16PM-256-DT",
    createdAt: "2026-09-20T10:00:00Z"
  },
  {
    id: "prod-apple-2",
    name: "Apple iPhone 16 (128GB - Ultramarine Blue)",
    brand: "Apple",
    category: "Smartphones",
    price: 79900,
    originalPrice: 84900,
    discountPercent: 6,
    stock: 12,
    inStock: true,
    rating: 4.8,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    description: "Packed with Apple Intelligence, the powerful A18 chip, Camera Control, 48MP 2-in-1 camera fusion, and Aerospace-grade aluminum finish.",
    specs: {
      "Display": "6.1-inch Super Retina XDR Display",
      "Processor": "Apple A18 Bionic Chip",
      "Camera": "48MP Fusion + 12MP Ultra-Wide Macro",
      "Storage": "128GB",
      "Weight": "170 grams",
      "Connectivity": "5G, Wi-Fi 7, USB-C"
    },
    featured: true,
    isNew: true,
    warranty: "1 Year Official Apple Warranty",
    sku: "APL-IP16-128-BLU",
    createdAt: "2026-09-22T11:00:00Z"
  },
  {
    id: "prod-apple-3",
    name: "Apple MacBook Air 13\" M3 Chip (16GB RAM / 512GB SSD - Midnight)",
    brand: "Apple",
    category: "Laptops",
    price: 124900,
    originalPrice: 134900,
    discountPercent: 7,
    stock: 5,
    inStock: true,
    rating: 4.9,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "Strikingly thin and fast. The M3 chip brings incredible performance and up to 18 hours of battery life to the world's most popular laptop.",
    specs: {
      "Processor": "Apple M3 Chip (8-Core CPU, 10-Core GPU)",
      "RAM": "16GB Unified Memory",
      "Storage": "512GB Fast SSD",
      "Display": "13.6-inch Liquid Retina with True Tone",
      "Audio": "Four-speaker sound system with Spatial Audio",
      "Battery": "Up to 18 Hours"
    },
    featured: true,
    isNew: false,
    warranty: "1 Year International Apple Care with GST Invoice",
    sku: "APL-MBA-M3-16-512",
    createdAt: "2026-08-15T09:30:00Z"
  },
  {
    id: "prod-apple-4",
    name: "Apple AirPods Pro 2 (USB-C MagSafe Case)",
    brand: "Apple",
    category: "Audio & Wearables",
    price: 21990,
    originalPrice: 24900,
    discountPercent: 12,
    stock: 18,
    inStock: true,
    rating: 4.8,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
    description: "Featuring pro-level Active Noise Cancellation, Adaptive Audio, Transparency mode, and Personalized Spatial Audio with dynamic head tracking.",
    specs: {
      "Chip": "Apple H2 Headphone Chip",
      "Battery": "Up to 6 hours listening with ANC (30 hours with case)",
      "Resistance": "IP54 Dust, sweat, and water resistant",
      "Charging": "USB-C, MagSafe, Apple Watch charger"
    },
    featured: false,
    warranty: "1 Year Official Apple India Warranty",
    sku: "APL-APP2-USBC",
    createdAt: "2026-07-10T14:00:00Z"
  },

  // --- SAMSUNG ---
  {
    id: "prod-samsung-1",
    name: "Samsung Galaxy S24 Ultra 5G (12GB RAM / 512GB - Titanium Gray)",
    brand: "Samsung",
    category: "Smartphones",
    price: 129999,
    originalPrice: 139999,
    discountPercent: 7,
    stock: 8,
    inStock: true,
    rating: 4.9,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    description: "Galaxy AI powerhouse with titanium exterior, embedded S Pen, 200MP Quad Tele System with ProVisual Engine, and Corning Gorilla Armor anti-glare display.",
    specs: {
      "Display": "6.8\" Dynamic AMOLED 2X QHD+ 120Hz 2600 nits",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP + 50MP (5x) + 10MP (3x) + 12MP Ultra-Wide",
      "RAM & Storage": "12GB LPDDR5X + 512GB UFS 4.0",
      "Battery": "5000mAh with 45W Fast Charging",
      "Stylus": "Built-in S-Pen with Air Actions"
    },
    featured: true,
    isNew: false,
    warranty: "1 Year Brand Warranty + 6 Months Screen Protection",
    sku: "SAM-S24U-12-512-GRY",
    createdAt: "2026-08-01T12:00:00Z"
  },
  {
    id: "prod-samsung-2",
    name: "Samsung Galaxy Z Flip 6 5G (8GB RAM / 256GB - Silver Shadow)",
    brand: "Samsung",
    category: "Smartphones",
    price: 99999,
    originalPrice: 109999,
    discountPercent: 9,
    stock: 6,
    inStock: true,
    rating: 4.7,
    reviewsCount: 39,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    description: "Compact clamshell folding phone with 50MP pro camera, FlexCam with Auto Zoom, enhanced Armor Aluminum hinge, and vapor chamber cooling.",
    specs: {
      "Main Screen": "6.7\" FHD+ Dynamic AMOLED 2X 120Hz",
      "Cover Screen": "3.4\" Super AMOLED 60Hz FlexWindow",
      "Processor": "Snapdragon 8 Gen 3 Mobile Platform",
      "Camera": "50MP Dual Pixel Wide + 12MP Ultra-Wide",
      "Battery": "4000mAh Dual Battery"
    },
    featured: true,
    isNew: true,
    warranty: "1 Year Samsung India Warranty with 1 Free Screen Replacement",
    sku: "SAM-ZFLIP6-8-256",
    createdAt: "2026-08-18T16:20:00Z"
  },
  {
    id: "prod-samsung-3",
    name: "Samsung Galaxy A55 5G (8GB RAM / 128GB - Awesome Navy)",
    brand: "Samsung",
    category: "Smartphones",
    price: 36999,
    originalPrice: 42999,
    discountPercent: 14,
    stock: 22,
    inStock: true,
    rating: 4.6,
    reviewsCount: 112,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    description: "Best-selling premium mid-ranger featuring metal frame, Corning Gorilla Glass Victus+, 50MP OIS camera, and IP67 water/dust resistance.",
    specs: {
      "Display": "6.6\" FHD+ Super AMOLED 120Hz Vision Booster",
      "Processor": "Exynos 1480 (4nm) with AMD Xclipse GPU",
      "Camera": "50MP Main OIS + 12MP Ultra-wide + 5MP Macro",
      "Battery": "5000mAh, 25W Fast Charge",
      "Durability": "IP67 Rating & Knox Vault Security"
    },
    featured: false,
    warranty: "1 Year Samsung Official Warranty with GST Invoice",
    sku: "SAM-A55-8-128",
    createdAt: "2026-06-15T11:45:00Z"
  },
  {
    id: "prod-samsung-4",
    name: "Samsung 55\" Crystal 4K Vivid Pro Ultra HD Smart TV",
    brand: "Samsung",
    category: "Smart TVs",
    price: 43990,
    originalPrice: 64900,
    discountPercent: 32,
    stock: 4,
    inStock: true,
    rating: 4.7,
    reviewsCount: 48,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    description: "Breathtaking 4K resolution with Crystal Processor 4K, PurColor, HDR10+, Q-Symphony sound, and Tizen OS with all streaming apps.",
    specs: {
      "Display Size": "55 Inch (138 cm) Ultra HD 4K (3840 x 2160)",
      "Audio": "20W Output, OTS Lite, Adaptive Sound",
      "Operating System": "Samsung Tizen OS",
      "Ports": "3 HDMI, 1 USB, Optical Audio, LAN, Bluetooth 5.2"
    },
    featured: true,
    warranty: "2 Years Comprehensive Samsung Warranty (Free Kishanganj Installation)",
    sku: "SAM-TV55-CRYSTAL",
    createdAt: "2026-07-28T13:10:00Z"
  },

  // --- VIVO ---
  {
    id: "prod-vivo-1",
    name: "Vivo X100 Pro 5G ZEISS Optics (16GB RAM / 512GB - Asteroid Black)",
    brand: "Vivo",
    category: "Smartphones",
    price: 89999,
    originalPrice: 96999,
    discountPercent: 7,
    stock: 9,
    inStock: true,
    rating: 4.9,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    description: "The photography master with ZEISS 1-inch Main Camera, ZEISS APO Floating Telephoto, Dimensity 9300 chipset, and Vivo V3 imaging chip.",
    specs: {
      "Camera": "50MP 1-inch Sony IMX989 + 50MP ZEISS APO Telephoto + 50MP Ultra-wide",
      "Processor": "MediaTek Dimensity 9300 (4nm Flagship)",
      "Display": "6.78\" 1.5K LTPO AMOLED 120Hz 3000 nits peak",
      "Battery": "5400mAh with 100W FlashCharge + 50W Wireless",
      "Coating": "ZEISS T* Lens Coating"
    },
    featured: true,
    isNew: true,
    warranty: "1 Year Official Vivo India Brand Warranty",
    sku: "VVO-X100P-16-512",
    createdAt: "2026-09-01T08:00:00Z"
  },
  {
    id: "prod-vivo-2",
    name: "Vivo V40 Pro 5G ZEISS Portrait (12GB RAM / 512GB - Ganges Blue)",
    brand: "Vivo",
    category: "Smartphones",
    price: 55999,
    originalPrice: 60999,
    discountPercent: 8,
    stock: 14,
    inStock: true,
    rating: 4.8,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80",
    description: "Studio-quality portraits anywhere with 50MP ZEISS Multifocal Portrait, 5500mAh ultra-slim battery, IP68 water resistance, and Dimensity 9200+.",
    specs: {
      "Display": "6.78\" 1.5K 3D Curved AMOLED 120Hz 4500 nits",
      "Processor": "MediaTek Dimensity 9200+ (4nm)",
      "Rear Camera": "50MP ZEISS OIS + 50MP ZEISS Telephoto + 50MP Wide",
      "Front Camera": "50MP ZEISS Group Selfie Camera with Autofocus",
      "Battery": "5500mAh BlueVolt Battery with 80W FlashCharge"
    },
    featured: true,
    isNew: true,
    warranty: "1 Year Vivo India Warranty + Instant Store Service at Kochadhaman",
    sku: "VVO-V40P-12-512",
    createdAt: "2026-09-12T10:15:00Z"
  },
  {
    id: "prod-vivo-3",
    name: "Vivo T3 Ultra 5G (8GB RAM / 256GB - Lunar Gray)",
    brand: "Vivo",
    category: "Smartphones",
    price: 31999,
    originalPrice: 35999,
    discountPercent: 11,
    stock: 19,
    inStock: true,
    rating: 4.7,
    reviewsCount: 72,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=800&q=80",
    description: "Flagship speed segment leader powered by Dimensity 9200+, Sony IMX921 sensor with OIS, 5500mAh battery, and curved display.",
    specs: {
      "Display": "6.77\" 1.5K 3D Curved AMOLED 120Hz",
      "Processor": "MediaTek Dimensity 9200+ (AnTuTu 1.6M+)",
      "Camera": "50MP Sony IMX921 OIS + 8MP Ultra-wide, 50MP Selfie",
      "Battery": "5500mAh with 80W Fast Charging",
      "Protection": "IP68 Dust and Water Resistant"
    },
    featured: false,
    warranty: "1 Year Manufacturer Warranty with Free Screen Guard applied in store",
    sku: "VVO-T3U-8-256",
    createdAt: "2026-09-18T13:40:00Z"
  },
  {
    id: "prod-vivo-4",
    name: "Vivo Y200e 5G (8GB RAM / 128GB - Saffron Delight Eco-Fiber Leather)",
    brand: "Vivo",
    category: "Smartphones",
    price: 19999,
    originalPrice: 23999,
    discountPercent: 16,
    stock: 25,
    inStock: true,
    rating: 4.5,
    reviewsCount: 93,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    description: "Eye-catching EcoFiber leather finish with Anti-Stain coating, 120Hz AMOLED display, dual stereo speakers with 300% audio booster.",
    specs: {
      "Display": "6.67\" FHD+ 120Hz Ultra Vision AMOLED",
      "Processor": "Snapdragon 4 Gen 2 (4nm)",
      "Camera": "50MP HD Main + 2MP Bokeh + Flicker Sensor",
      "Battery": "5000mAh with 44W FlashCharge"
    },
    featured: false,
    warranty: "1 Year Brand Warranty with GST Bill",
    sku: "VVO-Y200E-8-128",
    createdAt: "2026-07-22T09:10:00Z"
  },

  // --- LAPTOPS & ACCESSORIES ---
  {
    id: "prod-hp-1",
    name: "HP Pavilion 15 (13th Gen Intel Core i7 / 16GB / 1TB SSD / Iris Xe)",
    brand: "HP",
    category: "Laptops",
    price: 74990,
    originalPrice: 84990,
    discountPercent: 11,
    stock: 8,
    inStock: true,
    rating: 4.6,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    description: "Power through intensive workflows and multitasking with 13th Gen Intel Core i7 processor, B&O premium sound, and backlit keyboard.",
    specs: {
      "Processor": "13th Gen Intel Core i7-1355U (up to 5.0 GHz)",
      "RAM": "16GB DDR4 (Expandable)",
      "Storage": "1TB PCIe NVMe M.2 SSD",
      "Display": "15.6\" FHD Micro-edge Anti-glare",
      "OS": "Windows 11 Home + MS Office Home & Student 2021"
    },
    featured: true,
    warranty: "1 Year Onsite HP Warranty across Kishanganj District",
    sku: "HP-PAV15-I7-16-1T",
    createdAt: "2026-08-04T15:20:00Z"
  },
  {
    id: "prod-sony-1",
    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
    brand: "Sony",
    category: "Audio & Wearables",
    price: 28990,
    originalPrice: 34990,
    discountPercent: 17,
    stock: 11,
    inStock: true,
    rating: 4.9,
    reviewsCount: 115,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Industry-leading noise cancellation powered by two processors and 8 microphones. Exceptional Hi-Res sound quality and 30-hour battery life.",
    specs: {
      "Noise Cancellation": "Auto NC Optimizer with Integrated Processor V1 + QN1",
      "Battery": "30 Hours with ANC, 3-min quick charge gives 3 hours",
      "Microphones": "4 beamforming mics with AI noise reduction",
      "Weight": "250g ultra-comfortable lightweight design"
    },
    featured: false,
    warranty: "1 Year Sony India Warranty",
    sku: "SNY-WH1000XM5-BLK",
    createdAt: "2026-06-29T10:00:00Z"
  },
  {
    id: "prod-acc-1",
    name: "Apple 20W USB-C Power Adapter (Original)",
    brand: "Apple",
    category: "Accessories",
    price: 1899,
    originalPrice: 1900,
    discountPercent: 0,
    stock: 45,
    inStock: true,
    rating: 4.8,
    reviewsCount: 190,
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80",
    description: "Genuine Apple 20W Power Adapter for fast, efficient charging at home, in the office, or on the go. Compatible with all USB-C devices.",
    specs: {
      "Output": "20 Watts Fast Charge",
      "Port": "USB-C",
      "Compatibility": "iPhone 16/15/14/13/12, iPad, AirPods"
    },
    featured: false,
    warranty: "6 Months Official Apple Warranty with GST Bill",
    sku: "APL-CHRG-20W",
    createdAt: "2026-05-10T11:00:00Z"
  },
  {
    id: "prod-acc-2",
    name: "Samsung 45W Power Adapter with USB-C to USB-C Cable",
    brand: "Samsung",
    category: "Accessories",
    price: 3499,
    originalPrice: 3999,
    discountPercent: 12,
    stock: 30,
    inStock: true,
    rating: 4.7,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
    description: "Super Fast Charging 2.0 (45W) original adapter for Galaxy S24 Ultra, S23 Ultra, Galaxy Book, and Tab S9.",
    specs: {
      "Output": "45W Super Fast Charging 2.0 (PD 3.0 PPS)",
      "Cable Included": "5A 1.8m Type-C to Type-C Cable"
    },
    featured: false,
    warranty: "6 Months Official Samsung Warranty",
    sku: "SAM-CHRG-45W",
    createdAt: "2026-06-02T13:00:00Z"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "JYOTI-2026-9041",
    date: "2026-10-17T18:25:00Z",
    customer: {
      name: "Md. Tariq Anwar",
      email: "tariq.anwar@gmail.com",
      phone: "+91 98350 14820",
      address: "Near Jama Masjid, Kochadhaman Bazar",
      landmark: "Opposite SBI CSP Counter",
      city: "Kochadhaman",
      district: "Kishanganj",
      state: "Bihar",
      pinCode: "855115",
      deliveryType: "store_pickup"
    },
    items: [
      {
        productId: "prod-vivo-2",
        productName: "Vivo V40 Pro 5G ZEISS Portrait (12GB RAM / 512GB - Ganges Blue)",
        brand: "Vivo",
        price: 55999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 55999,
    gstAmount: 10079.82,
    deliveryFee: 0,
    total: 55999,
    paymentMethod: "upi",
    paymentStatus: "Paid",
    orderStatus: "Ready for Pickup" as any,
    notes: "Customer will collect in person at Mahavir Marg store tomorrow morning.",
    history: [
      { timestamp: "2026-10-17T18:25:00Z", status: "Pending", note: "Order placed online by customer." },
      { timestamp: "2026-10-17T18:30:00Z", status: "Confirmed", note: "Payment verified via UPI (UTR: 428910248)." },
      { timestamp: "2026-10-17T19:00:00Z", status: "Preparing", note: "Handset packed with warranty card & tamper-evident seal." }
    ]
  },
  {
    id: "JYOTI-2026-9039",
    date: "2026-10-16T14:10:00Z",
    customer: {
      name: "Suman Kumar Besra",
      email: "suman.besra@outlook.com",
      phone: "+91 87892 41109",
      address: "Line Mohalla, Ward No. 7, Kishanganj City",
      landmark: "Near Railway Colony Main Gate",
      city: "Kishanganj",
      district: "Kishanganj",
      state: "Bihar",
      pinCode: "855107",
      deliveryType: "home_delivery"
    },
    items: [
      {
        productId: "prod-apple-1",
        productName: "Apple iPhone 16 Pro Max (256GB - Desert Titanium)",
        brand: "Apple",
        price: 144900,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80"
      },
      {
        productId: "prod-acc-1",
        productName: "Apple 20W USB-C Power Adapter (Original)",
        brand: "Apple",
        price: 1899,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 146799,
    gstAmount: 26423.82,
    deliveryFee: 0,
    total: 146799,
    paymentMethod: "card",
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
    notes: "Urgent dispatch requested. Store rider assigned.",
    history: [
      { timestamp: "2026-10-16T14:10:00Z", status: "Pending", note: "Order placed." },
      { timestamp: "2026-10-16T14:15:00Z", status: "Confirmed", note: "Card transaction approved." },
      { timestamp: "2026-10-16T16:00:00Z", status: "Preparing", note: "Device activated for warranty verification." },
      { timestamp: "2026-10-17T11:00:00Z", status: "Out for Delivery", note: "Dispatched with delivery rider Manoj." }
    ]
  },
  {
    id: "JYOTI-2026-9025",
    date: "2026-10-15T11:40:00Z",
    customer: {
      name: "Ramesh Prasad Singh",
      email: "ramesh.singh88@gmail.com",
      phone: "+91 94318 62019",
      address: "Chhatargachh Main Market, Near High School",
      city: "Kochadhaman",
      district: "Kishanganj",
      state: "Bihar",
      pinCode: "855115",
      deliveryType: "home_delivery"
    },
    items: [
      {
        productId: "prod-samsung-1",
        productName: "Samsung Galaxy S24 Ultra 5G (12GB RAM / 512GB - Titanium Gray)",
        brand: "Samsung",
        price: 129999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 129999,
    gstAmount: 23399.82,
    deliveryFee: 0,
    total: 129999,
    paymentMethod: "cod",
    paymentStatus: "COD",
    orderStatus: "Delivered",
    notes: "Delivered with printed GST Invoice and verified customer signature.",
    history: [
      { timestamp: "2026-10-15T11:40:00Z", status: "Pending", note: "Order placed with Cash on Delivery." },
      { timestamp: "2026-10-15T12:00:00Z", status: "Confirmed", note: "Phone verification completed with customer." },
      { timestamp: "2026-10-15T14:30:00Z", status: "Out for Delivery", note: "Dispatched via store express." },
      { timestamp: "2026-10-15T17:15:00Z", status: "Delivered", note: "Delivered successfully. Cash received ₹1,29,999." }
    ]
  },
  {
    id: "JYOTI-2026-9012",
    date: "2026-10-14T09:15:00Z",
    customer: {
      name: "Pooja Kumari",
      email: "pooja.kishanganj@gmail.com",
      phone: "+91 70041 98234",
      address: "Hospital Road, Bahadurganj",
      city: "Bahadurganj",
      district: "Kishanganj",
      state: "Bihar",
      pinCode: "855101",
      deliveryType: "home_delivery"
    },
    items: [
      {
        productId: "prod-vivo-4",
        productName: "Vivo Y200e 5G (8GB RAM / 128GB - Saffron Delight)",
        brand: "Vivo",
        price: 19999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
      }
    ],
    subtotal: 19999,
    gstAmount: 3599.82,
    deliveryFee: 0,
    total: 19999,
    paymentMethod: "upi",
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    history: [
      { timestamp: "2026-10-14T09:15:00Z", status: "Pending", note: "Order placed via UPI." },
      { timestamp: "2026-10-14T10:00:00Z", status: "Confirmed", note: "Payment settled." },
      { timestamp: "2026-10-14T12:00:00Z", status: "Preparing", note: "Quality checked." },
      { timestamp: "2026-10-14T15:00:00Z", status: "Delivered", note: "Delivered to customer." }
    ]
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: "admin-1",
    name: "Jyoti Ranjan",
    email: "admin@jyotiinfomedia.com",
    role: "super_admin",
    phone: "+91 94312 88421",
    status: "active",
    lastLogin: "2026-10-17T22:45:00Z",
    createdAt: "2024-01-10T00:00:00Z",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "admin-2",
    name: "Amit Sharma",
    email: "manager@jyotiinfomedia.com",
    role: "store_manager",
    phone: "+91 82921 54790",
    status: "active",
    lastLogin: "2026-10-17T19:30:00Z",
    createdAt: "2024-03-15T00:00:00Z",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "admin-3",
    name: "Naveen Alam",
    email: "inventory@jyotiinfomedia.com",
    role: "inventory_staff",
    phone: "+91 97712 39912",
    status: "active",
    lastLogin: "2026-10-16T17:10:00Z",
    createdAt: "2024-06-01T00:00:00Z",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

// Master Admin passkey required during registration to prevent unauthorized signups
export const DEFAULT_ADMIN_PASSKEY = "JYOTI@ADMIN2026";
