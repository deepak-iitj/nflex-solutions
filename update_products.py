import re

with open('src/data/products.ts', 'r') as f:
    content = f.read()

new_categories = 'export const categories = ["All", "Control System", "I/O Modules", "Connectivity", "Encoder", "Sensors", "Machine Vision", "Safety Products", "RFID", "Pneumatic Solution", "Motion & Drive", "Relays", "Lighting & Indication", "IoT"] as const;'
content = re.sub(r'export const categories = \[.*?\] as const;', new_categories, content)

new_products = """
  // ── ELCO (Other Segments Placeholders) ──
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
];"""

content = re.sub(r'\];', new_products, content, count=1)

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print("Updated products.ts")
