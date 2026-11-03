import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/profile_/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Afterfive" },
      { name: "description", content: "Account, security and app settings for Afterfive." },
      { property: "og:title", content: "Settings — Afterfive" },
      { property: "og:description", content: "Manage your Afterfive account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Outlet,
});
