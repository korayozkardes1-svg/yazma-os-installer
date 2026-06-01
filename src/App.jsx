import { useEffect, useState } from "react";

export default function App() {
  const [connectors, setConnectors] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/connectors")
      .then((r) => r.json())
      .then((d) => setConnectors(d))
      .catch(console.error);
  }, []);

  async function runInstall(name) {
    const res = await fetch(
      `http://localhost:8000/install/${name}`,
      { method: "POST" }
    );

    const data = await res.json();

    setLogs((prev) => [
      `${data.connector}: ${data.status}`,
      ...prev,
    ]);
  }

  return (
    <div
      style={{
        background: "#020617",
        color: "#e5e7eb",
        minHeight: "100vh",
        padding: "24px",
        fontFamily: "Arial",
      }}
    >
      <h1>YAZMA OS Installer Agent</h1>

      <p>Koray Ozkardes Media kurulum paneli aktif.</p>

      <section style={card}>
        <h2>Kurulum İşlemleri</h2>

        <button
          style={btn}
          onClick={() => runInstall("cloudflare")}
        >
          Cloudflare Kur
        </button>

        <button
          style={btn}
          onClick={() => runInstall("hetzner")}
        >
          Hetzner Kur
        </button>

        <button
          style={btn}
          onClick={() => runInstall("wordpress")}
        >
          WordPress Kur
        </button>
      </section>

      {connectors && (
        <section style={card}>
          <h2>Connector Durumu</h2>

          {Object.values(connectors).map((item) => (
            <div key={item.name}>
              <h3>{item.name}</h3>

              <ul>
                {item.tasks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <section style={card}>
        <h2>Kurulum Logları</h2>

        {logs.length === 0 && (
          <p>Henüz işlem çalıştırılmadı.</p>
        )}

        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </section>
    </div>
  );
}

const card = {
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "14px",
  padding: "16px",
  marginTop: "16px",
};

const btn = {
  padding: "12px",
  margin: "6px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};
