import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

/** The one full red block: the first step is already open on the right. */
export function Cta({
  title = "Mulai pabrik paving Anda",
  body = "Free 1 set cetakan untuk setiap pembelian. DP cukup 30%, sisanya dibayar saat mesin siap dikirim.",
  defaultMachine,
}: {
  title?: string;
  body?: string;
  defaultMachine?: string;
}) {
  return (
    <section className="cta" aria-labelledby="cta-h">
      <Reveal className="cta-l">
        <h2 id="cta-h">{title}</h2>
        <p>{body}</p>
        <p style={{ marginTop: 14, fontSize: 15 }}>
          Atau telepon langsung{" "}
          <a href={`tel:+${site.phoneRaw}`} style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
            {site.phone}
          </a>
        </p>
      </Reveal>
      <Reveal className="cta-r" delay={0.1}>
        <div className="dialog-ui">
          <h3>Konsultasi gratis</h3>
          <p className="sub">Isi singkat. Pesan Anda langsung terbuka di WhatsApp kami.</p>
          <ContactForm defaultMachine={defaultMachine} />
        </div>
      </Reveal>
    </section>
  );
}
