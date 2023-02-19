import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import compress from "astro-compress";
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    compress(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
  vite: {
    ssr: {
      noExternal: ["devicon"],
    },
  },
});
