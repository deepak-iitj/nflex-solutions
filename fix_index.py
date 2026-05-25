import os

filepath = 'index.html'
try:
    with open(filepath, 'r') as f:
        content = f.read()
        
    content = content.replace("ELCO Automation Sensors & Solutions", "NFlex Solutions")
    content = content.replace("ELCO Automation Solutions", "NFlex Solutions")
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")
except Exception as e:
    pass
