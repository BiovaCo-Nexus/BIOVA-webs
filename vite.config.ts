import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "Logo.png", "robots.txt"],
      manifest: {
        name: "BiovaCo Nexus",
        short_name: "BiovaCo",
        description: "An innovation house built for the long horizon.",
        theme_color: "#032E63",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/Logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
