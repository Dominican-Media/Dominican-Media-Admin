import Dashboard from "@/assets/svgIcons/Dashboard";
import File from "@/assets/svgIcons/File";
import Group from "@/assets/svgIcons/Group";
import Photos from "@/assets/svgIcons/Photos";
import Services from "@/assets/svgIcons/Services";
import Shows from "@/assets/svgIcons/Shows";

export const routes = Object.freeze({
  BASE_URL: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  DASHBOARD: "/dashboard",
  BLOG: "/blog",
  SERVICES: "/services",
  SHOWS: "/shows",
  GALLERY: "/gallery",
  PRESENTERS: "/presenters",
  PROFILES: "/profiles",
  CREATE_BLOG: "/blog/create",
  PREVIEW_BLOG: "/blog/create/preview",
  EDIT_BLOG: "/blog/:id/edit",
});

export const dashboardRoutes = [
  {
    title: "Dashboard",
    route: routes.DASHBOARD,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <Dashboard />,
    roles: ["admin", "presenter", "author"],
    bounceRoute: routes?.DASHBOARD,
  },
  {
    title: "Blog",
    route: routes.BLOG,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <File />,
    roles: ["admin", "author"],
    bounceRoute: routes?.DASHBOARD,
  },
  {
    title: "Services",
    route: routes.SERVICES,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <Services />,
    roles: ["admin"],
    bounceRoute: routes?.DASHBOARD,
  },

  {
    title: "Shows",
    route: routes.SHOWS,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <Shows />,
    roles: ["admin", "presenter"],
    bounceRoute: routes?.DASHBOARD,
  },
  {
    title: "Profiles",
    route: routes.PROFILES,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <Group />,
    roles: ["admin"],
    bounceRoute: routes?.DASHBOARD,
  },
  {
    title: "Gallery",
    route: routes.GALLERY,
    properties: ["isProtected", "isSideNavRoute"],
    icon: <Photos />,
    roles: ["admin"],
    bounceRoute: routes?.DASHBOARD,
  },
];
