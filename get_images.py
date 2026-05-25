import urllib.request
import re
import json

url = "https://www.elcoautomation.com/en-in/product/sensors.html"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'src="([^"]+)"[^>]*?alt="([^"]+)"\s*class="img2"', html, re.IGNORECASE)
    results = []
    base_url = "https://www.elcoautomation.com"
    for src, title in matches:
        img_url = base_url + src if src.startswith('/') else src
        filename = src.split('/')[-1].replace(' ', '_').replace('\xa0', '_')
        local_path = f"public/products/elco/{filename}"
        results.append({"title": title.replace('\xa0', ' '), "url": img_url, "local": local_path})
        try:
            urllib.request.urlretrieve(img_url, local_path)
            print(f"Downloaded: {img_url} -> {local_path}")
        except Exception as e:
            print(f"Failed to download {img_url}: {e}")
            
    print(json.dumps(results, indent=2))
except Exception as e:
    print("Error:", e)
