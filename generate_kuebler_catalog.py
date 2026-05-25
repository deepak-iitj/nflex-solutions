content = """export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  badge?: string;
  price?: string;
  imageUrl?: string;
  specs: Record<string, string>;
  features: string[];
  datasheetUrl?: string;
}

export const brands = ["KUEBLER"] as const;
export type Brand = (typeof brands)[number];

import { brandLogoUrls } from "./brandLogos";
export const brandThumbnails: Record<string, string> = brandLogoUrls;
export const defaultProductPlaceholder = "/placeholder.svg";

export function getProductDisplayImage(product: Product): string | undefined {
  return product.imageUrl ?? brandThumbnails[product.brand];
}

export const categories = [
  "All", 
  "Incremental Encoders", 
  "Absolute Encoders", 
  "Linear Measurement", 
  "Slip Rings", 
  "Inclinometers", 
  "Displays & Counters", 
  "Functional Safety"
] as const;

const blobBase = import.meta.env.VITE_BLOB_STORAGE_BASE_URL as string | undefined;
export const defaultDatasheetUrl =
  blobBase && blobBase.length > 0
    ? `${blobBase.replace(/\/$/, "")}/01-SIEMENS-S7-1500-Datasheet.pdf`
    : "/datasheets/dummy-datasheet.pdf";

export const defaultProducts: Product[] = [
  { 
    id: "kb1", 
    title: "Sendix 5000 / 5020", 
    brand: "KUEBLER", 
    category: "Incremental Encoders", 
    description: "Robust incremental encoder with Safety-Lock™ bearing structure, offering high resistance against vibration and installation errors.", 
    badge: "Best Seller",
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/sendix_5000.png", 
    specs: { "Resolution": "Up to 36,000 ppr", "Protection": "IP67", "Temperature": "-40°C to +105°C" }, 
    features: ["Safety-Lock™ design", "High shaft load capacity", "Magnetic & Optical options"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb2", 
    title: "Sendix M36", 
    brand: "KUEBLER", 
    category: "Absolute Encoders", 
    description: "Compact magnetic absolute encoder with Energy Harvesting Technology, operating without batteries or gears.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/sendix_m36.png", 
    specs: { "Size": "Ø 36 mm", "Interface": "Analog, SSI, CANopen", "Technology": "Magnetic multiturn" }, 
    features: ["No battery needed", "High shock resistance", "Extremely compact"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb3", 
    title: "Sendix F5868", 
    brand: "KUEBLER", 
    category: "Absolute Encoders", 
    description: "High-resolution optical absolute encoder with PROFINET IO interface and Profidrive profile.", 
    badge: "Industrial IoT",
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/sendix_5868.png", 
    specs: { "Resolution": "Up to 24 bit", "Interface": "PROFINET", "Update time": "1 ms" }, 
    features: ["Fast PROFINET IO", "Optical precision", "Integrated web server"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb4", 
    title: "Draw-wire mechanism A41", 
    brand: "KUEBLER", 
    category: "Linear Measurement", 
    description: "Compact draw-wire mechanics for measuring lengths up to 2 meters, seamlessly combinable with Sendix encoders.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/draw_wire_a41.png", 
    specs: { "Measuring length": "Up to 2000 mm", "Wire material": "Stainless steel", "Linearity": "± 0.1 %" }, 
    features: ["High traversing speed", "Robust titanium-anodized aluminum", "Easy encoder mounting"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb5", 
    title: "Draw-wire mechanism C120", 
    brand: "KUEBLER", 
    category: "Linear Measurement", 
    description: "Heavy-duty draw-wire mechanism for long distance measurements up to 15 meters in harsh environments.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/draw_wire_c120.png", 
    specs: { "Measuring length": "Up to 15 m", "Protection": "IP65", "Housing": "Aluminum profile" }, 
    features: ["Long measuring range", "Integrated dirt wiper", "High wire acceleration"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb6", 
    title: "Slip Ring SR085", 
    brand: "KUEBLER", 
    category: "Slip Rings", 
    description: "Modular standard slip ring for transmission of power, signals, and data up to 100A.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/sr085.png", 
    specs: { "Outer diameter": "85 mm", "Current": "Up to 100 A", "Channels": "Up to 20" }, 
    features: ["Modular chamber system", "Silver-precious metal contacts", "High vibration resistance"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb7", 
    title: "Slip Ring SR060E", 
    brand: "KUEBLER", 
    category: "Slip Rings", 
    description: "Specialized Ethernet slip ring for high-speed industrial network transmission (PROFINET, EtherCAT, EtherNet/IP).", 
    badge: "High-Speed",
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/sr060e.png", 
    specs: { "Outer diameter": "60 mm", "Data rate": "100 Mbit/s", "Protection": "IP65" }, 
    features: ["Industrial Ethernet transmission", "Shielded twisted pair", "Low contact resistance"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb8", 
    title: "Inclinometer IN81", 
    brand: "KUEBLER", 
    category: "Inclinometers", 
    description: "1-dimensional inclinometer with exceptionally high accuracy and robust aluminum housing for mobile automation.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/in81.png", 
    specs: { "Measuring range": "360°", "Accuracy": "± 0.1°", "Interface": "CANopen, Analog" }, 
    features: ["High shock resistance", "MEMS technology", "Parameterizable filters"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb9", 
    title: "Codix 130", 
    brand: "KUEBLER", 
    category: "Displays & Counters", 
    description: "Battery-powered LCD preset counter and timer, ideal for simple counting and timing tasks without external power.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/codix130.png", 
    specs: { "Display": "8-digit LCD", "Power": "Lithium battery", "Input frequency": "12 kHz" }, 
    features: ["7 years battery life", "High-contrast LCD", "Panel mount"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb10", 
    title: "Codix 560", 
    brand: "KUEBLER", 
    category: "Displays & Counters", 
    description: "Multifunctional LED preset counter with direct text guidance and scalable display.", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/codix560.png", 
    specs: { "Display": "6-digit LED", "Outputs": "Up to 4 relays", "Interface": "RS232 / RS485" }, 
    features: ["Multi-color display", "Intuitive text menu", "High switching capacity"], 
    datasheetUrl: defaultDatasheetUrl 
  },
  { 
    id: "kb11", 
    title: "Safety-M Module", 
    brand: "KUEBLER", 
    category: "Functional Safety", 
    description: "Compact safety speed monitor for monitoring drive standstill, speed, and direction (SIL3/PLe).", 
    price: "Contact for pricing", 
    imageUrl: "/products/kuebler/safetym.png", 
    specs: { "Safety Level": "SIL3 / PLe", "Inputs": "Encoder (SinCos, TTL)", "Response time": "< 10 ms" }, 
    features: ["Drive monitoring", "Removable memory card", "Easy parameterization"], 
    datasheetUrl: defaultDatasheetUrl 
  }
];

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSimilarProducts(products: Product[], current: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== current.id && (p.brand === current.brand || p.category === current.category))
    .slice(0, limit);
}
"""

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print("Created products.ts")
