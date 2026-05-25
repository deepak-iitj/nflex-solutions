import re

with open('old_products.ts', 'r') as f:
    old_content = f.read()

# Extract everything inside defaultProducts = [...] from old_products.ts
match_old = re.search(r'export const defaultProducts: Product\[\] = \[(.*?)\];', old_content, re.DOTALL)
if not match_old:
    print("Could not find defaultProducts in old_products.ts")
    exit(1)

old_items_block = match_old.group(1)

# We want to extract only the lines that do NOT belong to ELCO.
# The file has comments like // ── BRAND ──
# We can just split by lines, and filter out the ELCO blocks.
# But it's easier to just use regex to remove the ELCO products.
# Every product object starts with { and ends with },
# The ELCO block was at the end or middle.
# Let's extract lines that are not ELCO.
# Actually, since the products are one per line:
old_lines = old_items_block.split('\n')
non_elco_lines = []
for line in old_lines:
    if 'brand: "ELCO"' not in line and 'brand: "Elco"' not in line and 'ELCO (I/O Modules' not in line and 'ELCO (Sensors' not in line:
        non_elco_lines.append(line)

# Now read src/data/products.ts
with open('src/data/products.ts', 'r') as f:
    new_content = f.read()

# Add the brands back
brands_str = 'export const brands = [ "ELCO", "Siemens", "ABB", "Schneider", "Rockwell", "Mitsubishi", "Honeywell", "EUCHNER", "SICK" ] as const;'
new_content = re.sub(r'export const brands = \[.*?\] as const;', brands_str, new_content)

# We need to insert the non_elco_lines right before the closing ]; of defaultProducts
# Let's find the closing ]; of defaultProducts
match_new = re.search(r'export const defaultProducts: Product\[\] = \[(.*?)\];', new_content, re.DOTALL)
if not match_new:
    print("Could not find defaultProducts in src/data/products.ts")
    exit(1)

new_items_block = match_new.group(1)

merged_items_block = new_items_block.rstrip() + "\n" + "\n".join(non_elco_lines) + "\n"
new_content = new_content.replace(new_items_block, merged_items_block)

with open('src/data/products.ts', 'w') as f:
    f.write(new_content)

print("Merged non-ELCO products back into src/data/products.ts")
