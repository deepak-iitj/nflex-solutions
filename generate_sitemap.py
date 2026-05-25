import json
import re
from datetime import datetime

with open('src/data/products.ts', 'r') as f:
    content = f.read()

# Extract IDs
# Matches { id: "el1" ... }
ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)

# Create sitemap.xml
SITE_URL = "https://nflexsolutions.com"
today = datetime.now().strftime("%Y-%m-%d")

urls = [
    f"<url><loc>{SITE_URL}/</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>",
    f"<url><loc>{SITE_URL}/about</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>",
    f"<url><loc>{SITE_URL}/products</loc><lastmod>{today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>",
    f"<url><loc>{SITE_URL}/contact</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>",
    f"<url><loc>{SITE_URL}/case-studies</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>"
]

for pid in ids:
    if pid.startswith("custom_"): continue # skip dynamic
    urls.append(f"<url><loc>{SITE_URL}/products/{pid}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>")

sitemap = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ' + '\n  '.join(urls) + '\n</urlset>'

with open('public/sitemap.xml', 'w') as f:
    f.write(sitemap)

robots = f"""User-agent: *
Allow: /

Sitemap: {SITE_URL}/sitemap.xml
"""

with open('public/robots.txt', 'w') as f:
    f.write(robots)

print("Generated sitemap.xml and robots.txt")
