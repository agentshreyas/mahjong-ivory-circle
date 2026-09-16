import h1 from "@/assets/mahjong-heritage-1.jpg";
import h2 from "@/assets/mahjong-heritage-2.jpg";
import h3 from "@/assets/mahjong-heritage-3.jpg";
import a1 from "@/assets/mahjong-atelier-1.jpg";
import a2 from "@/assets/mahjong-atelier-2.jpg";
import a3 from "@/assets/mahjong-atelier-3.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  images: string[];
  description: string;
  details: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    id: "heritage",
    name: "The Heritage Box",
    tagline: "Rosewood · hand-painted ivory tiles",
    price: "₹ 6,80,000",
    images: [h1, h2, h3],
    description:
      "A ceremonial Mahjong set for the drawing room. The case is turned from single-grain Indian rosewood and lined in deep jade velvet. Each of the 144 tiles is cast in resin ivory and hand-painted by the atelier in Jaipur, then finished with the Gaurav Gupta infinity signature in twenty-two carat gold leaf.",
    details: [
      { label: "Tiles", value: "144, resin ivory, hand-painted" },
      { label: "Case", value: "Indian rosewood, jade velvet interior" },
      { label: "Hardware", value: "Solid brass, hand-polished" },
      { label: "Made", value: "To order, Jaipur atelier · 8 weeks" },
      { label: "Edition", value: "Signed and numbered, of 25" },
    ],
  },
  {
    id: "atelier",
    name: "The Atelier Travel Set",
    tagline: "Jade calf leather · gold-etched tiles",
    price: "₹ 2,40,000",
    images: [a1, a2, a3],
    description:
      "A quieter piece, made to travel. Soft jade calf leather over a lightweight aluminium shell, with brass corners and a debossed infinity mark. Inside, translucent resin tiles carry the Gaurav Gupta tile geometry in gold etching — light enough for the plane, considered enough for the table.",
    details: [
      { label: "Tiles", value: "144, translucent resin, gold-etched" },
      { label: "Case", value: "Jade calf leather over aluminium" },
      { label: "Weight", value: "1.9 kg · cabin-friendly" },
      { label: "Made", value: "To order, Florence · 6 weeks" },
      { label: "Edition", value: "Open edition for the Circle" },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
