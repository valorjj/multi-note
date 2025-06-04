import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            '/api': 'http://localhost:8080' // proxy to Spring Boot backend
        },
    },
    plugins: [react()],
})
