import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(async () => {
  const plugins = [react()]

  // 只在开发环境加载 Kimi 检查插件，避免生产构建报错
  if (process.env.NODE_ENV !== "production") {
    const { inspectAttr } = await import("kimi-plugin-inspect-react")
    plugins.unshift(inspectAttr())
  }

  return {
    base: "./",
    plugins,
    server: {
      port: 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
