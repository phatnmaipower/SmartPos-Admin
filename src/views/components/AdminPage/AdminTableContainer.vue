<template>
  <div id="main-content">
    <p class="title-content">管理者一覧</p>
    <button id="btn-add-admin"><b>+</b><span>管理者を追加</span></button>
    <div id="tabs-container">
      <!-- tab navi -->
      <div id="tab-navi">
        <button
          v-for="tab of tabs"
          :key="tab.id"
          :class="{ active: tab.isActive }"
          @click="onTabClick(tab.id)"
        >
          {{ tab.tabTitle }}
        </button>
      </div>
      <template v-for="tab of tabs" :key="tab.id">
        <div v-if="tab.isActive" :class="{ active: tab.isActive }">
          <table-component :table-type="tab.tableType" :api="tab.api">
          </table-component>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import TableComponent from "@/views/components/AdminPage/TableComponent.vue";

const tabs = reactive([
  {
    id: 1,
    isActive: true,
    tabTitle: "既存管理者",
    tableType: "existing",
    api: "http://localhost:3000/admins/existing",
  },
  {
    id: 2,
    isActive: false,
    tabTitle: "招待中管理者",
    tableType: "inviting",
    api: "http://localhost:3000/admins/inviting",
  },
]);

const onTabClick = (id: number): void => {
  for (let tab of tabs) {
    if (tab.id !== id) {
      tab.isActive = false;
    } else {
      tab.isActive = true;
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/layoutDefault.scss";

#main-content {
  background-color: #fff;
  height: calc(100vh - $header-height);
  position: absolute;
  left: $sidebar-width;
  top: $header-height;
  padding: 0 20px;
  width: calc(100% - $sidebar-width);
  z-index: $zi-main-content;
}

@media (max-width: $min-screen-width) {
  #main-content {
    width: calc($min-screen-width - $sidebar-width);
  }
}

#btn-add-admin {
  height: 40px;
  width: 150px;
  border: 1px solid #35cfaa;
  border-radius: 4px;
  background-color: #35cfaa;
  color: #fff;
}

#tab-navi {
  border-bottom: 2px solid #ddd;
  margin: 30px 0px;

  > button {
    height: 30px;
    margin-right: 20px;
    background-color: #fff;
    border: none;
  }
  > button.active {
    border-bottom: 4px solid #35cfaa;
  }
}

.title-content {
  margin: 10px 0;
  font-size: 20px;
}
</style>
