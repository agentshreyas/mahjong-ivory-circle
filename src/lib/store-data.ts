export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  pack: string;
  price: number;
  mrp: number;
  rating: number;
  ratingCount: string;
  image: string;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=600&h=600&q=70`;

export const categories = [
  { id: "fruits-veg", name: "Fruits & Veg", icon: "leaf" },
  { id: "dairy-bakery", name: "Dairy & Bakery", icon: "milk" },
  { id: "staples", name: "Atta, Rice & Dal", icon: "wheat" },
  { id: "snacks", name: "Snacks", icon: "cookie" },
  { id: "beverages", name: "Beverages", icon: "cup" },
  { id: "home-care", name: "Home Care", icon: "spray" },
  { id: "personal-care", name: "Personal Care", icon: "sparkles" },
  { id: "baby", name: "Baby Care", icon: "baby" },
] as const;

export const brands = [
  { id: "amul", name: "Amul" },
  { id: "tata", name: "Tata" },
  { id: "nestle", name: "Nestlé" },
  { id: "britannia", name: "Britannia" },
  { id: "fortune", name: "Fortune" },
  { id: "dabur", name: "Dabur" },
  { id: "surf", name: "Surf Excel" },
  { id: "himalaya", name: "Himalaya" },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Farm Fresh Spinach",
    brand: "Tata",
    category: "fruits-veg",
    pack: "250 g bunch",
    price: 29,
    mrp: 40,
    rating: 4.5,
    ratingCount: "2.1k",
    image: img("photo-1576045057995-568f588f82fb"),
  },
  {
    id: "p2",
    name: "Hybrid Tomato",
    brand: "Tata",
    category: "fruits-veg",
    pack: "1 kg",
    price: 34,
    mrp: 48,
    rating: 4.3,
    ratingCount: "8.4k",
    image: img("photo-1592924357228-91a4daadcfea"),
  },
  {
    id: "p3",
    name: "Taaza Toned Milk",
    brand: "Amul",
    category: "dairy-bakery",
    pack: "500 ml pouch",
    price: 27,
    mrp: 28,
    rating: 4.7,
    ratingCount: "34k",
    image: img("photo-1550583724-b2692b85b150"),
  },
  {
    id: "p4",
    name: "Whole Wheat Bread",
    brand: "Britannia",
    category: "dairy-bakery",
    pack: "400 g",
    price: 45,
    mrp: 55,
    rating: 4.2,
    ratingCount: "5.6k",
    image: img("photo-1509440159596-0249088772ff"),
  },
  {
    id: "p5",
    name: "Amul Butter",
    brand: "Amul",
    category: "dairy-bakery",
    pack: "500 g",
    price: 265,
    mrp: 285,
    rating: 4.8,
    ratingCount: "51k",
    image: img("photo-1589985270826-4b7bb135bc9d"),
  },
  {
    id: "p6",
    name: "Sona Masoori Rice",
    brand: "Fortune",
    category: "staples",
    pack: "5 kg",
    price: 399,
    mrp: 520,
    rating: 4.4,
    ratingCount: "12k",
    image: img("photo-1586201375761-83865001e31c"),
  },
  {
    id: "p7",
    name: "Toor Dal Premium",
    brand: "Tata",
    category: "staples",
    pack: "1 kg",
    price: 172,
    mrp: 210,
    rating: 4.5,
    ratingCount: "9.8k",
    image: img("photo-1596797038530-2c107229654b"),
  },
  {
    id: "p8",
    name: "Sunflower Oil",
    brand: "Fortune",
    category: "staples",
    pack: "1 L bottle",
    price: 139,
    mrp: 175,
    rating: 4.3,
    ratingCount: "22k",
    image: img("photo-1474979266404-7eaacbcd87c5"),
  },
  {
    id: "p9",
    name: "Good Day Cashew",
    brand: "Britannia",
    category: "snacks",
    pack: "200 g",
    price: 55,
    mrp: 65,
    rating: 4.6,
    ratingCount: "18k",
    image: img("photo-1558961363-fa8fdf82db35"),
  },
  {
    id: "p10",
    name: "KitKat Multipack",
    brand: "Nestlé",
    category: "snacks",
    pack: "4 x 27 g",
    price: 80,
    mrp: 100,
    rating: 4.7,
    ratingCount: "29k",
    image: img("photo-1511381939415-e44015466834"),
  },
  {
    id: "p11",
    name: "Tata Tea Gold",
    brand: "Tata",
    category: "beverages",
    pack: "500 g",
    price: 285,
    mrp: 340,
    rating: 4.6,
    ratingCount: "41k",
    image: img("photo-1597481499750-3e6b22637e12"),
  },
  {
    id: "p12",
    name: "Nescafé Classic",
    brand: "Nestlé",
    category: "beverages",
    pack: "100 g jar",
    price: 340,
    mrp: 415,
    rating: 4.5,
    ratingCount: "16k",
    image: img("photo-1559056199-641a0ac8b55e"),
  },
  {
    id: "p13",
    name: "Surf Excel Easy Wash",
    brand: "Surf Excel",
    category: "home-care",
    pack: "1 kg",
    price: 118,
    mrp: 145,
    rating: 4.4,
    ratingCount: "27k",
    image: img("photo-1610557892470-55d9e80c0bce"),
  },
  {
    id: "p14",
    name: "Neem Face Wash",
    brand: "Himalaya",
    category: "personal-care",
    pack: "150 ml",
    price: 165,
    mrp: 190,
    rating: 4.5,
    ratingCount: "33k",
    image: img("photo-1620916566398-39f1143ab7be"),
  },
  {
    id: "p15",
    name: "Dabur Honey",
    brand: "Dabur",
    category: "personal-care",
    pack: "500 g",
    price: 245,
    mrp: 290,
    rating: 4.6,
    ratingCount: "14k",
    image: img("photo-1587049352846-4a222e784d38"),
  },
  {
    id: "p16",
    name: "Baby Gentle Wash",
    brand: "Himalaya",
    category: "baby",
    pack: "400 ml",
    price: 299,
    mrp: 355,
    rating: 4.7,
    ratingCount: "7.2k",
    image: img("photo-1600857544200-b2f666a9a2ec"),
  },
];

export const discountOf = (p: Product) => Math.round(((p.mrp - p.price) / p.mrp) * 100);

export const byId = (id: string) => products.find((p) => p.id === id);

export const trending = products.filter((p) =>
  ["p3", "p5", "p10", "p6", "p11", "p13"].includes(p.id),
);

export const previouslyOrdered = products.filter((p) =>
  ["p3", "p4", "p9", "p8"].includes(p.id),
);
