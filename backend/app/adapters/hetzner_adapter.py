import time

print("[Hetzner Agent] Başladı", flush=True)

steps = [
    "VPS planı kontrol ediliyor",
    "Firewall kuralları hazırlanıyor",
    "Ubuntu imajı seçiliyor",
    "Docker kurulumu planlanıyor",
    "WordPress sunucu hazırlığı yapılıyor",
    "Hetzner hazırlığı tamamlandı"
]

for step in steps:
    print(f"[Hetzner Agent] {step}", flush=True)
    time.sleep(1)
