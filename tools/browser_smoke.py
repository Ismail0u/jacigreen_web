"""Vérifications dans un vrai navigateur (Playwright, Python) : HTML sans JS, navigation, contact, mobile.

Prérequis : API de démonstration sur :8000, build servi sur :5173 (npm run serve:build),
pip install playwright && playwright install chromium. Non intégré à la CI (voir docs/quality/testing.md).
"""
import asyncio, json, re, urllib.request

API = "http://localhost:8000/api/v1"


def first(resource, key):
    with urllib.request.urlopen(f"{API}/{resource}/?page_size=2") as r:
        results = json.load(r)["results"]
    return results[0], results[1]


SOL1, SOL2 = first("solutions", "slug")
ART1, _ = first("articles", "slug")
from playwright.async_api import async_playwright

BASE="http://localhost:5173"
PAGES=["/","/a-propos","/solutions",f"/solutions/{SOL1['slug']}","/services","/realisations","/actualites",f"/actualites/{ART1['slug']}","/contact","/mentions-legales"]
res=[]
def ok(name, cond, detail=""):
    res.append((name,bool(cond),detail)); print(("OK  " if cond else "FAIL"), name, detail, flush=True)

async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(java_script_enabled=False)
        pg=await ctx.new_page()
        await pg.goto(BASE+f"/solutions/{SOL1['slug']}")
        ok("Sans JS : h1 de la fiche solution", SOL1["name"] in (await pg.inner_text("h1")))
        await pg.goto(BASE+"/actualites")
        n=await pg.locator("article").count()
        ok("Sans JS : articles listés", n>=3, str(n))
        await ctx.close()

        ctx=await b.new_context(viewport={"width":1440,"height":900})
        pg=await ctx.new_page()
        errors=[]; data_reqs=[]
        pg.on("console", lambda m: errors.append(m.text) if m.type=="error" else None)
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("request", lambda r: data_reqs.append(r.url) if ".data" in r.url else None)
        await pg.goto(BASE+"/"); await pg.wait_for_load_state("networkidle")
        await pg.get_by_role("navigation",name="Navigation principale").first.get_by_role("link",name="Solutions").click()
        await pg.wait_for_url("**/solutions")
        ok("Navigation client vers /solutions", pg.url.endswith("/solutions"))
        await pg.get_by_role("link",name=re.compile(re.escape(SOL2["name"]))).first.click()
        await pg.wait_for_url(f"**/solutions/{SOL2['slug']}")
        try:
            await pg.locator("h1", has_text=SOL2["name"]).wait_for(timeout=5000)
            arrived = True
        except Exception:
            arrived = False
        ok("Navigation client vers la fiche", arrived)
        ok("Fichiers .data statiques utilisés", any(".data" in u for u in data_reqs), str(len(data_reqs)))
        await pg.goto(BASE+"/realisations"); await pg.wait_for_load_state("networkidle")
        await pg.get_by_role("button",name="Burkina Faso").click()
        n=await pg.locator("article").count()
        ok("Filtre pays : 1 réalisation", n==1, str(n))
        await pg.goto(BASE+"/page-qui-nexiste-pas"); await pg.wait_for_load_state("networkidle")
        ok("URL inconnue : page 404 affichée", "Page introuvable" in (await pg.inner_text("h1")))
        ok("Aucune erreur console (desktop)", not errors, "; ".join(errors)[:300])
        await pg.goto(BASE+"/"); await pg.wait_for_load_state("networkidle")
        await pg.screenshot(path="/home/claude/shot-home-desktop.png", full_page=True)

        await pg.goto(BASE+"/contact"); await pg.wait_for_load_state("networkidle")
        await pg.get_by_role("button",name="Envoyer le message").click()
        ok("Contact : erreurs de validation affichées", await pg.get_by_text("Indiquez votre nom.").is_visible())
        await pg.get_by_label("Nom et prénom").fill("Test Automatisé")
        await pg.get_by_label("Adresse email").fill("test@example.test")
        await pg.get_by_label("Message").fill("Bonjour, ceci est un message de test automatisé du formulaire.")
        await pg.get_by_label(re.compile("J'accepte")).check()
        await pg.get_by_role("button",name="Envoyer le message").click()
        await pg.get_by_text("Merci, votre message a bien été transmis").wait_for(timeout=8000)
        ok("Contact : envoi réussi via l'API Django", True)
        await ctx.close()

        ctx=await b.new_context(viewport={"width":375,"height":800}, is_mobile=True)
        pg=await ctx.new_page()
        for path in PAGES:
            await pg.goto(BASE+path); await pg.wait_for_load_state("networkidle")
            w=await pg.evaluate("[document.documentElement.scrollWidth, document.documentElement.clientWidth]")
            ok(f"Mobile 375px sans débordement {path}", w[0]<=w[1], str(w))
        await pg.goto(BASE+"/"); await pg.wait_for_load_state("networkidle")
        await pg.get_by_role("button",name="Menu").click()
        v=await pg.get_by_role("button",name="Fermer").get_attribute("aria-expanded")
        ok("Menu mobile ouvert (aria-expanded)", v=="true", str(v))
        await pg.keyboard.press("Escape")
        v=await pg.get_by_role("button",name="Menu").get_attribute("aria-expanded")
        ok("Échap ferme le menu", v=="false", str(v))
        await pg.screenshot(path="/home/claude/shot-home-mobile.png", full_page=False)
        await ctx.close(); await b.close()
    bad=[r for r in res if not r[1]]
    print(f"\n{len(res)-len(bad)}/{len(res)} contrôles réussis", flush=True)
asyncio.run(main())
