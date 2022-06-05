<template>
  <div class="sidebar">
    <div class="side-menu">
      <router-link
        v-for="item of navItems"
        :key="item.id"
        :to="item.href"
        :class="{ active: item.state }"
        @click="onNavItemClick(item.id)"
      >
        {{ item.text }}
      </router-link>
    </div>
    <div class="side-text">
      <router-link
        v-for="item of sideTextItems"
        :key="item.id"
        :to="item.href"
        :class="{ active: item.state }"
        >{{ item.text }}</router-link
      >
    </div>

    <p id="copy">
      COPYRIGHT &copy; 2022. MADE WITH
      <span style="color: #35cfaa">♥</span> AT xID.
    </p>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "@/store/index";
import { useRoute } from "vue-router";
import { computed } from "vue";

const store = useStore(key);

const route = useRoute();

const path = ref(computed(() => route.path));
const href: Array<string> = ["/", "/", "/admins", "/", "/"];
const navItems = reactive([
  {
    id: 0,
    state: true,
    text: "ダッシュボード",
    href: "",
  },
  {
    id: 1,
    state: false,
    text: "通知一覧",
    href: "",
  },
  {
    id: 2,
    state: false,
    text: "管理者一覧",
    href: "",
  },
  {
    id: 3,
    state: false,
    text: "利用者一覧",
    href: "",
  },
  {
    id: 4,
    state: false,
    text: "利用ログ一覧",
    href: "",
  },
]);

const onNavItemClick = (id: number): void => {
  for (let navItem of navItems) {
    if (navItem.id !== id) {
      navItem.state = false;
    } else {
      navItem.state = true;
    }
  }
};

const sideTextItems = reactive([
  {
    id: 1,
    state: false,
    text: "よくある質問",
    href: `${store.state.myURL}`,
  },
  {
    id: 2,
    state: false,
    text: "プライバシーとポリシー",
    href: `${store.state.myURL}`,
  },
  {
    id: 3,
    state: false,
    text: "利用規約",
    href: `${store.state.myURL}`,
  },
]);

onMounted(() => {
  let activatedOne = 0;
  for (let idx = 0; idx < navItems.length; idx++) {
    navItems[idx].href = href[idx];
    navItems[idx].state = href[idx] === path.value;
    if (navItems[idx].state) {
      activatedOne++;
    }
  }

  if (activatedOne !== 1) {
    navItems[0].state = true;
    for (let idx = 1; idx < navItems.length; idx++) {
      navItems[idx].state = false;
    }
  }
});
</script>
<style lang="scss">
@import "@/scss/layoutDefault.scss";
a.active {
  background-color: #35cfaa;
  border-left: 2px solid #149072;
}
.sidebar {
  padding-top: 20px;
  background-color: #fff;
  border: #ddd;
  border-style: solid;
  border-width: 0 1px 0 0;
  width: $sidebar-width;
  height: calc(100vh - $header-height);
  position: fixed;
  top: $header-height;
  left: 0;
  z-index: $zi-sidebar;
}

#logo {
  width: 170px;
  height: 30px;
  margin-left: 30px;
  margin-top: 25px;
}

#logo2 {
  display: flex;
  align-items: center;
  height: 60px;
  margin-top: 20px;
  background-color: #0c0624;
  color: #ffffff;
}

#logo2 > img {
  width: 40px;
  height: 40px;
  padding-left: 30px;
}

#logo2 > div {
  padding-left: 10px;
  opacity: 0.5;
  letter-spacing: 2px !important;
}

.sidebar > button {
  width: 210px;
  height: 50px;
  margin-left: 30px;
  margin-top: 30px;
  padding-left: 15px;
  background-color: #d64d10;
  border-style: none;
  border-radius: 3px;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.sidebar > button > div {
  padding-left: 15px;
}

.sidebar a {
  width: 210px;
  display: flex;
  align-items: center;
  color: #222;
  font-size: 14px;
  text-decoration: none;
  padding: 20px;
}

.side-menu {
  display: flex;
  flex-direction: column;
}

.side-menu > a {
  width: 100%;
  height: 100%;
}

.side-menu img {
  background-color: #201a39;
}

.side-text {
  margin-top: 100px;
  color: #222;
  font-size: 12px;
  position: absolute;
  bottom: 100px;
}

.side-text > div {
  margin: 10px 0px;
}

#copy {
  color: #222;
  font-size: 10px;
  position: absolute;
  width: $sidebar-width;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  bottom: 20px;
  text-align: center;
}
</style>
