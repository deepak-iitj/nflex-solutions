import re

with open('src/data/products.ts', 'r') as f:
    content = f.read()

new_products = """
  // ── SICK ──
  { id: "si1", title: "W16 Photoelectric Sensor", brand: "SICK", category: "Sensors", description: "Smart photoelectric sensor with BluePilot alignment aid and IO-Link.", price: "Contact for pricing", imageUrl: "/products/sick/w16.png", specs: { "Type": "Photoelectric", "Range": "Up to 50m" }, features: ["BluePilot alignment", "IO-Link", "Rugged Vistal housing"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/optoelectronic-sensors/photoelectric-sensors/w16/c/g460831" },
  { id: "si2", title: "DFS60 Incremental Encoder", brand: "SICK", category: "Encoder", description: "High-resolution programmable incremental encoder for precise speed and position control.", price: "Contact for pricing", imageUrl: "/products/sick/dfs60.png", specs: { "Type": "Incremental", "Resolution": "Up to 65,536 ppr" }, features: ["Programmable resolution", "High IP rating"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/encoders/incremental-encoders/dfs60/c/g143232" },
  { id: "si3", title: "microScan3 Safety Laser Scanner", brand: "SICK", category: "Safety Products", description: "Reliable safety laser scanner with safeHDDM technology for harsh environments.", price: "Contact for pricing", imageUrl: "/products/sick/microscan3.png", specs: { "Type": "Laser Scanner", "Range": "Up to 9m" }, features: ["safeHDDM", "Simultaneous fields", "EtherNet/IP"], datasheetUrl: "https://www.sick.com/de/en/catalog/products/safety-switches/safety-laser-scanners/microscan3/c/g377484" },

  // ── EUCHNER ──
  { id: "eu1", title: "MGB Multifunctional Gate Box", brand: "EUCHNER", category: "Safety Products", description: "Heavy-duty safety door switch with integrated locking, escape release, and buttons.", price: "Contact for pricing", imageUrl: "/products/euchner/mgb.png", specs: { "Type": "Gate Box", "Locking force": "2000 N" }, features: ["Integrated handle", "Escape release", "PROFINET support"], datasheetUrl: "https://www.euchner.de/en-us/products/mgb/" },
  { id: "eu2", title: "CES-AR Safety Switch", brand: "EUCHNER", category: "Safety Products", description: "Non-contact, transponder-coded safety switch for high manipulation protection.", price: "Contact for pricing", imageUrl: "/products/euchner/ces-ar.png", specs: { "Type": "Non-contact", "Coding": "Uniquely coded" }, features: ["High tamper resistance", "Series connection", "Diagnostic LED"], datasheetUrl: "https://www.euchner.de/en-us/products/ces-ar/" },
  { id: "eu3", title: "EKS Electronic-Key-System", brand: "EUCHNER", category: "Control System", description: "Industrial access control system for machine mode selection and personnel tracking.", price: "Contact for pricing", imageUrl: "/products/euchner/eks.png", specs: { "Type": "Access Control", "Interface": "USB / PROFINET" }, features: ["Mode selection", "Electronic log", "Rugged design"], datasheetUrl: "https://www.euchner.de/en-us/products/eks/" },
"""

# Now we need to sort the products. Let's parse all items.
# First, insert new_products at the beginning of the defaultProducts array.
match = re.search(r'(export const defaultProducts: Product\[\] = \[\n)(.*?)(\n\];)', content, re.DOTALL)
if not match:
    print("Could not find defaultProducts")
    exit(1)

items_block = match.group(2)

# We want to put items with images first.
# To do this robustly without a full AST parser, we can try to split by lines that start with {
items = []
current_item = []
for line in items_block.split('\n'):
    if line.strip().startswith('//'):
        continue
    if line.strip().startswith('{'):
        if current_item:
            items.append("\n".join(current_item))
        current_item = [line]
    elif current_item:
        current_item.append(line)

if current_item:
    items.append("\n".join(current_item))

# Combine with new products
new_items = []
for line in new_products.split('\n'):
    if line.strip().startswith('{'):
        new_items.append(line)

all_items = new_items + items

with_img = []
without_img = []

for item in all_items:
    if 'imageUrl:' in item:
        with_img.append(item)
    else:
        without_img.append(item)

sorted_block = "\n".join(with_img) + "\n" + "\n".join(without_img)

new_content = content[:match.start(2)] + sorted_block + content[match.end(2):]

with open('src/data/products.ts', 'w') as f:
    f.write(new_content)

print("Updated catalog and sorted images first.")
