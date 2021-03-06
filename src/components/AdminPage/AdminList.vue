<template>
  <div id="main-content">
    <p class="title-content">管理者一覧</p>
    <button id="btn-add-admin"><b>+</b><span>管理者を追加</span></button>
    <div id="tabs-container">
      <!-- tab navi -->
      <div id="tab-navi">
        <template v-for="tab of tabs" :key="tab.id">
          <button
            :class="{ active: tab.isActive }"
            to="#"
            @click="onTabClick(tab.id)"
          >
            {{ tab.tabTitle }}
          </button>
        </template>
      </div>
      <template v-for="tab of tabs" :key="tab.id">
        <div
          v-if="tab.isActive && isTabsSetupFinished"
          :class="{ active: tab.isActive }"
        >
          <table-component :table-type="tab.tableType" :api="tab.api">
          </table-component>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from "vue";
import TableComponent from "@/components/AdminPage/table/TableComponent.vue";
import { ApiI, ApiInfo } from "@/types/api/api";

import { getRuntimeConfig } from "@/services/services";

const isTabsSetupFinished = ref(false);

const tabs = reactive([
  {
    id: 1,
    isActive: true,
    tabTitle: "既存管理者",
    tableType: "existing",
    api: {
      method: "",
      endpoint: "",
      params: [],
    } as ApiInfo,
  },
  {
    id: 2,
    isActive: false,
    tabTitle: "招待中管理者",
    tableType: "inviting",
    api: {
      method: "",
      endpoint: "",
      params: [],
    } as ApiInfo,
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

onMounted(async () => {
  const runtimeConfig: ApiI = await getRuntimeConfig();
  console.log(runtimeConfig);

  tabs[0].api = runtimeConfig.admins.getListAdminsExisting;
  tabs[1].api = runtimeConfig.admins.getListAdminsInviting;

  //append host
  tabs[0].api.endpoint = runtimeConfig.host + tabs[0].api.endpoint;
  tabs[1].api.endpoint = runtimeConfig.host + tabs[1].api.endpoint;

  isTabsSetupFinished.value = true;
});
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
