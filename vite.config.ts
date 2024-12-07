import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import webExtension from "@samrum/vite-plugin-web-extension";
import path from "path";
import { getManifest } from "./src/manifest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), "");
  const MANIFEST_VERSION = 3;

  return {
    plugins: [
      vue(),
      webExtension({
        // manifest: getManifest(Number(env.MANIFEST_VERSION)),
        manifest: getManifest(MANIFEST_VERSION),
        useDynamicUrlWebAccessibleResources: false,
        optimizeWebAccessibleResources: true
      }),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
