# Portofolio-Raffaell

Personal portfolio of Anakta Raffaell Tambunan, live at <https://portofolio-raffaell.vercel.app>.

Built with [Next.js 13](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/),
[Contentlayer](https://www.contentlayer.dev/) (MDX project pages) and optional
[Upstash Redis](https://upstash.com/) page-view counters. Light and dark themes, deployed on Vercel.

## Run locally

```sh
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

Copy `.env.example` to `.env` to enable view counters. They are optional: without them the site
works and the counters are hidden.

## Where things live

| To change…                             | Edit                                              |
| -------------------------------------- | ------------------------------------------------- |
| Name, email, social links, resume link | `app/lib/site.ts`                                 |
| CV: jobs, education, skills, stats     | `app/lib/profile.ts`                              |
| A project page                         | `content/projects/*.mdx` (front matter + content) |
| Colors / light + dark theme            | CSS variables at the top of `global.css`          |

Project front matter: `title`, `description`, `date`, `published`, `featured`, `url`, `repository`
(`owner/repo`) and `image` (a `/images/...` file in `public/`, or an image URL). Set
`published: false` to hide a project everywhere.
