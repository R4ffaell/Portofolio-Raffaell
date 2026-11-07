import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	// Lets a test build run next to `next dev` without clobbering its cache.
	distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default withContentlayer(nextConfig);
