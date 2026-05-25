export interface Product {
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

export const brands = [ "ELCO", "EUCHNER", "SICK" ] as const;
export type Brand = (typeof brands)[number];

/** Brand logos from assets (see src/data/brandLogos.ts). Used when product has no imageUrl. */
import { brandLogoUrls } from "./brandLogos";

export const brandThumbnails: Record<string, string> = brandLogoUrls;

/** Default product image when no product image or brand logo is available. */
export const defaultProductPlaceholder = "/placeholder.svg";

/** Returns product image URL or brand thumbnail fallback. */
export function getProductDisplayImage(product: Product): string | undefined {
  return product.imageUrl ?? brandThumbnails[product.brand];
}

export const categories = ["All", "Control System", "I/O Modules", "Connectivity", "Encoder", "Sensors", "Machine Vision", "Safety Products", "RFID", "Pneumatic Solution", "Motion & Drive", "Relays", "Lighting & Indication", "IoT"] as const;

/** Product datasheets: from Vercel Blob when VITE_BLOB_STORAGE_BASE_URL is set, else local dummy. Replace with per-product URLs later. */
const blobBase = import.meta.env.VITE_BLOB_STORAGE_BASE_URL as string | undefined;
export const defaultDatasheetUrl =
  blobBase && blobBase.length > 0
    ? `${blobBase.replace(/\/$/, "")}/01-SIEMENS-S7-1500-Datasheet.pdf`
    : "/datasheets/dummy-datasheet.pdf";

export const defaultProducts: Product[] = [
  { id: "si1", title: "W16 Photoelectric Sensor", brand: "SICK", category: "Sensors", description: "Smart photoelectric sensor with BluePilot alignment aid and IO-Link.", price: "Contact for pricing", imageUrl: "/products/sick/w16.png", specs: { "Type": "Photoelectric", "Range": "Up to 50m" }, features: ["BluePilot alignment", "IO-Link", "Rugged Vistal housing"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/optoelectronic-sensors/photoelectric-sensors/w16/c/g460831" },
  { id: "si2", title: "DFS60 Incremental Encoder", brand: "SICK", category: "Encoder", description: "High-resolution programmable incremental encoder for precise speed and position control.", price: "Contact for pricing", imageUrl: "/products/sick/dfs60.png", specs: { "Type": "Incremental", "Resolution": "Up to 65,536 ppr" }, features: ["Programmable resolution", "High IP rating"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/encoders/incremental-encoders/dfs60/c/g143232" },
  { id: "si3", title: "microScan3 Safety Laser Scanner", brand: "SICK", category: "Safety Products", description: "Reliable safety laser scanner with safeHDDM technology for harsh environments.", price: "Contact for pricing", imageUrl: "/products/sick/microscan3.png", specs: { "Type": "Laser Scanner", "Range": "Up to 9m" }, features: ["safeHDDM", "Simultaneous fields", "EtherNet/IP"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/safety-switches/safety-laser-scanners/microscan3/c/g377484" },
  { id: "eu1", title: "MGB Multifunctional Gate Box", brand: "EUCHNER", category: "Safety Products", description: "Heavy-duty safety door switch with integrated locking, escape release, and buttons.", price: "Contact for pricing", imageUrl: "/products/euchner/mgb.png", specs: { "Type": "Gate Box", "Locking force": "2000 N" }, features: ["Integrated handle", "Escape release", "PROFINET support"], datasheetUrl: "https://www.euchner.de/en-us/products/mgb/" },
  { id: "eu2", title: "CES-AR Safety Switch", brand: "EUCHNER", category: "Safety Products", description: "Non-contact, transponder-coded safety switch for high manipulation protection.", price: "Contact for pricing", imageUrl: "/products/euchner/ces-ar.png", specs: { "Type": "Non-contact", "Coding": "Uniquely coded" }, features: ["High tamper resistance", "Series connection", "Diagnostic LED"], datasheetUrl: "https://www.euchner.de/en-us/products/ces-ar/" },
  { id: "eu3", title: "EKS Electronic-Key-System", brand: "EUCHNER", category: "Control System", description: "Industrial access control system for machine mode selection and personnel tracking.", price: "Contact for pricing", imageUrl: "/products/euchner/eks.png", specs: { "Type": "Access Control", "Interface": "USB / PROFINET" }, features: ["Mode selection", "Electronic log", "Rugged design"], datasheetUrl: "https://www.euchner.de/en-us/products/eks/" },
  { id: "el5", title: "Inductive Sensors", brand: "ELCO", category: "Sensors", description: "Industrial inductive sensors for positioning and presence detection.", price: "Contact for pricing", imageUrl: "/products/elco/20250610141243_53986.png", specs: { "Technology": "Inductive" }, features: ["Positioning", "Presence detection"], datasheetUrl: defaultDatasheetUrl },
  { id: "el6", title: "Capacitive Sensors", brand: "ELCO", category: "Sensors", description: "Industrial capacitive sensors for level monitoring and object detection.", price: "Contact for pricing", imageUrl: "/products/elco/20250610142609_25164.png", specs: { "Technology": "Capacitive" }, features: ["Level monitoring", "Object detection"], datasheetUrl: defaultDatasheetUrl },
  { id: "el7", title: "Ultrasonic Sensors", brand: "ELCO", category: "Sensors", description: "Industrial ultrasonic sensors for distance measurement and positioning.", price: "Contact for pricing", imageUrl: "/products/elco/20250624114648_50868.png", specs: { "Technology": "Ultrasonic" }, features: ["Distance measurement", "Positioning"], datasheetUrl: defaultDatasheetUrl },
  { id: "el8", title: "Photoelectric Sensors", brand: "ELCO", category: "Sensors", description: "Industrial photoelectric sensors for object differentiation.", price: "Contact for pricing", imageUrl: "/products/elco/20250610133326_97312.png", specs: { "Technology": "Photoelectric" }, features: ["Object differentiation"], datasheetUrl: defaultDatasheetUrl },
  { id: "el9", title: "Distance Sensors", brand: "ELCO", category: "Sensors", description: "Industrial distance sensors for accurate distance measurement.", price: "Contact for pricing", imageUrl: "/products/elco/ELCO_Measurement_Sensors_V1.1.jpg", specs: { "Technology": "Distance Measurement" }, features: ["Distance measurement"], datasheetUrl: defaultDatasheetUrl },
  { id: "el10", title: "Fiber-Optic Sensors", brand: "ELCO", category: "Sensors", description: "Industrial fiber-optic sensors for precise detection in tight spaces.", price: "Contact for pricing", imageUrl: "/products/elco/ELCO_Fiber-optic_sensors.jpg", specs: { "Technology": "Fiber-Optic" }, features: ["Precise detection", "Tight spaces"], datasheetUrl: defaultDatasheetUrl },
  { id: "el11", title: "Color/Digital Mark Sensors", brand: "ELCO", category: "Sensors", description: "Industrial sensors for color and registration mark detection.", price: "Contact for pricing", imageUrl: "/products/elco/ELCO_Color-Color_Mark_Sensors.png", specs: { "Technology": "Color/Mark Detection" }, features: ["Color detection", "Registration mark detection"], datasheetUrl: defaultDatasheetUrl },
  { id: "el12", title: "Optical Data Transmission", brand: "ELCO", category: "Sensors", description: "Optical data transmission modules for industrial signal communication.", price: "Contact for pricing", imageUrl: "/products/elco/20250610133145_35848.png", specs: { "Technology": "Optical Transmission" }, features: ["Signal communication", "Optical data"], datasheetUrl: defaultDatasheetUrl },

  { id: "el1", title: "IO-Link Solution", brand: "ELCO", category: "I/O Modules", description: "IO-Link master and device portfolio for flexible sensor/actuator integration and parameterization.", price: "Contact for pricing", specs: { "Protocol": "IO-Link 1.1", "Ports": "4–8 per master", "Integration": "PROFINET, EtherCAT, EtherNet/IP", "Protection": "IP20 / IP67", "Diagnostics": "Port-level", "Variants": "Block, in-line, hub" }, features: ["Tool-free wiring", "Remote parameterization", "Condition monitoring", "Modular expansion"], datasheetUrl: defaultDatasheetUrl },
  { id: "el2", title: "IP67 Integrated I/O", brand: "ELCO", category: "I/O Modules", description: "IP67-rated distributed I/O for direct field installation without control cabinet.", badge: "Popular", price: "Contact for pricing", specs: { "Protection": "IP67", "Protocols": "PROFINET, EtherCAT, EtherNet/IP, Modbus TCP", "I/O Types": "Digital, analog, special", "Mounting": "Field mount", "Channels": "Integrated blocks" }, features: ["Direct field mounting", "Reduced cabinet space", "Industrial Ethernet", "Wide temperature range"], datasheetUrl: defaultDatasheetUrl },
  { id: "el3", title: "IP20 Modular I/O", brand: "ELCO", category: "I/O Modules", description: "Modular IP20 I/O system for control cabinet mounting with high channel density.", price: "Contact for pricing", specs: { "Protection": "IP20", "Backplane": "PROFINET, EtherCAT, EtherNet/IP", "Modules": "DI, DO, AI, AO, special", "Width": "Modular per channel", "Hot Swap": "Yes" }, features: ["Modular expansion", "Mixed signal types", "Diagnostics", "DIN rail mount"], datasheetUrl: defaultDatasheetUrl },
  { id: "el4", title: "IP20 Compact I/O", brand: "ELCO", category: "I/O Modules", description: "Compact IP20 I/O blocks for space-limited cabinets with industrial Ethernet connectivity.", price: "Contact for pricing", specs: { "Protection": "IP20", "Protocols": "PROFINET, EtherCAT, EtherNet/IP, Modbus TCP", "Form": "Compact block", "I/O": "Digital, analog", "Speed": "Real-time capable" }, features: ["Space-saving", "Fast commissioning", "LED status", "Screw/spring terminals"], datasheetUrl: defaultDatasheetUrl },

  { id: "el13", title: "Advanced Control System", brand: "ELCO", category: "Control System", description: "High-performance programmable logic controllers and industrial PCs for factory automation.", price: "Contact for pricing", specs: { "Type": "Controller" }, features: ["Scalable architecture", "High-speed processing"], datasheetUrl: defaultDatasheetUrl },
  { id: "el14", title: "Industrial Ethernet Connectivity", brand: "ELCO", category: "Connectivity", description: "Robust networking switches and cables for reliable industrial communication.", price: "Contact for pricing", specs: { "Type": "Switch/Cable" }, features: ["Profinet compatible", "IP67 rated options"], datasheetUrl: defaultDatasheetUrl },
  { id: "el15", title: "Rotary Encoders", brand: "ELCO", category: "Encoder", description: "Absolute and incremental rotary encoders for precise motion feedback.", price: "Contact for pricing", specs: { "Type": "Encoder" }, features: ["High resolution", "Magnetic and optical"], datasheetUrl: defaultDatasheetUrl },
  { id: "el16", title: "Machine Vision System", brand: "ELCO", category: "Machine Vision", description: "Smart cameras and vision sensors for quality inspection and guidance.", price: "Contact for pricing", specs: { "Type": "Vision" }, features: ["Deep learning ready", "High-speed capture"], datasheetUrl: defaultDatasheetUrl },
  { id: "el17", title: "Safety Light Curtains", brand: "ELCO", category: "Safety Products", description: "Reliable safety light curtains and scanners to protect personnel.", price: "Contact for pricing", specs: { "Type": "Safety" }, features: ["SIL3 certified", "Easy alignment"], datasheetUrl: defaultDatasheetUrl },
  { id: "el18", title: "RFID Tracking System", brand: "ELCO", category: "RFID", description: "Industrial RFID readers and tags for asset tracking and logistics.", price: "Contact for pricing", specs: { "Type": "RFID" }, features: ["UHF/HF bands", "Long read range"], datasheetUrl: defaultDatasheetUrl },
  { id: "el19", title: "Pneumatic Valves", brand: "ELCO", category: "Pneumatic Solution", description: "Compact pneumatic valves and manifolds for precise fluid control.", price: "Contact for pricing", specs: { "Type": "Pneumatic" }, features: ["Fast switching", "Low power consumption"], datasheetUrl: defaultDatasheetUrl },
  { id: "el20", title: "Servo Drive System", brand: "ELCO", category: "Motion & Drive", description: "High-precision servo drives and motors for demanding motion applications.", price: "Contact for pricing", specs: { "Type": "Drive" }, features: ["Advanced tuning", "EtherCAT support"], datasheetUrl: defaultDatasheetUrl },
  { id: "el21", title: "Industrial Relays", brand: "ELCO", category: "Relays", description: "Electromechanical and solid-state relays for reliable switching.", price: "Contact for pricing", specs: { "Type": "Relay" }, features: ["Slim design", "High switching capacity"], datasheetUrl: defaultDatasheetUrl },
  { id: "el22", title: "LED Indicator Lights", brand: "ELCO", category: "Lighting & Indication", description: "High-visibility tower lights and indicators for machine status.", price: "Contact for pricing", specs: { "Type": "Indication" }, features: ["Multi-color", "Built-in buzzer"], datasheetUrl: defaultDatasheetUrl },
  { id: "el23", title: "IoT Edge Gateway", brand: "ELCO", category: "IoT", description: "Industrial IoT gateways for seamless cloud connectivity and edge processing.", price: "Contact for pricing", specs: { "Type": "Gateway" }, features: ["MQTT support", "Secure data transmission"], datasheetUrl: defaultDatasheetUrl },

  { id: "eu1", title: "CES-AR Safety Switch", brand: "EUCHNER", category: "Safety", description: "Transponder-coded magnetic safety switch for door and guard monitoring.", badge: "Popular", price: "Contact for pricing", specs: { "Model Example": "CES-AR-C01-AH-SA (098941), CES-AR-C01-CH-SA", "Safety Level": "SIL 3 / Cat 4 / PLe", "Actuation": "Non-contact transponder", "Contacts": "2 NO safety + monitoring", "Protection": "IP67", "Series": "Up to 20 switches" }, features: ["Tamper-resistant", "No wear contacts", "High switching frequency", "Flexible mounting"], datasheetUrl: defaultDatasheetUrl },
  { id: "eu2", title: "E-STOP Pushbutton MGB", brand: "EUCHNER", category: "Safety", description: "Emergency stop pushbutton with positive break contacts and robust metal housing.", price: "Contact for pricing", specs: { "Model Example": "MGB-L1C-ARA-R (109798)", "Standard": "IEC 60947-5-5", "Contacts": "Positive break, 2 NO + 2 NC", "Protection": "IP65", "Diameter": "40 mm", "Release": "Turn-to-reset" }, features: ["Positive break", "Twist release", "High visibility", "Reliable shutdown"], datasheetUrl: defaultDatasheetUrl },
  { id: "eu3", title: "Safety Door Handle TZ", brand: "EUCHNER", category: "Safety", description: "Safety door handle with integrated switch for guard locking and access control.", price: "Contact for pricing", specs: { "Function": "Guard locking + monitoring", "Safety": "Cat 4 / PLe", "Locking Force": "Up to 3000 N", "Protection": "IP65", "Release": "Electrical or mechanical" }, features: ["Guard locking", "Trapped key option", "Status feedback", "Durable design"], datasheetUrl: defaultDatasheetUrl },
  { id: "eu4", title: "Key-Operated Switch CKS", brand: "EUCHNER", category: "Safety", description: "Key-operated safety switch for mode selection and access control.", price: "Contact for pricing", specs: { "Positions": "2–4 positions", "Key": "Coded", "Contacts": "Safety + auxiliary", "Protection": "IP65", "Mounting": "Panel" }, features: ["Coded key system", "Mode selection", "Access control", "Compact design"], datasheetUrl: defaultDatasheetUrl },

  { id: "sk1", title: "W12 Photoelectric Sensor", brand: "SICK", category: "Sensors", description: "Compact photoelectric sensor for detection in tight spaces with background suppression.", badge: "Best Seller", price: "Contact for pricing", specs: { "Models": "WT12L-2B540, WTB12L (30–200 mm)", "Type": "Background suppression laser", "Range": "30–200 mm", "Light Source": "Red laser 650 nm", "Output": "PNP/NPN", "Protection": "IP67/IP69K", "Switching": "2,500 Hz" }, features: ["Compact housing", "Background suppression", "Quick connect", "Reliable switching"], datasheetUrl: defaultDatasheetUrl },
  { id: "sk2", title: "IME Inductive Proximity Sensor", brand: "SICK", category: "Sensors", description: "Inductive proximity sensor for metal detection with flush or non-flush mounting.", price: "Contact for pricing", specs: { "Models": "IME12-04BPSZW2KS31 (M12, 4 mm), IME18, IME30", "Sensing Range": "2–15 mm", "Frequency": "Up to 2 kHz", "Output": "PNP/NPN", "Protection": "IP65/IP67", "Housing": "M8–M30" }, features: ["Metal detection", "Short-circuit protection", "Weld-field immune", "Long service life"], datasheetUrl: defaultDatasheetUrl },
  { id: "sk3", title: "DBS60 Distance Sensor", brand: "SICK", category: "Sensors", description: "Compact distance sensor for precise measurement and level detection.", price: "Contact for pricing", specs: { "Models": "DBS60E-S4CK (analog/IO-Link)", "Range": "20–600 mm", "Accuracy": "±3 mm", "Output": "4–20 mA / IO-Link", "Protection": "IP67", "Technology": "ToF" }, features: ["Analog + IO-Link", "Background suppression", "Compact", "Process monitoring"], datasheetUrl: defaultDatasheetUrl },
  { id: "sk4", title: "DFS60 Safety Light Curtain", brand: "SICK", category: "Safety", description: "Safety light curtain for point-of-operation guarding and perimeter access.", price: "Contact for pricing", specs: { "Resolution": "14–90 mm (finger/hand/body)", "Range": "Up to 12 m", "Safety": "Cat 4 / PLe", "Beams": "20–160", "Response": "≤ 14 ms" }, features: ["Finger/hand/body protection", "Muting", "Cascading", "Easy alignment"], datasheetUrl: defaultDatasheetUrl },
  { id: "sk5", title: "ATM60 Absolute Encoder", brand: "SICK", category: "Sensors", description: "Absolute multiturn encoder for position feedback on motors and axes.", price: "Contact for pricing", specs: { "Resolution": "Up to 25 bit", "Interface": "SSI, PROFIBUS, PROFINET", "Protection": "IP65/IP67", "Shaft": "Hollow / solid", "Turns": "Multiturn, no battery" }, features: ["Absolute position", "No battery", "Industrial interfaces", "Robust housing"], datasheetUrl: defaultDatasheetUrl },

];

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSimilarProducts(products: Product[], current: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.id !== current.id && (p.brand === current.brand || p.category === current.category))
    .slice(0, limit);
}
