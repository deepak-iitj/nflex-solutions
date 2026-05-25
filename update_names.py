import os

REPLACEMENTS = [
    ("NFlex Solutions", "NFlex Solutions"),
    ("NFlex Solutions", "NFlex Solutions"),
    ("NFlex Solutions", "NFlex Solutions"),
    ("NFlex Solutions", "NFlex Solutions"),
    ("nflexsolutions.com", "nflexsolutions.com"),
    ("Info@nflexsolutions.com", "info@nflexsolutions.com"),
    ("info@nflexsolutions.com", "info@nflexsolutions.com"),
    ("nflex_cart", "nflex_cart"),
    ("nflex-logo.png", "nflex-logo.png")
]

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            
        new_content = content
        for old, new in REPLACEMENTS:
            new_content = new_content.replace(old, new)
            
        if content != new_content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        pass

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.git' in root or 'dist' in root or 'scratch' in root:
            continue
        for file in files:
            if file.endswith(('.ts', '.tsx', '.json', '.html', '.md', '.cjs', '.xml', '.txt', '.py')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    walk_dir("/home/dm/Projects/nflex-solutions")
