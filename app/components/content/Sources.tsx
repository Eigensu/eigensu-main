import type { Source } from "../../content/facts";
import { formatDate } from "../../content/facts";

/** Source list shown under any figure, price or third-party claim. */
export default function Sources({ sources, asOf, title = "Sources" }: { sources: Source[]; asOf?: string; title?: string }) {
  const unique = sources.filter((s, i) => sources.findIndex((x) => x.url === s.url) === i);
  return (
    <aside className="sources" aria-label={title}>
      <h2 className="sources-title">{title}</h2>
      {asOf && <p className="sources-asof">Figures as of {formatDate(asOf)}.</p>}
      <ul>
        {unique.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
