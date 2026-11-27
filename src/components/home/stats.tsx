import { Counter, Item, Stagger } from "@/components/motion/reveal";

const STATS = [
  { to: 500, prefix: "K", label: "Kuat tekan hasil cetak" },
  { to: 1, suffix: " thn", label: "Garansi spare part & service" },
  { to: 30, suffix: "%", label: "Down payment saja" },
  { to: 3, suffix: " tipe", label: "Mesin semi-automatic" },
];

export function Stats() {
  return (
    <section className="shell" style={{ paddingTop: "clamp(56px, 7vw, 100px)" }}>
      <Stagger className="stats inner">
        {STATS.map((s) => (
          <Item key={s.label}>
            <b className="tnum">
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </b>
            <span className="label">{s.label}</span>
          </Item>
        ))}
      </Stagger>
    </section>
  );
}
