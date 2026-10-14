import type { ReactNode } from "react";
import ContentPage from "./ContentPage";

export type LegalSection = { heading: string; body: ReactNode };

/**
 * Legal pages. All are DRAFTS that require legal review; they make no claim of
 * certification or compliance. "[To be confirmed]" marks decisions the owner must make.
 */
export default function LegalPage({ path, title, intro, updated, sections }: { path: string; title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <ContentPage crumbs={[{ name: title, path }]} eyebrow="Legal" title={title} intro={intro} updated={updated}>
      <div className="legal">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.body}
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
