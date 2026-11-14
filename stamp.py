#!/usr/bin/env python3
"""Run this before every commit that changes any .js / .css / .html file.
It puts a fresh version stamp on every script and stylesheet link, so a browser can never keep serving an old copy."""
import re, time

root = __file__.rsplit('/', 1)[0] + '/'
stamp = time.strftime('%y%m%d%H%M')

def tag(path):
    p = root + path
    s = open(p).read()
    # <script src="x.js"> and <script src="x.js?v=..."> / <link href="assets/x.css">
    s = re.sub(r'(<script src="(?:config\.js|assets/[A-Za-z0-9_.-]+\.js))(?:\?v=\w+)?(")', r'\1?v=' + stamp + r'\2', s)
    s = re.sub(r'(<link rel="stylesheet" href="assets/[A-Za-z0-9_.-]+\.css)(?:\?v=\w+)?(")', r'\1?v=' + stamp + r'\2', s)
    s = re.sub(r'(window\.GCG_VERSION = ")[^"]*(";)', r'\g<1>' + stamp + r'\2', s)
    open(p, 'w').write(s)

for f in ('host.html', 'screen.html', 'play.html', 'join.html'):
    try:
        tag(f)
    except FileNotFoundError:
        pass
print('stamped', stamp)
