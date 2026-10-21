import { Container } from "./Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="border-b border-hairline bg-surface-alt py-12 md:py-16">
      <Container>
        {eyebrow ? (
          <p className="font-display text-label font-semibold tracking-(--tracking-label) text-ochre-text uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-h1 md:text-display">{title}</h1>
        {intro ? <p className="mt-5 max-w-reading text-lead text-ink-muted">{intro}</p> : null}
      </Container>
    </header>
  );
}
