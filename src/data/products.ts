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

export const brands = ["KUEBLER", "SICK", "EUCHNER", "Schneider", "Mitsubishi", "Rockwell", "Siemens", "Honeywell"] as const;
export type Brand = (typeof brands)[number];

import { brandLogoUrls } from "./brandLogos";
export const brandThumbnails: Record<string, string> = brandLogoUrls;
export const defaultProductPlaceholder = "/placeholder.svg";

export function getProductDisplayImage(product: Product): string | undefined {
  return product.imageUrl ?? brandThumbnails[product.brand];
}

export const categories = [
  "All", 
  "Encoders & Motion",
  "Photoelectric Sensors",
  "Functional Safety",
  "Control System (PLC)",
  "Motion & Drive (VFD)",
  "HMI & SCADA",
  "Industrial Networking",
  "Process Instrumentation",
  "Power Supply",
  "Software & Platforms",
  "Robotics",
  "Relays & Contactors"
] as const;

const blobBase = import.meta.env.VITE_BLOB_STORAGE_BASE_URL as string | undefined;
export const defaultDatasheetUrl =
  blobBase && blobBase.length > 0
    ? `${blobBase.replace(/\/$/, "")}/01-SIEMENS-S7-1500-Datasheet.pdf`
    : "/datasheets/dummy-datasheet.pdf";

