import { defineConfig } from "@vue/cli-service";
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/scss/layoutDefault.scss";
        `,
      },
    },
  },
});
