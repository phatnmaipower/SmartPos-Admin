<template>
  <router-view />
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router";
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap");
@import "@/scss/layoutDefault.scss";

*,
*:before,
*:after {
  box-sizing: border-box;
  font-family: "Noto Sans JP", sans-serif;
  margin: 0;
  padding: 0;
}

body {
  min-width: $min-screen-width;
  // min-height: $min-screen-height;
}
</style>
