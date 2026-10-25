import { Container } from "./Container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="border-b border-outline-variant bg-surface-container-low py-space-xl md:py-16">
      <Container>
        {eyebrow ? (
          <p className="font-label-md text-label-md font-semibold text-ochre-text uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 max-w-5xl font-headline-xl-mobile text-headline-xl-mobile md:font-headline-2xl md:text-headline-2xl">
          {title}
        </h1>
        {intro ? (
          <p className="mt-space-md max-w-reading font-body-lg text-body-lg text-on-surface-variant">
            {intro}
          </p>
        ) : null}
      </Container>
    </header>
  );
}
