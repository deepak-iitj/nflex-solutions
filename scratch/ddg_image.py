import urllib.request
import urllib.parse
import re
import json

def get_image(query):
    try:
        url = f"https://duckduckgo.com/?q={urllib.parse.quote(query)}&t=h_&iar=images&iax=images&ia=images"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        
        # DDG images load via a token now, we need to hit the vqd endpoint
        vqd_match = re.search(r'vqd=([\d-]+)', html)
        if not vqd_match: return None
        vqd = vqd_match.group(1)
        
        api_url = f"https://duckduckgo.com/i.js?q={urllib.parse.quote(query)}&o=json&p=1&s=0&u=bing&f=,,,,,&l=us-en&vqd={vqd}"
        req_api = urllib.request.Request(api_url, headers={'User-Agent': 'Mozilla/5.0'})
        resp = urllib.request.urlopen(req_api).read().decode('utf-8')
        data = json.loads(resp)
        if 'results' in data and len(data['results']) > 0:
            return data['results'][0]['image']
    except Exception as e:
        print("Error:", e)
    return None

print("EUCHNER MGB Image:", get_image("EUCHNER MGB Safety Switch site:euchner.de"))
print("SICK W16 Image:", get_image("SICK W16 Photoelectric Sensor site:sick.com"))
