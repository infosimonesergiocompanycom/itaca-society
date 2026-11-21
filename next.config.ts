import type { NextConfig } from "next";

/**
 * BUILD_TARGET=cpanel produce un pacchetto autonomo (output "standalone") per l'hosting
 * con "Setup Node.js App": nessuna compilazione sul server e immagini servite già pronte,
 * senza dipendere dalla libreria nativa di ottimizzazione delle immagini.
 */
const cpanel = process.env.BUILD_TARGET === "cpanel";

const nextConfig: NextConfig = {
  ...(cpanel ? { output: "standalone" as const } : {}),
  // Driver del database caricati come pacchetti Node, non inclusi nel bundle
  serverExternalPackages: ["@electric-sql/pglite", "pg"],
  images: {
    unoptimized: cpanel,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/portal", destination: "/area-soci", permanent: false },
      { source: "/membership/candidatura", destination: "/diventa-socio", permanent: false },
      { source: "/luoghi", destination: "/formati", permanent: false },
      { source: "/formati/retreats", destination: "/formati", permanent: false },
      { source: "/luoghi/:slug", destination: "/formati", permanent: false },
    ];
  },
};

export default nextConfig;