export const defaultProducts: Product[] = [
  {
    id: "kue3d416",
    title: "Sendix Incremental Encoders",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Industry-leading incremental encoder for precise speed and position control.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue41665",
    title: "Sendix Absolute Encoders",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "High-precision absolute encoder offering robust position detection even after power loss.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue6e468",
    title: "Draw-Wire Encoders",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Reliable linear measurement solution using draw-wire mechanisms for harsh environments.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue2a2bf",
    title: "Safety Encoders",
    brand: "KUEBLER",
    category: "Functional Safety",
    description: "SIL-certified encoders designed for safe drive monitoring and motion control.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Functional Safety" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kueae387",
    title: "Slip Rings",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Robust slip rings for reliable transmission of power and data in rotating systems.",
    imageUrl: "/products/generated/contactor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue24f36",
    title: "Codix Counters",
    brand: "KUEBLER",
    category: "HMI & SCADA",
    description: "Versatile digital counters and timers for fast industrial pulse counting.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue3a513",
    title: "Process Displays",
    brand: "KUEBLER",
    category: "HMI & SCADA",
    description: "High-visibility process displays for monitoring analog and digital sensor signals.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue4bd24",
    title: "Linear Measurement Systems",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Magnetic and optical linear measurement systems for exact positioning.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kue6d3b0",
    title: "Bearingless Encoders",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Compact bearingless encoders for high-speed motor feedback applications.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "kueffde3",
    title: "IO-Link Encoders",
    brand: "KUEBLER",
    category: "Encoders & Motion",
    description: "Smart encoders with IO-Link interface for seamless integration and diagnostics.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic1a0f8",
    title: "W4 Photoelectric Sensors",
    brand: "SICK",
    category: "Photoelectric Sensors",
    description: "Miniature photoelectric sensors offering best-in-class background suppression.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Photoelectric Sensors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sicc6b2e",
    title: "WL/WLG Photo Sensors",
    brand: "SICK",
    category: "Photoelectric Sensors",
    description: "Rugged photoelectric sensors for detecting transparent and opaque objects.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Photoelectric Sensors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic76b77",
    title: "LMS LiDAR Sensors",
    brand: "SICK",
    category: "Process Instrumentation",
    description: "Advanced 2D/3D LiDAR sensors for contour measurement and object detection.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic110c6",
    title: "Flexi Soft Safety Controller",
    brand: "SICK",
    category: "Functional Safety",
    description: "Modular safety controller for complex machine safety applications.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Functional Safety" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sicc983b",
    title: "IME Proximity Sensors",
    brand: "SICK",
    category: "Photoelectric Sensors",
    description: "Inductive proximity sensors for precise, non-contact metallic object detection.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Photoelectric Sensors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic143c6",
    title: "Encoder DFS60",
    brand: "SICK",
    category: "Encoders & Motion",
    description: "High-resolution programmable incremental encoder for diverse motion tasks.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic480de",
    title: "Barcode Scanners CLV Series",
    brand: "SICK",
    category: "Process Instrumentation",
    description: "High-performance laser barcode scanners for logistics and factory automation.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic34bee",
    title: "Vision Sensors InspectorP",
    brand: "SICK",
    category: "Process Instrumentation",
    description: "2D vision sensors for quality inspection and robotic guidance.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic9b139",
    title: "DeTec Safety Light Curtains",
    brand: "SICK",
    category: "Functional Safety",
    description: "Robust safety light curtains for hazardous point and area protection.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Functional Safety" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sic76db2",
    title: "RFH RFID Readers",
    brand: "SICK",
    category: "Industrial Networking",
    description: "High-frequency RFID readers for reliable industrial identification and tracking.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Industrial Networking" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch3dcca",
    title: "Modicon M221 PLC",
    brand: "Schneider",
    category: "Control System (PLC)",
    description: "Compact and versatile PLC for hardwired and simple machine architectures.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sched8b0",
    title: "Modicon M241 PLC",
    brand: "Schneider",
    category: "Control System (PLC)",
    description: "High-performance logic controller for complex motion and machinery tasks.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch6b860",
    title: "Modicon M580 PLC",
    brand: "Schneider",
    category: "Control System (PLC)",
    description: "Ethernet Programmable Automation Controller (ePAC) for process automation.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "schf7664",
    title: "Altivar ATV320 VFD",
    brand: "Schneider",
    category: "Motion & Drive (VFD)",
    description: "Compact variable speed drive tailored for simple to complex OEM machines.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch8648c",
    title: "Altivar ATV630 Drive",
    brand: "Schneider",
    category: "Motion & Drive (VFD)",
    description: "Process drive offering integrated energy monitoring and fluid management.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "schc046f",
    title: "Zelio Logic Smart Relay",
    brand: "Schneider",
    category: "Control System (PLC)",
    description: "Simple programmable logic relay for small automation systems and HVAC.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch3cb8f",
    title: "Harmony Push Buttons",
    brand: "Schneider",
    category: "HMI & SCADA",
    description: "Robust and modular pushbuttons, switches, and pilot lights for machine control.",
    imageUrl: "/products/generated/contactor.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch07a35",
    title: "TeSys Contactors",
    brand: "Schneider",
    category: "Relays & Contactors",
    description: "Industry-leading motor control contactors offering unmatched reliability and compactness.",
    imageUrl: "/products/generated/contactor.png",
    specs: { "Industry": "Automation", "Type": "Relays & Contactors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch8102c",
    title: "Magelis HMI Panels",
    brand: "Schneider",
    category: "HMI & SCADA",
    description: "Advanced touch screen panels offering intuitive operator interfaces.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sch40ee8",
    title: "EcoStruxure Automation Expert",
    brand: "Schneider",
    category: "Software & Platforms",
    description: "Software-centric industrial automation platform based on the IEC 61499 standard.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "Software & Platforms" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mite488e",
    title: "MELSEC FX5U PLC",
    brand: "Mitsubishi",
    category: "Control System (PLC)",
    description: "High-speed compact PLC offering advanced built-in functions and expansive connectivity.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mitc2929",
    title: "MELSEC iQ-R PLC",
    brand: "Mitsubishi",
    category: "Control System (PLC)",
    description: "Flagship programmable controller offering ultra-high processing speeds and scalability.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mitc6163",
    title: "MELSEC Q Series PLC",
    brand: "Mitsubishi",
    category: "Control System (PLC)",
    description: "Highly reliable multi-processor controller for medium to large-scale automation.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mit79cad",
    title: "GOT2000 HMI",
    brand: "Mitsubishi",
    category: "HMI & SCADA",
    description: "High-resolution graphic operator terminal with intuitive multi-touch capabilities.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mit23ec4",
    title: "FR-E800 VFD",
    brand: "Mitsubishi",
    category: "Motion & Drive (VFD)",
    description: "Compact micro-drive offering multiple network protocols and predictive maintenance.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mit5a847",
    title: "FR-A800 Inverter",
    brand: "Mitsubishi",
    category: "Motion & Drive (VFD)",
    description: "High-performance heavy-duty inverter for complex motor control applications.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mit60053",
    title: "MR-J4 Servo Drives",
    brand: "Mitsubishi",
    category: "Motion & Drive (VFD)",
    description: "High-dynamic servo amplifier with advanced vibration suppression technology.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mit5eef0",
    title: "MELSERVO Servo Motors",
    brand: "Mitsubishi",
    category: "Encoders & Motion",
    description: "Compact, high-torque servo motors designed for high-precision positioning.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Encoders & Motion" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mitc6fe9",
    title: "CC-Link IE Network Modules",
    brand: "Mitsubishi",
    category: "Industrial Networking",
    description: "Gigabit Ethernet-based industrial network modules for high-speed communication.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Industrial Networking" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "mitf4014",
    title: "SCARA Industrial Robots",
    brand: "Mitsubishi",
    category: "Robotics",
    description: "High-speed SCARA robots designed for precision assembly and pick-and-place tasks.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Robotics" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "rocb3bd9",
    title: "CompactLogix PLC",
    brand: "Rockwell",
    category: "Control System (PLC)",
    description: "Scalable controller offering integrated safety, motion, and standard control.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "rocbb8b9",
    title: "ControlLogix PLC",
    brand: "Rockwell",
    category: "Control System (PLC)",
    description: "Heavy-duty chassis-based controller for large, complex process applications.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "rocadc56",
    title: "Micro850 PLC",
    brand: "Rockwell",
    category: "Control System (PLC)",
    description: "Micro PLC designed for basic standalone machine control applications.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc04a38",
    title: "PowerFlex 525 VFD",
    brand: "Rockwell",
    category: "Motion & Drive (VFD)",
    description: "Compact AC drive featuring embedded EtherNet/IP and Safe Torque-Off.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc6d59d",
    title: "PowerFlex 755 Drive",
    brand: "Rockwell",
    category: "Motion & Drive (VFD)",
    description: "Advanced AC drive for demanding motor control and precise positioning applications.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc4a41c",
    title: "PanelView Plus HMI",
    brand: "Rockwell",
    category: "HMI & SCADA",
    description: "Robust graphic terminals providing intuitive integration with Logix controllers.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc2ae13",
    title: "Kinetix Servo Drives",
    brand: "Rockwell",
    category: "Motion & Drive (VFD)",
    description: "Integrated motion control servo drives over standard EtherNet/IP networks.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc53ab9",
    title: "Allen-Bradley Contactors",
    brand: "Rockwell",
    category: "Relays & Contactors",
    description: "Highly durable industrial contactors for demanding motor starting applications.",
    imageUrl: "/products/generated/contactor.png",
    specs: { "Industry": "Automation", "Type": "Relays & Contactors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc940de",
    title: "Stratix Industrial Switches",
    brand: "Rockwell",
    category: "Industrial Networking",
    description: "Managed industrial Ethernet switches built for harsh environments and IT/OT convergence.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Industrial Networking" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "roc42e56",
    title: "FactoryTalk View SCADA/HMI",
    brand: "Rockwell",
    category: "Software & Platforms",
    description: "Comprehensive HMI and SCADA software for plant-wide visualization and monitoring.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "Software & Platforms" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sieb666e",
    title: "SIMATIC S7-1200 PLC",
    brand: "Siemens",
    category: "Control System (PLC)",
    description: "Basic controller offering flexible I/O and integrated PROFINET for simple automation.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie4e0bb",
    title: "SIMATIC S7-1500 PLC",
    brand: "Siemens",
    category: "Control System (PLC)",
    description: "Advanced controller for the highest processing speeds and demanding system tasks.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sief632b",
    title: "LOGO! PLC",
    brand: "Siemens",
    category: "Control System (PLC)",
    description: "Compact logic module for simple, small-scale automation and smart home applications.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie6c291",
    title: "SINAMICS G120 Drive",
    brand: "Siemens",
    category: "Motion & Drive (VFD)",
    description: "Modular vector drive system offering embedded safety and energy recovery.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie70a29",
    title: "SINAMICS V20 VFD",
    brand: "Siemens",
    category: "Motion & Drive (VFD)",
    description: "Cost-effective, easy-to-use basic converter for standard pump and fan applications.",
    imageUrl: "/products/generated/drive.png",
    specs: { "Industry": "Automation", "Type": "Motion & Drive (VFD)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie2aeb9",
    title: "SIMATIC HMI Comfort Panels",
    brand: "Siemens",
    category: "HMI & SCADA",
    description: "High-end brilliant widescreen displays with PROFINET/PROFIBUS integration.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "HMI & SCADA" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie8a3cb",
    title: "ET200SP Remote I/O",
    brand: "Siemens",
    category: "Control System (PLC)",
    description: "Scalable and highly flexible distributed I/O system for control cabinets.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sieec6ed",
    title: "TIA Portal Software",
    brand: "Siemens",
    category: "Software & Platforms",
    description: "Totally Integrated Automation Portal for complete engineering and visualization.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "Software & Platforms" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sie82632",
    title: "SITOP Power Supplies",
    brand: "Siemens",
    category: "Power Supply",
    description: "Reliable and efficient 24V DC power supply units for industrial environments.",
    imageUrl: "/products/generated/contactor.png",
    specs: { "Industry": "Automation", "Type": "Power Supply" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "sieef832",
    title: "SIMOTION Motion Controllers",
    brand: "Siemens",
    category: "Control System (PLC)",
    description: "High-end motion control system for production machines requiring exact synchronization.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon0fa81",
    title: "Experion PKS DCS",
    brand: "Honeywell",
    category: "Control System (PLC)",
    description: "Process Knowledge System integrating distributed control, safety, and advanced SCADA.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon62c67",
    title: "HC900 Controller",
    brand: "Honeywell",
    category: "Control System (PLC)",
    description: "Hybrid process and logic controller ideal for thermal control and boiler applications.",
    imageUrl: "/products/generated/plc.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "honf5b6f",
    title: "UDC Controllers",
    brand: "Honeywell",
    category: "Control System (PLC)",
    description: "Universal digital controllers delivering precise PID control for process variables.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "Control System (PLC)" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon77916",
    title: "VersaFlow Meters",
    brand: "Honeywell",
    category: "Process Instrumentation",
    description: "Accurate Coriolis, electromagnetic, and vortex flow meters for demanding fluids.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon90179",
    title: "Limit Switches",
    brand: "Honeywell",
    category: "Photoelectric Sensors",
    description: "Heavy-duty enclosed limit switches designed for the harshest industrial conditions.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Photoelectric Sensors" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon0a4ec",
    title: "Safety Sensors",
    brand: "Honeywell",
    category: "Functional Safety",
    description: "High-reliability safety sensors and interlocks for machine safeguarding.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Functional Safety" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon26a96",
    title: "Gas Detectors",
    brand: "Honeywell",
    category: "Process Instrumentation",
    description: "Robust fixed gas detection systems for toxic and combustible environments.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "honb35dd",
    title: "Industrial Scanners",
    brand: "Honeywell",
    category: "Process Instrumentation",
    description: "Rugged barcode scanners and mobility devices for distribution and manufacturing.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon8d673",
    title: "SmartLine Transmitters",
    brand: "Honeywell",
    category: "Process Instrumentation",
    description: "Modular pressure, temperature, and level transmitters with advanced diagnostics.",
    imageUrl: "/products/generated/sensor.png",
    specs: { "Industry": "Automation", "Type": "Process Instrumentation" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  },
  {
    id: "hon49e37",
    title: "Honeywell Forge Platform",
    brand: "Honeywell",
    category: "Software & Platforms",
    description: "Enterprise performance management software leveraging advanced AI and IoT analytics.",
    imageUrl: "/products/generated/hmi.png",
    specs: { "Industry": "Automation", "Type": "Software & Platforms" },
    features: ["High Reliability", "Industry Standard", "Robust Design"],
    datasheetUrl: defaultDatasheetUrl
  }
];

export const products = defaultProducts;

export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getSimilarProducts(products: Product[], currentProduct: Product, limit: number = 4): Product[] {
  return products
    .filter((p) => p.id !== currentProduct.id && (p.category === currentProduct.category || p.brand === currentProduct.brand))
    .slice(0, limit);
}
