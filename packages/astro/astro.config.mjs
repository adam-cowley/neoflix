import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: defineConfig({
    ssr: {
      external: ['neo4j-driver']
    }
  }),
  integrations: [react()]
});