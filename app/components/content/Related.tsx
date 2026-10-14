import Link from "next/link";

export type RelatedLink = { href: string; label: string; description?: string };

/** "Related" links between search pages. */
export default function Related({ links, title = "Related" }: { links: RelatedLink[]; title?: string }) {
  if (!links.length) return null;
  return (
    <section className="related" aria-label={title}>
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label} →</Link>
            {l.description && <p>{l.description}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
