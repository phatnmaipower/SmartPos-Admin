<template>
  <header class="header">
    <router-link class="logo" to="/">
      <img src="@/assets/logo.svg" alt="LOGO" />
    </router-link>
    <router-link class="profile" to="/admins/my-profile">
      <img src="@/assets/profile.svg" alt="PROFILE" />
    </router-link>
  </header>
</template>

<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<style lang="scss">
@import "@/scss/layoutDefault.scss";
.header {
  position: fixed;
  z-index: $zi-header;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.logo {
  padding-left: 20px;
}

.profile {
  margin-left: auto;
  padding-right: 20px;
}
</style>
