from fastapi import FastAPI

app = FastAPI(
    title="Yazma OS Installer",
    version="1.0.0"
)

@app.get("/")
def root():
    return {
        "status": "running",
        "project": "Yazma OS Installer Agent"
    }

@app.get("/health")
def health():
    return {
        "ok": True
    }
