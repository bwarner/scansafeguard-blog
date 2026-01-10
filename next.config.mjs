import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  basePath: "/blog",
};

const withMDX = createMDX({
  // Don't use @mdx-js/react provider - causes RSC issues
});

export default withMDX(nextConfig);
