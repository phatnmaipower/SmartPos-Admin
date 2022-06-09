<template>
  <div class="main-content">
    <div class="main-content-top">
      <div class="label">設定資料</div>
      <router-link to="/admins" class="exit">このページを終了</router-link>
    </div>
    <div class="main-content-title">
      <span>設定資料</span>
    </div>
    <div class="main-content-profile">
      <div class="avatar">
        <img :src="admin.img" alt="" />
        <span>{{ admin.name }}</span>
      </div>
      <div class="basic-info"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Admin from "@/types/AdminPage/Admin";
import { useStore } from "vuex";
import { key } from "@/store/index";
const store = useStore(key);

const admin: Admin = store.state.admin;
</script>

<style lang="scss" scoped>
@import "@/scss/layoutDefault.scss";

.main-content {
  background-color: #fff;
  height: calc(100vh - $header-height);
  position: absolute;
  left: $sidebar-width;
  top: $header-height;
  padding: 0 20px;
  width: calc(100% - $sidebar-width);
  z-index: $zi-main-content;
  padding: 30px;

  > .main-content-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 50px;
    > .label {
      font-size: 14px;
    }

    > .exit {
      text-decoration: none;
      color: #d8000c;
    }
  }

  > .main-content-title {
    > span {
      font-size: 16px;
    }
  }
}

@media (max-width: $min-screen-width) {
  .main-content {
    width: calc($min-screen-width - $sidebar-width);
  }
}
</style>
