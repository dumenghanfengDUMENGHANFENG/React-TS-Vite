import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteEslint from "vite-plugin-eslint";
import vitePluginImp from "vite-plugin-imp";
import AutoImport from "unplugin-auto-import/vite";
import path from "path";
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => `antd/es/${name}/style`
          }
        ]
      }),
      viteEslint({
        failOnError: false
      }),
      AutoImport({
        imports: [
          "react",
          "react-router-dom",
          "mobx",
          "mobx-react-lite",
          {
            // "@/plugins/i18n": ["i18nt"], //自动导入i18nt方法不用再次注册or导入
            "@/apis/request": ["request"] //axios封装
          }
        ],
        dts: "src/types/auto-imports.d.ts", // 生成 `auto-import.d.ts` 全局声明
        dirs: [
          // "src/hooks"
          "src/public",
          "src/stores"
        ] //自动导入默认方法(constants全部变量,store/modules全局pinia)
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/style/index.scss';" // 全局公共样式
        }
      }
    },
    server: {
      open: false, // 是否自动在浏览器打开
      https: false, // 是否开启 https
      port: 3000, //启动端口
      host: "0.0.0.0",
      proxy: {
        "/api": env.VITE_APP_BASE_API //代理网址
      },
      cors: true
    },
    build: {
      sourcemap: false,
      minify: "terser",
      target: "modules", //浏览器兼容性modules|esnext
      assetsDir: "assets", // 指定生成静态资源的存放路径
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split("/")
              : [];
            const fileName =
              facadeModuleId[facadeModuleId.length - 2] || "[name]";
            return `assets/js/${fileName}/[name].[hash].js`;
          }
        }
      }
    }
  };
});
