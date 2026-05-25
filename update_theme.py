import re

with open('src/index.css', 'r') as f:
    content = f.read()

# Replace variables
content = re.sub(r'--primary: 25 95% 53%;', '--primary: 217 91% 60%;', content)
content = re.sub(r'--accent: 25 95% 53%;', '--accent: 217 91% 60%;', content)
content = re.sub(r'--ring: 25 95% 53%;', '--ring: 217 91% 60%;', content)
content = re.sub(r'--sidebar-ring: 25 95% 53%;', '--sidebar-ring: 217 91% 60%;', content)
content = re.sub(r'--primary: 25 95% 55%;', '--primary: 217 91% 60%;', content)
content = re.sub(r'--accent: 25 95% 55%;', '--accent: 217 91% 60%;', content)
content = re.sub(r'--ring: 25 95% 55%;', '--ring: 217 91% 60%;', content)
content = re.sub(r'--amber-glow: 35 100% 55%;', '--amber-glow: 190 90% 50%;', content)
content = re.sub(r'--amber-subtle: 30 40% 94%;', '--amber-subtle: 190 40% 94%;', content)

# Replace hardcoded colors
content = content.replace('hsl(25 95% 53% / 0.15)', 'hsl(217 91% 60% / 0.15)')
content = content.replace('hsl(35 100% 55% / 0.08)', 'hsl(190 90% 50% / 0.08)')
content = content.replace('hsl(25 95% 53% / 0.15)', 'hsl(217 91% 60% / 0.15)') # in card-hover
content = content.replace('hsl(35 100% 55% / 0.2)', 'hsl(190 90% 50% / 0.2)')
content = content.replace('hsl(30 100% 55%), hsl(25 95% 45%)', 'hsl(190 90% 50%), hsl(217 91% 60%)')

with open('src/index.css', 'w') as f:
    f.write(content)

print("Updated index.css")
