import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/site-layout.tsx", [
    index("routes/home.tsx"),
    route("a-propos", "routes/about.tsx"),
    route("solutions", "routes/solutions-layout.tsx", [
      index("routes/solutions.tsx"),
      route(":slug", "routes/solution-detail.tsx"),
    ]),
    route("services", "routes/services.tsx"),
    route("realisations", "routes/projects.tsx"),
    route("actualites", "routes/news-layout.tsx", [
      index("routes/news.tsx"),
      route(":slug", "routes/article-detail.tsx"),
    ]),
    route("contact", "routes/contact.tsx"),
    route("mentions-legales", "routes/legal.tsx"),
    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
