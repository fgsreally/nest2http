import { defineConfig } from 'vite'
import { unplugin } from 'nest2http/node'
export default defineConfig(
    {
        plugins: [unplugin.vite()],
        optimizeDeps: {
            exclude: []
        }
    }
)