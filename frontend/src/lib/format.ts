const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Africa/Niamey",
});

export function formatDate(iso: string | null): string {
  return iso ? dateFormatter.format(new Date(iso)) : "";
}

/** Découpe un texte brut en paragraphes (séparés par une ligne vide). Aucun HTML n'est interprété. */
export function toParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}
