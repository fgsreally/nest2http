import { defineConfig, } from "vite";
import pkg from './package.json'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    resolve: {
    },
    build: {
        outDir: "dist/server",
        lib: {
            formats: ["cjs"],
            entry: "src/server/main.ts",
        },
        rollupOptions: {
            external: Object.keys(pkg.dependencies),
        },
    },
});
