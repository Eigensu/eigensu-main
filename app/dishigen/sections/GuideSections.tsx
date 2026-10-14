import Link from "next/link";
import { Container, Eyebrow } from "./shared";
import { INDUSTRIES } from "../../content/industries";
import { HOW_IT_WORKS, PRODUCT_QUESTIONS } from "../../content/product";

const STYLES = `
.dsp-guide{width:100%;padding:96px 0;background:var(--cream);}
.dsp-guide.alt{background:#fff;}
.dsp-guide h2{font:800 clamp(2rem,3.6vw,3.2rem)/1.02 var(--font-head);letter-spacing:-.035em;color:var(--wine);margin:0 0 14px;max-width:22ch;}
.dsp-guide .bd{font-size:1rem;line-height:1.65;color:var(--muted);max-width:60ch;margin:0 0 36px;}
.dsp-who{display:grid;gap:14px;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));}
.dsp-who a{display:block;background:#fff;border:2px solid var(--wine);border-radius:16px;padding:20px;text-decoration:none;color:var(--wine);transition:transform .2s ease,box-shadow .2s ease;}
.dsp-who a:hover{transform:translateY(-3px);box-shadow:0 12px 26px -12px rgba(59,10,34,.4);}
.dsp-who b{display:block;font:700 1.1rem var(--font-head);margin-bottom:6px;}
.dsp-who span{font-size:.88rem;line-height:1.5;color:var(--muted);}
.dsp-steps{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));counter-reset:step;list-style:none;padding:0;margin:0;}
.dsp-steps li{background:var(--cream);border-radius:18px;padding:24px;position:relative;}
.dsp-steps li::before{counter-increment:step;content:"0" counter(step);font:700 .8rem var(--font-mono);color:var(--ember);display:block;margin-bottom:12px;}
.dsp-steps h3{font:700 1.2rem var(--font-head);color:var(--wine);margin:0 0 8px;}
.dsp-steps p{font-size:.95rem;line-height:1.6;color:var(--muted);margin:0;}
.dsp-qa{max-width:820px;}
.dsp-qa h3{font:700 1.25rem var(--font-head);color:var(--wine);margin:28px 0 8px;}
.dsp-qa p{font-size:1rem;line-height:1.7;color:var(--wine-2);margin:0;}
`;

/** "Who it is for": the five industries, each linking to its page. */
export function WhoItsFor() {
  return (
    <section id="who-its-for" className="dsp-guide">
      <style>{STYLES}</style>
      <Container>
        <Eyebrow dot>WHO IT IS FOR</Eyebrow>
        <h2>Built for businesses that run on repeat visits.</h2>
        <p className="bd">If your customers come back on a rhythm, whether for a meal, a haircut, a workout, a check-up or a restock, Dishigen helps you message them at the right moment.</p>
        <div className="dsp-who">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/for/${i.slug}`}>
              <b>{i.label}</b>
              <span>{i.moments[0].heading}, {i.moments[1].heading.toLowerCase()} and more →</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** "How it works" in three steps. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="dsp-guide alt">
      <Container>
        <Eyebrow dot>HOW IT WORKS</Eyebrow>
        <h2>From customer list to campaign in three steps.</h2>
        <ol className="dsp-steps">
          {HOW_IT_WORKS.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** Questions and answers. Questions without a confirmed answer (TODO(owner)) are not shown. */
export function ProductQuestions() {
  const answered = PRODUCT_QUESTIONS.filter((q) => q.answer);
  if (!answered.length) return null;
  return (
    <section id="questions" className="dsp-guide">
      <Container>
        <Eyebrow dot>QUESTIONS</Eyebrow>
        <h2>Questions and answers.</h2>
        <div className="dsp-qa">
          {answered.map((q) => (
            <div key={q.q}>
              <h3>{q.q}</h3>
              <p>{q.answer}</p>
            </div>
          ))}
          <p style={{ marginTop: 28 }}>
            Costs are explained on <Link href="/pricing" style={{ color: "var(--ember)" }}>WhatsApp pricing in India</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
