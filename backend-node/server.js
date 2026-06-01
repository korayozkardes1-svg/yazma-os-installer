const express = require("express");
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.json({ status: "running", project: "YAZMA OS Installer Agent" });
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

app.listen(8000, "0.0.0.0", () => {
  console.log("YAZMA OS backend running on http://0.0.0.0:8000");
});
app.post("/install/cloudflare", (req, res) => {
  res.json({
    success: true,
    connector: "Cloudflare",
    status: "Kurulum başlatıldı"
  });
});

app.post("/install/hetzner", (req, res) => {
  res.json({
    success: true,
    connector: "Hetzner",
    status: "VPS hazırlığı başlatıldı"
  });
});

app.post("/install/wordpress", (req, res) => {
  res.json({
    success: true,
    connector: "WordPress",
    status: "WordPress hazırlığı başlatıldı"
  });
});
