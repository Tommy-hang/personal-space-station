
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 950})
    pg.goto("http://localhost:8932/knowledge/aero-urban-gnss", wait_until="networkidle")
    pg.wait_for_timeout(800)
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(7000)
    pg.screenshot(path="/mnt/agents/output/giscus-live.png")
    print("frames:", [f.url for f in pg.frames])
    b.close()
print("done")
