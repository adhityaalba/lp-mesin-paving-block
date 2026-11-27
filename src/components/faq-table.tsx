import { Reveal } from "@/components/motion/reveal";

/** FAQ as a two-column table: question left, answer right, nothing hidden. */
export function FaqTable({ items, title = "Pertanyaan yang sering diajukan" }: { items: readonly { q: string; a: string }[]; title?: string }) {
  return (
    <section className="section wrap" aria-labelledby="faq-h">
      <div className="faq">
        <Reveal className="faq-row">
          <h2 id="faq-h">{title}</h2>
        </Reveal>
        {items.map((f) => (
          <Reveal key={f.q} className="faq-row">
            <h3>{f.q}</h3>
            <p>{f.a}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
