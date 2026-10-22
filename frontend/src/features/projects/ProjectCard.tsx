import { Badge } from "~/components/ui/Badge";
import { DemoBadge } from "~/components/ui/DemoNotice";
import { MediaFrame } from "~/components/ui/MediaFrame";
import type { Project } from "~/types/api";

function period(project: Project): string {
  if (project.year_start && project.year_end && project.year_end !== project.year_start) {
    return `${project.year_start} – ${project.year_end}`;
  }
  return project.year_start ? String(project.year_start) : "";
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border border-hairline bg-surface-raised p-6">
      <MediaFrame
        src={project.cover_image}
        alt={project.cover_alt}
        aspect="4/3"
        icon="agriculture"
        className="mb-5"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{project.country_label}</Badge>
        <DemoBadge show={project.is_demo} />
        {period(project) ? (
          <span className="text-small text-ink-muted">{period(project)}</span>
        ) : null}
      </div>
      <h3 className="mt-4 text-h3">{project.title}</h3>
      <p className="mt-3 text-ink-muted">{project.summary}</p>
    </article>
  );
}
