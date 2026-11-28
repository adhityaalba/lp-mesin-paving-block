"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUR } from "@/components/ui/icons";
import type { MachineLink } from "@/lib/content-schema";
import { waLink } from "@/lib/site";

/** No backend: composes a WhatsApp message from the form. */
export function ContactForm({ machines, defaultMachine = "" }: { machines: MachineLink[]; defaultMachine?: string }) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const city = String(f.get("city") ?? "").trim();
    const machine = String(f.get("machine") ?? "");
    if (!name) {
      setError("Isi nama Anda dulu.");
      return;
    }
    setError(null);
    const msg = [
      `Halo CV Multi Baja Technic, saya ${name}${city ? ` dari ${city}` : ""}.`,
      machine ? `Saya tertarik mesin ${machine}.` : "Saya ingin konsultasi mesin paving block.",
      String(f.get("note") ?? "").trim(),
    ]
      .filter(Boolean)
      .join(" ");
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 16, marginTop: 20 }}>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <label className="field">
          Nama
          <input name="name" autoComplete="name" aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} />
          {error && <span id={`${id}-err`} role="alert" className="err">{error}</span>}
        </label>
        <label className="field">
          Kota atau lokasi pabrik
          <input name="city" autoComplete="address-level2" />
        </label>
      </div>
      <label className="field">
        Mesin yang diminati
        <select name="machine" defaultValue={defaultMachine}>
          <option value="">Belum tahu, mohon rekomendasi</option>
          {machines.map((m) => (
            <option key={m.slug} value={`${m.code} (${m.nickname})`}>{m.code} · {m.nickname}</option>
          ))}
        </select>
      </label>
      <label className="field">
        Pesan
        <textarea name="note" rows={3} placeholder="Contoh: target 2.000 paving per hari, listrik 33 kVA" />
      </label>
      <button type="submit" className="pill wa" style={{ justifySelf: "start" }}>
        <span>Lanjut di WhatsApp</span>
        <span className="ico"><ArrowUR /></span>
      </button>
    </form>
  );
}
