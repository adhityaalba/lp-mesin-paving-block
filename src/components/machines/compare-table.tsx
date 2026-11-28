import { compareRows, getMachines } from "@/lib/machines";

/** Plain comparison table; the highlighted column is the machine in focus (if any). */
export async function CompareTable({ focus }: { focus?: string }) {
  const machines = await getMachines();
  return (
    <div className="table-wrap">
      <table className="compare">
        <caption className="sr-only">Perbandingan spesifikasi mesin paving block RH1E15, RH1S12, dan HR6E12</caption>
        <thead>
          <tr>
            <th scope="col">Spesifikasi</th>
            {machines.map((m) => (
              <th key={m.slug} scope="col" className={focus === m.slug ? "us" : undefined}>
                {m.nickname}
                <b>{m.code}</b>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareRows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {machines.map((m) => (
                <td key={m.slug} className={`tnum ${focus === m.slug ? "us" : ""}`}>
                  {row.get(m)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
