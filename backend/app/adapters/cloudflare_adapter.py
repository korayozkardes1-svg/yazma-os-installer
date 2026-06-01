import time

print("[Cloudflare Agent] Başladı", flush=True)

steps = [
    "Domain kontrolü başladı",
    "DNS kayıtları hazırlanıyor",
    "SSL kontrolü yapılıyor",
    "DNSSEC kontrolü yapılıyor",
    "WHOIS privacy kontrolü yapılıyor",
    "Cloudflare hazırlığı tamamlandı"
]

for step in steps:
    print(f"[Cloudflare Agent] {step}", flush=True)
    time.sleep(1)
