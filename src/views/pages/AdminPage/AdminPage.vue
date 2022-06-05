<template>
  <the-header></the-header>
  <the-sidebar></the-sidebar>
  <router-view></router-view>
</template>
<script lang="ts" setup>
import TheHeader from "@/views/layouts/TheHeader.vue";
import TheSidebar from "@/views/layouts/TheSidebar.vue";
</script>
