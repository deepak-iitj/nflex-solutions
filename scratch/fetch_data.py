import urllib.request
import urllib.parse
import re
import json

products = [
    {"brand": "EUCHNER", "model": "MGB-L1-ARA", "desc": "Multifunctional Gate Box for safety doors"},
    {"brand": "EUCHNER", "model": "CES-AR-C01", "desc": "Non-contact safety switch with RFID"},
    {"brand": "EUCHNER", "model": "EKS Electronic-Key-System", "desc": "Access control and mode selection system"},
    {"brand": "SICK", "model": "W16 Photoelectric Sensor", "desc": "Smart photoelectric sensor with BluePilot"},
    {"brand": "SICK", "model": "DFS60 Incremental Encoder", "desc": "High-resolution programmable encoder"},
    {"brand": "SICK", "model": "microScan3 Safety Laser Scanner", "desc": "Reliable safety scanner with safeHDDM technology"}
]

req_headers = {'User-Agent': 'Mozilla/5.0'}

for p in products:
    # 1. Try to find a PDF
    query = urllib.parse.quote(f"{p['brand']} {p['model']} datasheet filetype:pdf")
    url = f"https://html.duckduckgo.com/html/?q={query}"
    try:
        req = urllib.request.Request(url, headers=req_headers)
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'href="(//duckduckgo\.com/l/\?uddg=([^"]+))"', html)
        if match:
            real_url = urllib.parse.unquote(match.group(2))
            p['pdf'] = real_url
        else:
            p['pdf'] = None
    except:
        p['pdf'] = None

    # 2. Try to find an image (just use a placeholder for now to see if the script runs)
    # Actually finding images reliably without an API is hard, I will use Wikimedia or similar if possible,
    # or just direct image search URL.
    pass

print(json.dumps(products, indent=2))
