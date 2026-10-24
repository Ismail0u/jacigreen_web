import { Badge } from "~/components/ui/Badge";
import { DemoBadge } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import { Prose } from "~/components/ui/Prose";
import type { Project } from "~/types/api";

function period(project: Project): string {
  if (project.year_start && project.year_end && project.year_end !== project.year_start) {
    return `${project.year_start} – ${project.year_end}`;
  }
  return project.year_start ? String(project.year_start) : "";
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-t-2 border-on-tertiary-container bg-surface-container-lowest pb-space-lg">
      <MediaFrame
        src={project.cover_image}
        alt={project.cover_alt}
        aspect="4/3"
        icon="agriculture"
        className="border-0"
      />
      <div className="flex flex-wrap items-center gap-space-sm px-space-lg pt-space-lg">
        <Badge>{project.country_label}</Badge>
        <DemoBadge show={project.is_demo} />
        {period(project) ? (
          <span className="font-code-technical text-code-technical text-on-surface-variant">
            {period(project)}
          </span>
        ) : null}
      </div>
      <h3 className="mt-space-md px-space-lg font-headline-md text-headline-md">{project.title}</h3>
      <p className="mt-space-md px-space-lg font-body-md text-body-md text-on-surface-variant">
        {project.summary}
      </p>
      {project.description.trim() ? (
        <details className="mt-space-md px-space-lg">
          <summary className="min-h-11 cursor-pointer py-2 font-label-md text-label-md font-semibold text-primary-container underline-offset-4 hover:underline">
            Lire la description détaillée
          </summary>
          <div className="pt-space-sm">
            <Prose text={project.description} />
          </div>
        </details>
      ) : null}
    </article>
  );
}
