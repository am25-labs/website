import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/es/about", permanent: true },
      { source: "/brand", destination: "/es/brand", permanent: true },
      { source: "/cases", destination: "/es/cases", permanent: true },
      { source: "/cases/:slug", destination: "/es/cases/:slug", permanent: true },
      { source: "/notes", destination: "/es/notes", permanent: true },
      { source: "/notes/:slug", destination: "/es/notes/:slug", permanent: true },
      { source: "/contact", destination: "/es/contact", permanent: true },
      { source: "/contact/general", destination: "/es/contact/general", permanent: true },
      { source: "/content", destination: "/es/content", permanent: true },
      { source: "/privacy", destination: "/es/privacy", permanent: true },
      { source: "/terms", destination: "/es/terms", permanent: true },
      { source: "/copyright", destination: "/es/copyright", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://umami.am25.app https://challenges.cloudflare.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob: https://cms.am25.app https://cdn.am25.app https://d3t3ozftmdmh3i.cloudfront.net",
              "connect-src 'self' https://cms.am25.app https://cdn.am25.app https://umami.am25.app https://challenges.cloudflare.com https://cloudflareinsight https://n8n.am25.app",
              "media-src 'self'",
              "frame-src https://challenges.cloudflare.com https://www.youtube.com https://player.vimeo.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.am25.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.am25.app",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
