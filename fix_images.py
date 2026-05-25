import urllib.request
import urllib.parse

failed = [
  ("https://www.elcoautomation.com/en-us/upload/contents/2025/11/ELCO_Measurement Sensors_V1.1.jpg", "public/products/elco/ELCO_Measurement_Sensors_V1.1.jpg"),
  ("https://www.elcoautomation.com/en-us/upload/contents/2025/11/ELCO_Fiber-optic sensors.jpg", "public/products/elco/ELCO_Fiber-optic_sensors.jpg"),
  ("https://www.elcoautomation.com/en-us/upload/contents/2026/04/ELCO_Color-Color Mark Sensors.png", "public/products/elco/ELCO_Color-Color_Mark_Sensors.png")
]

req_headers = {'User-Agent': 'Mozilla/5.0'}
for url, local in failed:
    safe_url = urllib.parse.quote(url, safe=":/_.-")
    req = urllib.request.Request(safe_url, headers=req_headers)
    try:
        data = urllib.request.urlopen(req).read()
        with open(local, 'wb') as f:
            f.write(data)
        print("Downloaded:", safe_url)
    except Exception as e:
        print("Failed:", safe_url, e)
