import urllib.request
import re
try:
    req = urllib.request.Request('https://unsplash.com/s/photos/digestion', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'"id":"([a-zA-Z0-9_-]{11})"', html)
    if match:
        print(match.group(1))
    else:
        print("Not found")
except Exception as e:
    print(e)
