import Image from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";
import {
  type ComponentPropsWithoutRef,
  createElement,
} from "react";

const cx = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(" ");

type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

function heading(tag: Level, base: string) {
  return function Heading({ className, ...props }: ComponentPropsWithoutRef<"h1">) {
    return createElement(tag, { ...props, className: cx(base, className) });
  };
}

const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

const components = {
  // The project header already renders the page's <h1>, so a "# Heading" in
  // the MDX becomes an <h2> (same big look) to keep one h1 per page.
  h1: heading("h2", "mt-2 scroll-m-20 text-4xl font-semibold tracking-tight"),
  h2: heading(
    "h2",
    "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  ),
  h3: heading("h3", "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"),
  h4: heading("h4", "mt-8 scroll-m-20 text-xl font-semibold tracking-tight"),
  h5: heading("h5", "mt-8 scroll-m-20 text-lg font-semibold tracking-tight"),
  h6: heading("h6", "mt-8 scroll-m-20 text-base font-semibold tracking-tight"),
  a: ({ href = "", className, children, ...props }: ComponentPropsWithoutRef<"a">) => {
    const classes = cx("font-medium text-accent underline underline-offset-4", className);
    if (isExternal(href)) {
      return (
        <a {...props} href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    if (href.startsWith("#")) {
      return (
        <a {...props} href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  },
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cx("leading-7 [&:not(:first-child)]:mt-6", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cx("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cx("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cx("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cx("mt-6 border-l-2 pl-6 italic text-muted [&>*]:text-muted", className)}
      {...props}
    />
  ),
  // Plain <img> on purpose: README screenshots are remote and arbitrary-sized.
  img: ({ className, alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    <img
      {...props}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cx("rounded-xl border", className)}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cx("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr className={cx("m-0 border-t p-0 even:bg-fg/5", className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cx(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={cx(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cx("mb-4 mt-6 overflow-x-auto rounded-2xl bg-zinc-900 py-4", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cx(
        "relative rounded-md border bg-fg/10 px-1.5 py-0.5 font-mono text-[0.9em] text-fg",
        className,
      )}
      {...props}
    />
  ),
  Image,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
