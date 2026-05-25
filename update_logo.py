import re
import os

# Update Navbar.tsx
with open('src/components/Navbar.tsx', 'r') as f:
    content = f.read()

if 'import elcoLogo from "@/assets/elco.jpeg";' not in content:
    content = content.replace('import { Button } from "@/components/ui/button";', 'import { Button } from "@/components/ui/button";\nimport elcoLogo from "@/assets/elco.jpeg";')

content = content.replace('src="/nflex-logo.png"', 'src={elcoLogo}')
content = content.replace('alt="NFlex Solutions"', 'alt="ELCO Automation"')

with open('src/components/Navbar.tsx', 'w') as f:
    f.write(content)

# Update Footer.tsx
with open('src/components/Footer.tsx', 'r') as f:
    content = f.read()

if 'import elcoLogo from "@/assets/elco.jpeg";' not in content:
    content = content.replace('import { Link } from "react-router-dom";', 'import { Link } from "react-router-dom";\nimport elcoLogo from "@/assets/elco.jpeg";')

content = content.replace('src="/nflex-logo.png"', 'src={elcoLogo}')
content = content.replace('alt="NFlex Solutions Logo"', 'alt="ELCO Automation Logo"')

with open('src/components/Footer.tsx', 'w') as f:
    f.write(content)

# Update JsonLd.tsx
with open('src/components/JsonLd.tsx', 'r') as f:
    content = f.read()

content = content.replace('logo: `${SITE_URL}/nflex-logo.png`', 'logo: `${SITE_URL}/elco.jpeg`')
# Copy elco.jpeg to public/elco.jpeg for the absolute URL to work
os.system('cp src/assets/elco.jpeg public/elco.jpeg')

with open('src/components/JsonLd.tsx', 'w') as f:
    f.write(content)

print("Updated logos")
