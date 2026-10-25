import { Outlet } from "react-router";

import { buildMeta } from "~/lib/seo";
import { getSolution, listSolutions } from "~/services/api/content";

import type { SolutionDetail, SolutionSummary } from "~/types/api";
import type { Route } from "./+types/solutions-layout";

export type SolutionsRouteData =
  { solutions: SolutionSummary[]; solution: null } | { solutions: null; solution: SolutionDetail };

async function loadSolutionsRouteData(params: Route.LoaderArgs["params"]) {
  if (params.slug) {
    return { solutions: null, solution: await getSolution(params.slug) };
  }
  return { solutions: await listSolutions(), solution: null };
}

export async function loader({ params }: Route.LoaderArgs) {
  return loadSolutionsRouteData(params);
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  return loadSolutionsRouteData(params);
}
clientLoader.hydrate = true as const;

export function meta({ loaderData }: Route.MetaArgs) {
  if (loaderData.solution) {
    return buildMeta({
      title: loaderData.solution.name,
      description: loaderData.solution.summary,
      path: `/solutions/${loaderData.solution.slug}`,
      image: loaderData.solution.cover_image,
    });
  }
  return buildMeta({
    title: "Solutions",
    description: "Découvrez les solutions publiées par JACIGREEN.",
    path: "/solutions",
  });
}

export default function SolutionsLayout({ loaderData }: Route.ComponentProps) {
  return <Outlet context={loaderData} />;
}
