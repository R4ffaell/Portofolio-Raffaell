import { site } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 text-center text-xs text-muted">
      © {new Date().getFullYear()} {site.fullName}. All rights reserved.
    </footer>
  );
}
