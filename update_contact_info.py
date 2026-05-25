import os

OLD_PHONE_FORMATTED = "+91 9873100982"
OLD_PHONE_HREF = "+919873100982"
OLD_PHONE_RAW = "9873100982"

NEW_PHONE_FORMATTED = "+91 87561 70309"
NEW_PHONE_HREF = "+918756170309"
NEW_PHONE_RAW = "8756170309"

OLD_ADDRESS_SINGLE = "B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India, 201015"
OLD_ADDRESS_SINGLE_2 = "B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India,\n                  201015"
OLD_ADDRESS_MULTI = "B30/4 Wave Executive Floor, Wave City\n                          <br />\n                          Ghaziabad, UP, India, 201015"

NEW_ADDRESS = "Midtown, T5 504, Sector 59, Gurgaon, 122001"

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    original = content
    content = content.replace(OLD_PHONE_FORMATTED, NEW_PHONE_FORMATTED)
    content = content.replace(OLD_PHONE_HREF, NEW_PHONE_HREF)
    content = content.replace(OLD_PHONE_RAW, NEW_PHONE_RAW)
    
    # Handle variations of the address
    content = content.replace("B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India, 201015", NEW_ADDRESS)
    content = content.replace("B30/4 Wave Executive Floor, Wave City, Ghaziabad, UP, India,\n                  201015", NEW_ADDRESS)
    content = content.replace("B30/4 Wave Executive Floor, Wave City\n                          <br />\n                          Ghaziabad, UP, India, 201015", NEW_ADDRESS)
    
    # regex for the address with lots of spaces/newlines
    import re
    content = re.sub(r"B30/4 Wave Executive Floor, Wave City,\s*Ghaziabad, UP, India,\s*201015", NEW_ADDRESS, content)
    content = re.sub(r"B30/4 Wave Executive Floor, Wave City\s*<br />\s*Ghaziabad, UP, India, 201015", "Midtown, T5 504, Sector 59, Gurgaon\n                          <br />\n                          122001", content)
    content = re.sub(r"Ghaziabad, India", "Gurgaon, India", content)

    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            process_file(os.path.join(root, file))

