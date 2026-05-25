import urllib.request
import re

url = "https://www.sick.com/de/en/catalog/products/safety-switches/safety-locking-devices/transponder-safety-switches/tr10-lock/tr10-slm01c/p/p413812"
req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

try:
    req = urllib.request.Request(url, headers=req_headers)
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Scraped length:", len(html))
    
    # Try finding image
    img = re.search(r'property="og:image" content="([^"]+)"', html)
    if img: print("Image:", img.group(1))
    
    # Try finding PDF
    pdf = re.search(r'href="([^"]+\.pdf)"', html)
    if pdf: print("PDF:", pdf.group(1))
    
except Exception as e:
    print("Error:", e)
