<template>
  <header class="header">
    <a class="logo" href="#">
      <img src="@/assets/logo.svg" alt="LOGO" />
    </a>
    <a class="profile" href="#">
      <img src="@/assets/profile.svg" alt="PROFILE" />
    </a>
  </header>
</template>

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

<script lang="ts" setup></script>
