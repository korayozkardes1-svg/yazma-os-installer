const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

const connectors = {
  cloudflare: {
    name: "Cloudflare",
    status: "ready",
    tasks: ["Domain kontrolü", "DNS kayıtları", "SSL", "DNSSEC", "WHOIS privacy"]
  },
  hetzner: {
    name: "Hetzner",
    status: "ready",
    tasks: ["VPS planı", "Firewall", "Ubuntu", "Docker", "WordPress hazırlığı"]
  },
  wordpress: {
    name: "WordPress",
    status: "ready",
    tasks: ["Sayfalar", "Menü", "Tema", "SEO yapılandırması", "Taslak yayın akışı"]
  }
};

function runAgent(agentFile) {
  const agent = spawn("python", [`../backend/app/adapters/${agentFile}`]);

  agent.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  agent.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  agent.on("close", (code) => {
    console.log(`[Agent] Süreç tamamlandı. Çıkış kodu: ${code}`);
  });
}

app.get("/", (req, res) => {
  res.json({
    status: "running",
    project: "YAZMA OS Installer Agent",
    message: "Backend aktif"
  });
});

app.get("/connectors", (req, res) => {
  res.json(connectors);
});

app.get("/installer/plan", (req, res) => {
  res.json({
    brand: "Koray Ozkardes Media",
    subBrand: "Digital Noir",
    domain: "korayozkardes.com",
    connectors,
    policy: {
      autoPublish: false,
      approvalRequired: true,
      passwordStorage: false
    }
  });
});

app.post("/install/cloudflare", (req, res) => {
  console.log("Cloudflare kurulumu tetiklendi");
  runAgent("cloudflare_adapter.py");

  res.json({
    success: true,
    connector: "Cloudflare",
    status: "Kurulum başlatıldı"
  });
});

app.post("/install/hetzner", (req, res) => {
  console.log("Hetzner kurulumu tetiklendi");
  runAgent("hetzner_adapter.py");

  res.json({
    success: true,
    connector: "Hetzner",
    status: "VPS hazırlığı başlatıldı"
  });
});

app.post("/install/wordpress", (req, res) => {
  console.log("WordPress kurulumu tetiklendi");
  runAgent("wordpress_adapter.py");

  res.json({
    success: true,
    connector: "WordPress",
    status: "WordPress hazırlığı başlatıldı"
  });
});

app.listen(8000, "0.0.0.0", () => {
  console.log("YAZMA OS backend running on http://0.0.0.0:8000");
});
