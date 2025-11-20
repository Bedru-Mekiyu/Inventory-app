/** @type {import('next').NextConfig} */
const nextConfig = {
  // This works for both Turbopack and Webpack in Next.js 16
  serverExternalPackages: ["@prisma/client"],
  // Optional but recommended if you ever use the Prisma CLI inside the project
  // experimental: {
  //   serverExternalPackages: ["prisma"] // only needed if you import from "prisma"
  // },
};

export default nextConfig;