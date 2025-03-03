
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  new?: boolean;
  rating?: number;
  colors?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation and 24-hour battery life.",
    price: 299,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Audio",
    featured: true,
    new: true,
    rating: 4.8,
    colors: ["#1F2937", "#FFFFFF", "#FEF3C7"]
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    description: "Stay connected with the latest smart watch. Track your fitness, receive notifications, and more with a sleek design.",
    price: 349,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Wearables",
    featured: true,
    rating: 4.6,
    colors: ["#1F2937", "#FFFFFF", "#FB7185"]
  },
  {
    id: 3,
    name: "Ultralight Laptop Pro",
    description: "The thinnest, lightest laptop we've ever made. Featuring all-day battery life and stunning display.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Computers",
    featured: true,
    rating: 4.9,
    colors: ["#1F2937", "#F9FAFB"]
  },
  {
    id: 4,
    name: "Wireless Charging Pad",
    description: "Elegantly designed wireless charging pad compatible with all Qi-enabled devices.",
    price: 59,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Accessories",
    new: true,
    rating: 4.5,
    colors: ["#1F2937", "#FFFFFF"]
  },
  {
    id: 5,
    name: "Smart Home Speaker",
    description: "Voice-controlled smart speaker with premium sound quality and intelligent assistant.",
    price: 199,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Audio",
    rating: 4.7,
    colors: ["#1F2937", "#F9FAFB", "#FECACA"]
  },
  {
    id: 6,
    name: "Ergonomic Mouse",
    description: "Precision tracking with ergonomic design for all-day comfort.",
    price: 79,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Accessories",
    rating: 4.4,
    colors: ["#1F2937", "#FFFFFF"]
  },
  {
    id: 7,
    name: "Digital Camera 4K",
    description: "Capture stunning photos and videos with our advanced 4K digital camera.",
    price: 799,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Photography",
    featured: true,
    rating: 4.8,
    colors: ["#1F2937"]
  },
  {
    id: 8,
    name: "Portable Power Bank",
    description: "High-capacity power bank to keep your devices charged on the go.",
    price: 49,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Accessories",
    new: true,
    rating: 4.3,
    colors: ["#1F2937", "#FFFFFF", "#FEF3C7"]
  }
];

export const categories = [
  "All",
  "Audio",
  "Wearables",
  "Computers",
  "Accessories",
  "Photography"
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};
