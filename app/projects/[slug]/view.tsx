"use client";

import { useEffect } from "react";

/** Reports one page view for this project (deduplicated server-side). */
export function ReportView({ slug }: { slug: string }) {
  useEffect(() => {
    fetch("/api/incr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      // Read the (empty) body so the request completes instead of being cancelled.
      .then((res) => res.text())
      .catch(() => {
        /* analytics must never break the page */
      });
  }, [slug]);

  return null;
}
