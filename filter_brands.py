import re

with open('src/data/products.ts', 'r') as f:
    content = f.read()

# Update the brands array
brands_str = 'export const brands = [ "ELCO", "EUCHNER", "SICK" ] as const;'
content = re.sub(r'export const brands = \[.*?\] as const;', brands_str, content)

# Extract defaultProducts array block
match = re.search(r'export const defaultProducts: Product\[\] = \[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find defaultProducts")
    exit(1)

items_block = match.group(1)
lines = items_block.split('\n')

allowed_brands = ['brand: "ELCO"', 'brand: "EUCHNER"', 'brand: "SICK"']

filtered_lines = []
for line in lines:
    if line.strip().startswith('// ──'):
        # Keep comment headers for allowed brands
        if any(b in line for b in ['ELCO', 'EUCHNER', 'SICK']):
            filtered_lines.append(line)
    elif line.strip().startswith('{'):
        # Only keep if an allowed brand is present
        if any(b in line for b in allowed_brands):
            filtered_lines.append(line)
    else:
        # Keep empty lines or other stuff (like the first array bracket newline if present)
        filtered_lines.append(line)

filtered_block = "\n".join(filtered_lines)
content = content.replace(items_block, filtered_block)

# Clean up multiple empty lines
content = re.sub(r'\n{3,}', '\n\n', content)

with open('src/data/products.ts', 'w') as f:
    f.write(content)

print("Filtered products.ts")
