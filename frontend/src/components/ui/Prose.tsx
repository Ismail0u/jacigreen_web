import { toParagraphs } from "~/lib/format";

/** Affiche un texte brut en paragraphes. Le contenu est échappé par React : aucun HTML injecté. */
export function Prose({ text }: { text: string }) {
  return (
    <div className="max-w-reading space-y-5 font-serif text-lead text-ink">
      {toParagraphs(text).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
